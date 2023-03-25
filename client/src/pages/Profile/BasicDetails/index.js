import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'

function BasicDetails() {

    const { user } = useSelector((state) => state.users)

    return (
        <div className='flex justify-center'>
            <div className='profile-box'>
                <img src={user.profile} className="profile-pic" />
                <h3>{user.name}</h3>
                <p>{user.email} , {user.role}</p>
                <button>Profile</button>
                <div className='profile-bottom'>
                    <p>Learn More About My Profile</p>
                    <div className='flex justify-between mt-3'>
                        <h1 className='text-md text-black uppercase'>Name</h1>
                        <h1 className='text-md'>{user.name}</h1>
                    </div>
                    <div className='flex justify-between  mt-3'>
                        <h1 className='text-md text-black uppercase'>Email</h1>
                        <h1 className='text-md'>{user.email}</h1>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <h1 className='text-md  uppercase text-black'>Phone</h1>
                        <h1 className='text-md'>{user.phone}</h1>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <h1 className='text-md  uppercase text-black'>role</h1>
                        <h1 className='text-md uppercase'>{user.role}</h1>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <h1 className='text-md  uppercase text-black'>Registered On</h1>
                        <h1 className='text-md'>{moment(user.createdAt).format("MMM DD YYYY, h:mm a")}</h1>
                    </div>

                </div>
            </div>
        </div>

        // <div>
        //     <div className='rounded bg-secondary text-white flex flex-col p-2 w-50'>
        //     <div className='flex justify-between'>

        //             <img src={user.profile}/>
        //         </div>
        //         <div className='flex justify-between'>
        //             <h1 className='text-md'>Name</h1>
        //             <h1 className='text-md'>{user.name}</h1>
        //         </div>
        //         <div className='flex justify-between'>
        //             <h1 className='text-md'>Email</h1>
        //             <h1 className='text-md'>{user.email}</h1>
        //         </div>
        //         <div className='flex justify-between'>
        //             <h1 className='text-md'>Phone</h1>
        //             <h1 className='text-md'>{user.phone}</h1>
        //         </div>
        //         <div className='flex justify-between'>
        //             <h1 className='text-md'>role</h1>
        //             <h1 className='text-md uppercase'>{user.role}</h1>
        //         </div>
        //         <div className='flex justify-between'>
        //             <h1 className='text-md'>Registered On</h1>
        //             <h1 className='text-md'>{moment(user.createdAt).format("MMM DD YYYY, h:mm a")}</h1>
        //         </div>
        //     </div>
        // </div>
    )
}

export default BasicDetails