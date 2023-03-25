import React, { useEffect } from 'react'
import { Form, message } from "antd"
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/user';
import { useDispatch } from 'react-redux';
import { HideLoading, showLoading } from '../../redux/loaderSlice';

function Login() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await LoginUser(values);
            dispatch(HideLoading());
            if (response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.data);
                window.location.href = '/';
            } else {
                dispatch(HideLoading());
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/")
        }
    }, [])

    return (
        
        <div className='form-container'>
            <div className='imgBx'>
                <img src="https://res.cloudinary.com/dyhf9rqfz/image/upload/v1679334972/peakpx_xrzyvw.jpg" />
            </div>
            <div className='contentBx'>
                <div className='formBx'>
                    <h1 className='text-secondary text-2xl flex justify-center font-bold'>Login FORM</h1>
                    <Form layout="vertical" onFinish={onFinish}>

                        <Form.Item label='Email' name='email'
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email",
                                }
                            ]}
                        >
                            <input type="email" placeholder='email' />
                        </Form.Item>
                        <Form.Item label='Password' name='password'
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password",
                                }
                            ]}
                        >
                            <input type="password" placeholder='password' />
                        </Form.Item>


                        <div className='input-btn'>
                            <Button title='Login' type='submit'></Button>
                            
                        </div>
                        <div className='input-btn'>
                            <Link className='text-sm Link' to='/register'>Dont have an account ? CLick here to Register</Link>
                        </div>
                    </Form>
                </div>

            </div>
            
        </div>

    )
}

export default Login