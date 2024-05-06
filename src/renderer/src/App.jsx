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
