// third-party
import { combineReducers } from 'redux';

// project import
import media from './media';
import albums from './albums';
import menu from './menu'
import faces from './faces';
import search from './search';
import toast from './toast';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ 
    media,
    albums,
    menu,
    faces, 
    search,
    toast,
});

export default reducers;
