// material-ui
import {Typography } from '@mui/material';
// project import
import FolderMountComponent from '../../../../components/FolderMount';
import CloudConnectComponent from '../../../../components/CloudConnect'
import { getCloudUrl } from '../../../../services/apiService/cloud';
import { useEffect, useState } from 'react';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const [connectedUrl, setConnectedUrl] = useState('');

  useEffect(() => {
    async function fetchCloudUrl() {
      const connectedStatus = await getCloudUrl();
      setConnectedUrl(connectedStatus);
    }
    fetchCloudUrl();
  }, []);

  return (
    <>

      {connectedUrl !== '' && (
        <Typography sx={{ color: 'white', width: '100%', mr: 4, ml: 2 }}>
          <b>Connected to : {connectedUrl} </b>
        </Typography>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>

        <CloudConnectComponent />

        {connectedUrl !== '' && (
          <FolderMountComponent />
        )}

      </div>
    </>
  );
};

export default HeaderContent;
