import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box } from '@mui/material';

import { setAlbums } from '../store/reducers/albums';
import { setToast } from '../store/reducers/toast';

import { getAlbumsApi } from '../services/apiService/albums';

import AlbumGallery from '../components/AlbumGallery';

import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

const Albums = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.albums);

  const getAlbums = async () => {
    try {
      setLoading(true);
      const { data } = await getAlbumsApi();
      // console.log(data);
      dispatch(setAlbums({ albums: data }));
      dispatch(
        setToast({
          toast: { open: true, message: SUCCESS_MESSAGES.ALBUMS, severity: 'success' }
        })
      );
    } catch (exception) {
      setError(execption);
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.ALBUMS, severity: 'error' }
        })
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const navigate = useNavigate();
  const navigateHandler = (id) => {
    navigate(`/albums/${id}`);
  };

  return (
    <div>{albums?.length!=0?
      <AlbumGallery albums={albums} navigateHandler={navigateHandler} />
      :
      <Box sx={{textAlign: 'center' , m:'7rem', mt: '20rem'}}>
          <Typography variant="h5">No albums to display.</Typography>
      </Box>}
    </div>
    
  );
};

export default Albums;
