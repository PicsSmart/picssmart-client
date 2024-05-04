import { CloudOff, CloudQueue } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useMediaQuery } from '@mui/material';

const CloudConnectComponent = () => {

  const handleClickConnect = () => {
    console.log('Connect to a personal cloud');
  }

  const handleClickDisconnect = () => {
    console.log('Disconnect');
  }

  
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <div style={{ marginRight: '5%' }}>
      {import.meta.env.VITE_PERSONAL_CLOUD_URL ? (
        <>
        {
        !matchesXs && (
          <Button variant="contained" color="picsmart" sx={{ whiteSpace: 'nowrap', border: '1px solid', borderColor: 'white' }} onClick={handleClickDisconnect} startIcon={<CloudOff /> } >
            Disconnect
          </Button>
        )}

        {
        matchesXs && (
          <IconButton aria-label="disconnect" size="large" sx={{ color: 'white' }} onClick={handleClickDisconnect}>
            <CloudOff />
          </IconButton>
        )}
        </>

      ) : (

        
        <Button variant="contained" color="picsmart" sx={{ whiteSpace: 'nowrap', border: '1px solid', borderColor: 'white' }} onClick={handleClickConnect} startIcon={<CloudQueue /> } >
          Connect to a personal cloud
        </Button>
      )}
    </div>
  );
}

export default CloudConnectComponent;
