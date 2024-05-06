import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

const blink = keyframes({
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
});

const ConnectToCloud = () => {
    return (
        <Box>
            <Grid>
                <Box sx={{textAlign: 'center' , m:'7rem', mt: '20rem', animation: `${blink} 3s ease-in infinite`}}>
                    <CloudSyncIcon sx={{fontSize: '7rem', textAlign: 'center', color:'picsmart.main'}} />
                    <Typography variant="h2" color={'picsmart.main'}>Connect to a personal cloud to explore features!</Typography>
                </Box>
            </Grid>
        </Box>
    );
}

export default ConnectToCloud;