import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setMedia } from '../store/reducers/media';
import { setToast } from '../store/reducers/toast';

import { getMediaApi } from '../services/apiService/media';

import ImageGallery from '../components/ImageGallery';

import {SUCCESS_MESSAGES, ERROR_MESSAGES} from '../utils/constants';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const media = useSelector((state) => state.media.media);
  const toast = useSelector((state) => state.toast.toast);

  const getMedia = async () => {
    try {
      setLoading(true);
      const { data } = await getMediaApi();
      dispatch(
        setMedia({
          media: data
        })
      );
      dispatch(
        setToast({
          toast: { open: true, message: SUCCESS_MESSAGES.MEDIA, severity: 'success' }
        })
      );
    } catch (exception) {
      console.error(exception);
      setError(exception);
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.MEDIA, severity: 'error' }
        })
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMedia();
  }, []);

  return (
    <div>
      <ImageGallery images={media} />
    </div>
  );
};

export default Home;
