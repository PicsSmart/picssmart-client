import { getScenesApi } from '../services/apiService/scenary';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SceneGallery from '../components/SceneGallery';
import { setToast } from '../store/reducers/toast';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';
import { Box, Typography } from '@mui/material';

const Scenaries = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scenes, setScenes] = useState([]);

  const dispatch = useDispatch();

  const getScenes = async () => {
    try {
      setLoading(true);
      const { data } = await getScenesApi();
      setScenes(data.scenes)
      dispatch(
        setToast({
          toast: { open: true, message: SUCCESS_MESSAGES.SCENES, severity: 'success' }
        })
      );
    } catch (exception) {
      setError(exception);
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.SCENES, severity: 'error' }
        })
      );
    } finally {  
      setLoading(false);
    }
  }

  useEffect(() => {
    getScenes();
  } , []);

  return (
    <div>
      {scenes?.length!=0?
      <SceneGallery scenes={scenes} />
      :
      <Box sx={{textAlign: 'center' , m:'7rem', mt: '20rem'}}>
            <Typography variant="h5">No scenes to display.</Typography>
      </Box>
      }
    </div>
  );
};

export default Scenaries;
