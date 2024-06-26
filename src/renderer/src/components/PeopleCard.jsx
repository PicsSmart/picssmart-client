import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { PropTypes } from 'prop-types';
import { getThumbnailUrlApi } from '../services/apiService/people';
import {useDispatch} from 'react-redux';
import {setFaces} from '../store/reducers/faces';

const PeopleCard = ({ data }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      const url = await getThumbnailUrlApi(data.imageId);
      setThumbnailUrl(url);
    }
    fetchData();
  }, []);

  return (
    <Card sx={{ width: 250 }}>
      <CardActionArea>
        <CardMedia sx={{ borderRadius: '50px', padding: '10px' }} component="img" image={`${thumbnailUrl}?top=${data.face.top}&right=${data.face.right}&bottom=${data.face.bottom}&left=${data.face.left}`} alt={data._id} height='250'/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name - {data._id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.facesCount} photos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {0} favourites
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PeopleCard;
