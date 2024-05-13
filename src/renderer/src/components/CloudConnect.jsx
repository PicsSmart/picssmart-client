import { CloudOff, CloudQueue } from '@mui/icons-material';
import { Button, CircularProgress, IconButton} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { connectToCloud, disconnectFromCloud, isConnectedToCloud } from '../services/apiService/cloud';
import { useDispatch, useSelector } from 'react-redux';
import { clearToast, setToast } from '../store/reducers/toast';
import { clearFaces } from '../store/reducers/faces';
import { clearSearch } from '../store/reducers/search';
import { clearMedia } from '../store/reducers/media';
import { changeConnection } from '../store/reducers/cloudConnection';
import { ERROR_MESSAGES } from '../utils/constants';
import { setMedia } from '../store/reducers/media';
import { getMediaApi } from '../services/apiService/media';
import { changeMountingStatus } from '../store/reducers/mountingStatus';

const CloudConnectComponent = () => {
  const [open, setOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  // const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();
  const connected = useSelector((state) => state.connection.connected);

  useEffect(() => {
    async function fetchCloudUrl() {
      const connectedStatus = await isConnectedToCloud();
      dispatch(changeConnection(connectedStatus));
      // setConnected(connectedStatus);
    }
    fetchCloudUrl();
  }, []);

  const getMedia = async () => {
    try {
      const { data } = await getMediaApi();
      dispatch(
        setMedia({
          media: data
        })
      );
    } catch (exception) {
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.MEDIA, severity: 'error' }
        })
      );
    }
  };
  
  const startKafkaConsumer = () => {
    console.log('kafka consumer starting...')
    window.electronAPI.onKafkaConsume((album)=>{
      const message = `New album : ${album.toUpperCase()}, added!`;
      dispatch(
        setToast({
          toast: { open: true, message: message, severity: 'success' },
        })
      );
      dispatch(changeMountingStatus(false));
      // console.log(message);
      getMedia();
    });
  }

  const disconnectKafkaConsumer = () => {
    console.log('kafka consumer stopping...');
    window.electronAPI.stopKafkaConsume();
  }

  const handleConfirmDisconnect = () => {
    console.log('Disconnecting');
    disconnectFromCloud().then(() => {
      // setConnected(false);
      // disconnectKafkaConsumer();
      window.electronAPI.reloadApp();
      dispatch(changeConnection(false));
      // TODO: Refresh the page to reflect the disconnection -- DONE
    });
  }

  const handleConfirmConnect = (url) => {
    console.log('Connecting');
    // strip the url of any trailing and leading whitespaces
    url = url.trim();
    connectToCloud(url).then((response) => {
      // setConnected(true);
      if (response) {
        window.electronAPI.startKafkaConsume(url);
        // NOTE: did not get the notification from the backend
        window.electronAPI.reloadApp().then(() => {
          dispatch(changeConnection(true));
        });
      } else {
        console.log('Connection failed');
        dispatch(
          setToast({
            toast: { open: true, message: ERROR_MESSAGES.CLOUD_CONNECT_FAILED, severity: 'error' },
          })
        );
      }
    }).catch((error) => {
      console.log('Connection failed');
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.CLOUD_CONNECT_FAILED, severity: 'error' },
        })
      );
    });
  }

  
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <div style={{ marginRight: '5%' }}>
      {connected ? (
        <>
        {
        !matchesXs && (
          <Button variant="contained" color="picsmart" sx={{ whiteSpace: 'nowrap', border: '1px solid', borderColor: 'white' }} onClick={() => setOpen(true)} startIcon={<CloudOff /> } >
            Disconnect
          </Button>
        )}

        {
        matchesXs && (
          <IconButton aria-label="disconnect" size="large" sx={{ color: 'white' }} onClick={() => setOpen(true)}>
            <CloudOff />
          </IconButton>
        )}
        </>

      ) : (


        <Button variant="contained" color="picsmart" sx={{ whiteSpace: 'nowrap', border: '1px solid', borderColor: 'white' }} onClick={() => setInputOpen(true)} startIcon={<CloudQueue /> } >
          Connect to a personal cloud
        </Button>
      )}

      {open===true && 
      <ConfirmDisconnectModal handleClose={(status)=>{
        setOpen(false);
        if(status===true){
          handleConfirmDisconnect();
        } else {
          console.log('Disconnection cancelled');
        }
      }} />
      }

      { inputOpen===true && 
      <CloudConnectInputModal handleClose={(url)=>{
        setInputOpen(false);
        if(url !== undefined && url !== ''){
          console.log('Connecting to personal cloud at ', url);
          handleConfirmConnect(url);
        } else {
          console.log('Connection cancelled');
        }
      }}/> }

    </div>
  );
}

const ConfirmDisconnectModal = ({handleClose}) => {

  return (
    <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Disconnect from personal cloud?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" >
            Are you sure you want to disconnect from your personal cloud?
            You will not be able to access your backed up files until you reconnect.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="picsmart" variant='outlined' >
            Disagree
          </Button>
          <Button onClick={()=>handleClose(true)} autoFocus variant='contained' color="picsmart">
            Agree
          </Button>
        </DialogActions>
      </Dialog>

  )
}

const CloudConnectInputModal = ({handleClose}) => {
  const [inputText, setInputText] = useState('');
  
  return (
   <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const url = formJson.url;
            console.log(url);
            handleClose(url);
          },
        }}
      >
        <DialogTitle>
          Connect to a personal cloud
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the URL of your personal cloud to connect to it. Make sure you are on the same network as your personal cloud.
          <br />
          <br />
          Example: http://127.0.0.1:8000

          </DialogContentText>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="url"
            label="Personal Cloud URL"
            type="url"
            variant="standard"
            style={{ width: '70%' }}
            color='picsmart'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ScanCloud setInputText={setInputText} />
            </div>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> handleClose('')} color="picsmart" variant='outlined'>
            Cancel
          </Button>
          <Button type="submit" color="picsmart" variant='contained'>
            Connect
          </Button>
        </DialogActions>
      </Dialog>
  )
}

const ScanCloud = ({ setInputText }) => {
  const [scanning, setScanning] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.electronAPI.onServerDiscovered((serverInfo) => {
      setScanning(false);
      if (serverInfo) {
        setInputText(serverInfo);
      } else {
        console.log('No server found');
        dispatch(
          setToast({
            toast: { open: true, message: ERROR_MESSAGES.NO_SERVERS_FOUND, severity: 'error' },
          })
        );   
      }
    });
  }, []);

  const handleClick = () => {
    setScanning(true);
    window.electronAPI.scanServer();
  }

  return (
    <Button variant="contained" color="picsmart" onClick={handleClick} style={{ height: '100%' } }>
      {!scanning && 'Scan for Available Servers'}

      {scanning && (
        <>
          <CircularProgress size={24} style={{ marginLeft: '10px', marginRight: '10px' }} color="secondary" />
          Scanning...
        </>
      )}
    </Button>
  )
}

export default CloudConnectComponent;
