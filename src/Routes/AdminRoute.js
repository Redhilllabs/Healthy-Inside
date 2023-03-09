import React from 'react';
import{ Navigate,Outlet} from 'react-router-dom';
import { fetchAdminUser } from "../utils/fetchLocalStorageData";

const AdminRoutes = () =>{
    
return ( fetchAdminUser() ?<Outlet/>
: <Navigate to='/Adminlogin' />

)
}

export default AdminRoutes;