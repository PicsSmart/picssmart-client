import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { PropTypes } from 'prop-types';
import {useDispatch} from 'react-redux';
import {setFaces} from '../store/reducers/faces';
import { getSceneThumbnailApi } from '../services/apiService/scenary';

const SceneCard = ({ scene }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    async function fetchSceneThumbnail() {
      const url = await getSceneThumbnailApi(scene);
      setThumbnailUrl(url);
    }
    fetchSceneThumbnail();
  }, []);

// capitalize the first letter of the scene


  return (
    <Card sx={{ width: 250 }}>
      <CardActionArea>
      <CardMedia component="img" image={thumbnailUrl} alt="image" height="140" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Scene - {scene.charAt(0).toUpperCase() + scene.slice(1)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SceneCard;
SceneCard.propTypes = {
  scene: PropTypes.string.isRequired
};
