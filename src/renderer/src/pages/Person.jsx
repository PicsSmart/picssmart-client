import { useParams } from 'react-router-dom';
import { Box, CardMedia, Button } from '@mui/material/index';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFaceGroupImagesApi, getFacesApi, getThumbnailUrlApi } from '../services/apiService/people';
import ImageGallery from '../components/ImageGallery';
import { setToast } from '../store/reducers/toast';
import { useDispatch } from 'react-redux';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

const Person = () => {
  const { id } = useParams();

  const faces = useSelector((state) => state.faces.faces);
  const media = useSelector((state) => state.media.media);
  const [person, setPerson] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]); 
  const dispatch = useDispatch();
  const [thumbnailUrl, setThumbnailUrl] = useState('');


  const getFacePhotos = async () => {
    try {
      setLoading(true);
      const { data } = await getFaceGroupImagesApi(id);
      data.forEach(element => {
        const img = media.filter((photo) => photo._id === element._id)[0]
        if(img){
          setPhotos((prev)=>[...prev, img]);
        }
      });
      dispatch(
        setToast({
          toast: { open: true, message: SUCCESS_MESSAGES.PROFILE, severity: 'success' }
        })
      );
    } catch (exception) {
      setError(exception);
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.PROFILE, severity: 'error' }
        })
      );
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => { 
    const person = faces.filter((face) => face._id === id)[0];
    setPerson(person);
    async function fetchData() {
      const url = await getThumbnailUrlApi(person.imageId);
      setThumbnailUrl(url);
    }
    fetchData();
    getFacePhotos();
  } , [window.location.pathname]);

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
      <Box sx={{ width: '100%', height: '150px', display: 'flex', flexDirection: 'row' }}>
        {person&&<CardMedia
          sx={{ borderRadius: '50px', padding: '10px', width: '150px', height: '150px' }}
          component="img"
          image={`${thumbnailUrl}?top=${person?.face.top}&right=${person?.face.right}&bottom=${person?.face.bottom}&left=${person?.face.left}`}
          alt={person?._id}
        />}
        <Box>
          <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center' }}>
            <h2>Profile ID : </h2>
            <h2>{person?._id}</h2>
          </Box>
          {/* <Button variant="contained" color="error">
            Delete Profile
          </Button> */}
        </Box>
      </Box>
      <Box>
        <h1>Photos</h1>
        <ImageGallery images={photos}/>
      </Box>
    </div>
  );
};

export default Person;
