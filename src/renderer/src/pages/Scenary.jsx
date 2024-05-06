import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material/index';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import ImageGallery from '../components/ImageGallery';
import { getSceneImagesApi } from '../services/apiService/scenary';
import { setToast } from '../store/reducers/toast';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

const Scenary = () => {
  const { name } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]); 
  const dispatch = useDispatch();

  const getPhotos = async () => {
    try {
      setLoading(true);
      const { data } = await getSceneImagesApi(name);
      data.results.forEach(element => {
        setPhotos((prev)=>[...prev, element.payload]);
      });
      dispatch(
        setToast({
          toast: { open: true, message: SUCCESS_MESSAGES.SCENE_PHOTOS, severity: 'success' }
        })
      );
    } catch (exception) {
      setError(exception);
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.SCENE_PHOTOS, severity: 'error' }
        })
      );
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => { 
    getPhotos();
  } , []);

  const icon = (
    <BorderColorIcon
      style={{
        color: 'picsmart.main',
        fontSize: '1.25rem'
      }}
    />
  );

  return (
    <div>
      <Box >
        <Typography variant="h4">{name.charAt(0).toUpperCase() + name.slice(1)} Photos</Typography>
      </Box>
      <Box mt={2}>
        <ImageGallery images={photos}/>
      </Box>
    </div>
  );
};

export default Scenary;
