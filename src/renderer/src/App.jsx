// project import
import Routes from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from './store/reducers/toast';
import { changeMountingStatus } from './store/reducers/mountingStatus';
import { setMedia } from './store/reducers/media';
import { getMediaApi } from './services/apiService/media';
import { ERROR_MESSAGES } from './utils/constants';
import { getAlbumsApi } from './services/apiService/albums';
import { setAlbums } from './store/reducers/albums';
import { getFacesApi } from './services/apiService/people';
import { setFaces } from './store/reducers/faces';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
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

  const getAlbums = async () => {
    try {
      const { data } = await getAlbumsApi();
      dispatch(
        setAlbums({
          albums: data
        })
      );
    } catch (exception) {
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.ALBUMS, severity: 'error' }
        })
      );
    }
  }

  const getFaces = async () => {
    try {
      const { data } = await getFacesApi();
      dispatch(
        setFaces({
          faces: data
        })
      );
    } catch (exception) {
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.FACES, severity: 'error' }
        })
      );
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
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
      getAlbums();
      getFaces();
    });
  }
  , [])

  return(
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  )

};

export default App;
