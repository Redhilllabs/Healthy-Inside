import React from 'react';
import{ Navigate,Outlet} from 'react-router-dom';
import { fetchUser } from "../utils/fetchLocalStorageData";

const PrivateRoutes = () =>{
    
return ( fetchUser() ?<Outlet/>
: <Navigate to='/login' />

)
}

export default PrivateRoutes;