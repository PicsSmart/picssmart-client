import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import folderImage from '../../../../resources/FolderIcon.jpg';

const ContentHeader = ({ album }) => {
  return (
    <Grid container>
      <Grid item xs={10}>
        <Typography variant="h5" component="div">
          {album.name}
        </Typography>
      </Grid>
    </Grid>
  );
};

const ContentBody = ({ album }) => {
  return (
    <Grid container mt="1rem" rowSpacing={0.5}>
      <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
        <Typography key={album.id} variant="body2" color="text.secondary">
          {`${album.count} photos`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default function AlbumCard({ album, handleClick }) {

  return (
    <Card sx={{ width: 280 }}>
      <CardActionArea onClick={()=>{handleClick(album._id)}}>
        <CardMedia component="img" image={folderImage} alt="image" height="140" />
        <CardContent m="4">
          <ContentHeader album={album}/>
          <ContentBody album={album} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
