import React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Pagination } from '@mui/material';
import AlbumCard from './AlbumCard';

const AlbumGallery = ({ albums, navigateHandler }) => {
    const [page, setPage] = useState(1);
    const [currentAlbums, setCurrentAlbums] = useState(albums?.slice((page-1)*15, page*15));
  
    useEffect(() => {
      setCurrentAlbums(albums?.slice((page-1)*15, page*15));
    }, [page, albums]);
  
    return (
        <>        
            {albums&&<Pagination count={Math.ceil(albums?.length/15)} defaultPage={1} color="picsmart" onChange={(e, value)=>{setPage(value)}} />}
            <Grid container rowSpacing={3} columnSpacing={5} columns={{ xs: 2, md: 4, lg: 5 }} mt={2}>
            {currentAlbums?.map((album) => (
                <Grid item key={album._id}>
                <AlbumCard album={album} handleClick={navigateHandler} />
                </Grid>
            ))}
            </Grid>
        </>
    )
}

export default AlbumGallery;