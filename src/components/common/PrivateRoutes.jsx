import React from 'react'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet,Navigate } from 'react-router-dom';


const PrivateRoutes = () => {

    const [user,loading,error] = useAuthState(auth);

    if(loading){
        return <div className='spinning-loader'></div>
    } else if(!user || error){
        return <Navigate to={"/"} replace/>
    } else {
        return <Outlet />
    }
}

export default PrivateRoutes;