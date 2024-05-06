// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput, Button } from '@mui/material';

// assets
import SearchIcon from '@mui/icons-material/Search';
import { textSearchApi } from '../services/apiService/utilities';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from '../store/reducers/toast';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';
// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const SearchBar = ({setPhotos, setError, setLoading}) => {

    const dispatch = useDispatch();
    const textSearch = async ()=>{
        try{
            setLoading(true)
            const {data} =  await textSearchApi(caption)
            data.results.forEach(element => {
                setPhotos((prev)=>[...prev, element.payload]);
            });
            dispatch(
                setToast({
                    toast: { open: true, message: SUCCESS_MESSAGES.SEARCH_RESULTS, severity: 'success' }
                })
            );
        }catch(exception){
            setError(exception)
            dispatch(
                setToast({
                    toast: { open: true, message: ERROR_MESSAGES.SEARCH_RESULTS, severity: 'error' }
                })
            );
        }finally{
            setLoading(false)
        }
    }
    

    const [caption, setCaption] = useState('');


    const handleClick = () => {
        setPhotos([])
        if(caption === ''){
            dispatch(
                setToast({
                    toast: { open: true, message: ERROR_MESSAGES.ENTER_TEXT_TO_SEARCH, severity: 'warning' }
                })
            );
            return
        }
        textSearch()
    }

    return (
        <Box sx={{display:'flex', marginBottom:4, alignItems:'center'}}>
            <Box>
                <FormControl sx={{width:'40rem'}}>
                    <OutlinedInput
                        color='picsmart'
                        value={caption}
                        size="small"
                        id="header-search"
                        startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                            <SearchIcon  color='picsmart'/>
                        </InputAdornment>
                        }
                        aria-describedby="header-search-text"
                        inputProps={{
                        'aria-label': 'weight'
                        }}
                        placeholder="Search"
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </FormControl>
            </Box>
            <Box>
                <Button variant='contained' onClick={handleClick} color='picsmart' size='small' sx={{marginLeft:2}}>
                Search
                </Button>
            </Box>
        </Box>
    );
};

export default SearchBar;
