import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Folder } from '@mui/icons-material';
import { Grid, Pagination } from '@mui/material';

import { setAlbums } from '../store/reducers/albums';
import { setToast } from '../store/reducers/toast';

import { getAlbumsApi } from '../services/apiService/albums';

import ItemsTable from '../components/ItemsTable';
import AlbumCard from '../components/AlbumCard';

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
    <div>
      <h1>Albums</h1>
      {albums&&<Pagination count={Math.ceil(albums?.length/15)} defaultPage={1} color="picsmart" onChange={(e, value)=>{setPage(value)}} />}
      <Grid container rowSpacing={3} columnSpacing={5} columns={{ xs: 2, md: 4, lg: 5 }} mt={2}>
        {albums?.map((album) => (
          <Grid item key={album._id}>
            <AlbumCard album={album} handleClick={navigateHandler} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Albums;
