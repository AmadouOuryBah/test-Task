import {configureStore} from '@reduxjs/toolkit';
import entitySlice from './redux/entitySlice';


export default configureStore({
    reducer:{
        entities: entitySlice,
    
    }
});
