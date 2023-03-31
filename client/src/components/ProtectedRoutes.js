import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { GetLoggedInUserDetails } from '../apicalls/user';
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/userSlice';
import { HideLoading, showLoading } from '../redux/loaderSlice';



function ProtectedRoutes({ children }) {

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.users);

    const dispatch = useDispatch();

    const validateUserToken = async () => {
        try {
            dispatch(showLoading());
            const response = await GetLoggedInUserDetails();
            dispatch(HideLoading());
            if (response.success) {
                dispatch(SetUser(response.data));
            } else {
                localStorage.removeItem("token");
                navigate("/login");
                message.error(response.message)
            }
        } catch (error) {
            localStorage.removeItem("token");
            navigate("/login");
            dispatch(HideLoading());
            message.error(error.message)

        }
    }


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
        } else {
            validateUserToken();
        }
    }, []);


    return (

        <div>{user && <>
            <div className=''>
                <div className='header p-2 bg-primary flex justify-between'>

                    <h1 className='text-2xl text-black font-bold pointer' onClick={() => { navigate("/") }}>Read Books</h1>
                    <div className='flex items-center gap-1'>
                        <i className="ri-user-line text-black"></i>
                        <span className='text-md text-black pointer' onClick={() => navigate("/profile")}>
                            {user.name.toUpperCase()}
                        </span>
                        <i className="ri-logout-box-r-line text-black pointer" onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/login")
                        }}></i>
                    </div>
                </div>

                <div className='pb-3 content pr-2 pl-2'>{children}</div>

            </div>
        </>}</div>
    )
}

export default ProtectedRoutes