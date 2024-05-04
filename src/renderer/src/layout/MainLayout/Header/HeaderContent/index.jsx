// material-ui
import {Typography } from '@mui/material';
// project import
import FolderMountComponent from '../../../../components/FolderMount';
import CloudConnectComponent from '../../../../components/CloudConnect'

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {

  return (
    <>

      {import.meta.env.VITE_PERSONAL_CLOUD_URL && (
        <Typography sx={{ color: 'white', width: '100%', mr: 4, ml: 2 }}>
          <b>Connected to : {import.meta.env.VITE_PERSONAL_CLOUD_URL} </b>
        </Typography>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>

        <CloudConnectComponent />

        {import.meta.env.VITE_PERSONAL_CLOUD_URL && (
          <FolderMountComponent />
        )}

      </div>
    </>
  );
};

export default HeaderContent;
