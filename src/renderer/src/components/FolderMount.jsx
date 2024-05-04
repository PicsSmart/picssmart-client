import React, { useState } from 'react';
import { Button, useMediaQuery, IconButton } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import useApi from '../services/hooks/useApi';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setToast } from '../store/reducers/toast';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

const FileMountComponent = () => {
  const dispatch = useDispatch();

  async function openFolder() {
    const folderPath = await window.electronAPI.openFolder();
    // console.log(folderPath);

    // make a call to the backend to mount the folder
    // for now, just copy the contents of the folder to the data folder in backend
    if (folderPath === undefined) {
      // console.log('No folder selected');
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.SELECT_FOLDER, severity: 'warning' },
        })
      );
      return;
    }

    // console.log(folderPath);
    await window.electronAPI.sendZipFolder(folderPath)
    .then(async (res) => {
      // console.log(res.data);
      dispatch(
        setToast({
          toast: { open: true, message: SUCCESS_MESSAGES.FOLDER_MOUNT_START, severity: 'info' },
        })
      );
    }
    ).catch((error) => {
      // console.log(error);
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.FOLDER_MOUNT_START, severity: 'error' },
        })
      );
    });
  }

  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <div>
      {!matchesXs && (
        <Button variant="contained" color="picsmart" sx={{ width: '100%', whiteSpace: 'nowrap', border: '1px solid', borderColor: 'white' }} startIcon={<CreateNewFolderIcon />} onClick={openFolder}>
          Mount new folder
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
