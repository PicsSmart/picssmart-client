import PeopleCard from '../components/PeopleCard';
import { getFacesApi } from '../services/apiService/people';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFaces } from '../store/reducers/faces';
import { setToast } from '../store/reducers/toast';
import PeopleGallery from '../components/PeopleGallery';
import { Box, Typography, Grid } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

const People = () => {
  const navigate = useNavigate();
  const onClickHandler = (id) => {
    navigate(`/people/${id}`);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const faces = useSelector((state) => state.faces.faces);

  const getFaces = async () => {
    try {
      setLoading(true);
      const { data } = await getFacesApi();
      dispatch(setFaces({ faces: data }));
      dispatch(
        setToast({
          toast: { open: true, message: SUCCESS_MESSAGES.ALL_PROFILES, severity: 'success' }
        })
      );
    } catch (exception) {
      setError(exception);
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.ALL_PROFILES, severity: 'error' }
        })
      );
    } finally {  
      setLoading(false);
    }
  }
  useEffect(() => {
    getFaces();
  } , []);

  return (
    <div>
      {faces?.length!=0?
      <PeopleGallery faces={faces} />
      :
      <Box sx={{textAlign: 'center' , m:'7rem', mt: '20rem'}}>
          <Typography variant="h5">No profiles to display.</Typography>
      </Box>}
    </div>
  );
};

export default People;
