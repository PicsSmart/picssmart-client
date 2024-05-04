import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Folder } from '@mui/icons-material';

import { setAlbums } from '../store/reducers/albums';
import { setToast } from '../store/reducers/toast';

import { getAlbumsApi } from '../services/apiService/albums';

import ItemsTable from '../components/ItemsTable';

import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

const Albums = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const deleteHandler = (id) => {
    console.log(`delete album ${id}`);
  };

  const icon = (
    <Folder
      style={{
        color: 'picsmart.main',
        fontSize: '1.25rem'
      }}
    />
  );

  return (
    <div>
      <h1>Albums</h1>
      <ItemsTable data={albums} icon={icon} deleteHandler={deleteHandler} navigateHandler={navigateHandler} />
    </div>
  );
};

export default Albums;
