import { getScenesApi } from '../services/apiService/scenary';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SceneGallery from '../components/SceneGallery';
import { setToast } from '../store/reducers/toast';

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
          toast: { open: true, message: 'Scenes fetched successfully', severity: 'success' }
        })
      );
    } catch (exception) {
      setError(exception);
      dispatch(
        setToast({
          toast: { open: true, message: 'Error while fetching scenes', severity: 'error' }
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
      <SceneGallery scenes={scenes} />
    </div>
  );
};

export default Scenaries;
