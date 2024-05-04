import React, { useState } from 'react';
import { Button, useMediaQuery, IconButton } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import useApi from '../services/hooks/useApi';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setToast } from '../store/reducers/toast';

const FileMountComponent = () => {
  const dispatch = useDispatch();

  async function openFolder() {
    const folderPath = await window.electronAPI.openFolder();
    // console.log(folderPath);

    // make a call to the backend to mount the folder
    // for now, just copy the contents of the folder to the data folder in backend
    if (folderPath === undefined) {
      console.log('No folder selected');
      dispatch(
        setToast({
          toast: { open: true, message: 'No folder selected', severity: 'error' },
        })
      );
      return;
    }
    await axios.post(`${import.meta.env.VITE_PERSONAL_CLOUD_URL}/mount_album`, {folderPath})
    .then((res) => {
      console.log(res.data);
      dispatch(
        setToast({
          toast: { open: true, message: 'Folder mounted. Processing images... This may take a while.', severity: 'info' },
        })
      );
    }
    ).catch((error) => {
      console.log(error);
      dispatch(
        setToast({
          toast: { open: true, message: 'Error while mounting folder', severity: 'error' },
        })
      );
    });
  }

  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <div>
      {!matchesXs && (
        <Button variant="contained" color="picsmart" sx={{ width: '100%', whiteSpace: 'nowrap' }} startIcon={<CreateNewFolderIcon />} onClick={openFolder}>
          Mount Storage
        </Button>
      )}

      {/* make the text dissapear when the breakpoint is reached */}

      {matchesXs && (
        <IconButton aria-label="mount" size="large" sx={{ color: 'white' }} onClick={openFolder}>
          <CreateNewFolderIcon />
        </IconButton>
      )}

    </div>
  );
};

export default FileMountComponent;
