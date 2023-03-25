import React, { useEffect } from 'react'
import { Form, message } from "antd"
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../apicalls/user';
import { useDispatch } from 'react-redux';
import { HideLoading, showLoading } from '../../redux/loaderSlice';

function Register() {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const onFinish = async (values) => {
        try{
            dispatch(showLoading());
            const response = await RegisterUser(values);
            dispatch(HideLoading());
            if(response.success){
                message.success(response.message);
                navigate('/login');
            }else{
                dispatch(HideLoading());
                message.error(response.message)
            }
        }catch(error){
            message.error(error.message);
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate("/")
        }
    },[])

    return (
        <div className='form-container'>
        <div className='imgBx'>
            <img src="https://res.cloudinary.com/dyhf9rqfz/image/upload/v1679334972/peakpx_xrzyvw.jpg" />
        </div>
        <div className='contentBx'>
            <div className='formBx'>
                <h1 className='text-secondary text-2xl flex justify-center font-bold'>REGISTERATION FORM</h1>
                <Form layout="vertical" onFinish={onFinish}>

                <Form.Item label='Name' name='name'
                    rules={[
                         {
                         required : true ,
                         message : "Please input your name",
                         }
                     ]}
                     >
                         <input type="text" placeholder='Name' />
                     </Form.Item>
                     <Form.Item label='Profile' name='profile'
                     rules={[
                         {
                         required : true ,
                         message : "Please add your profile photo",
                         }
                     ]}
                     >
                         <input type="text" placeholder='Profile Photo Url' />
                     </Form.Item>
                     <Form.Item label='Email' name='email'
                     rules={[
                         {
                         required : true ,
                         message : "Please input your email",
                         }
                     ]}
                     >
                         <input type="email" placeholder='email' />
                     </Form.Item>
                     <Form.Item label='Phone' name='phone'
                     rules={[
                         {
                         required : true ,
                         message : "Please input your number",
                         }
                     ]}
                     >
                         <input type="number" placeholder='phone' />
                     </Form.Item>
                     <Form.Item label='Password' name='password'
                     rules={[
                         {
                         required : true ,
                         message : "Please input your password",
                         }
                     ]}
                     >
                         <input type="password" placeholder='password' />
                     </Form.Item>


                    <div className='input-btn'>
                        <Button title='Register' type='submit'></Button>
                        
                    </div>
                    <div className='input-btn'>
                        <Link className='text-sm Link' to='/login'>Already have an account ? CLick here to login</Link>
                    </div>
                </Form>
            </div>

        </div>
        
    </div>
        // <div className='h-screen bg-primary flex items-center justify-center'>
        //     <div className='authentication-form bg-white p-2'>
        //         <h1 className='text-secondary text-2xl flex justify-center font-bold'>REGISTERATION FORM</h1>
        //         <Form layout="vertical" onFinish={onFinish}>
        //             <Form.Item label='Name' name='name'
        //             rules={[
        //                 {
        //                 required : true ,
        //                 message : "Please input your name",
        //                 }
        //             ]}
        //             >
        //                 <input type="text" placeholder='Name' />
        //             </Form.Item>
        //             <Form.Item label='Profile' name='profile'
        //             rules={[
        //                 {
        //                 required : true ,
        //                 message : "Please add your profile photo",
        //                 }
        //             ]}
        //             >
        //                 <input type="text" placeholder='Profile Photo Url' />
        //             </Form.Item>
        //             <Form.Item label='Email' name='email'
        //             rules={[
        //                 {
        //                 required : true ,
        //                 message : "Please input your email",
        //                 }
        //             ]}
        //             >
        //                 <input type="email" placeholder='email' />
        //             </Form.Item>
        //             <Form.Item label='Phone' name='phone'
        //             rules={[
        //                 {
        //                 required : true ,
        //                 message : "Please input your number",
        //                 }
        //             ]}
        //             >
        //                 <input type="number" placeholder='phone' />
        //             </Form.Item>
        //             <Form.Item label='Password' name='password'
        //             rules={[
        //                 {
        //                 required : true ,
        //                 message : "Please input your password",
        //                 }
        //             ]}
        //             >
        //                 <input type="password" placeholder='password' />
        //             </Form.Item>
                    

        //             <div className='text-center mt-2  flex flex-col'>
        //             <Button title='REGISTER' type='submit'></Button>
        //                 <Link className='text-primary text-sm' to='/login'>Already have an account ? CLick here to login</Link>
        //             </div>
        //         </Form>
        //     </div>
        // </div>
    )
}

export default Register