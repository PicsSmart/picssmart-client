import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Snackbar, Alert, Box, Grid} from '@mui/material';
import { clearToast } from '../store/reducers/toast';


const Toast = () => {
    const dispatch = useDispatch();
    const toast = useSelector((state) => state.toast.toast);

    const handleClose = () => {
        dispatch(clearToast());
    };
    return (
            <Box sx={{position: 'relative',}}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={toast.open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    sx={{position: 'absolute'}} 
                >
                    <Alert onClose={handleClose} severity={toast.severity} variant='filled'>
                        {toast.message} 
                    </Alert>
                </Snackbar>
            </Box>
    );
}

export default Toast;