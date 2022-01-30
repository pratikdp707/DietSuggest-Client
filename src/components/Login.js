import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import { GoogleLogin } from 'react-google-login';
import { authenticate } from '../helpers/auth';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
export const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password1: '',
        textChange: 'Sign In'
    });
    const history = useHistory();
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT
    const baseURL = "http://localhost:4000/api"
    const { email, password1, textChange } = formData;
    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };

    
    const googleSuccess =async (response) => {
        //const result = response?.profileObj;
        const token = response?.tokenId;
        try{
            axios.post(baseURL + '/user/googleLogin', {
                idToken : token
            })
            .then(response => {
                if(response.data.status === "failed"){
                    toast.error(response.data.data);
                } else {
                    authenticate(response ,() => {
                        history.push('/home')
                    })
                }
            })
        } catch(error) {
            console.log(error);
        }
    }

    const googleFailure = response => {
        toast.error("Google Sign in was unsuccessfull. Try Again Later")
        console.log("Google Sign in was unsuccessfull. Try Again Later");
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(baseURL)
        if(email && password1){
            setFormData({...formData, textChange: 'Submitting'});
            axios.post(baseURL+'/user/login',{
                email,
                password: password1
            })
            .then(response => {
                if(response.data.status === "failed"){
                    toast.error(response.data.data);
                    setFormData({
                        email : "",
                        password1 : "",
                        textChange: "Sign In"
                    })
                } else {
                    authenticate(response ,() => {
                        setFormData({
                            ...formData,
                            email: '',
                            password1: '',
                            textChange: 'Submitted'
                        });
                        history.push('/home')
                    })
                }
            })
        }
    }

    return <div>
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            <ToastContainer />
            <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-2/3 xl:w-7/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Sign In for Diet Suggestion
                        </h1>
                        <div className='w-full flex-1 mt-8 text-indigo-500'>
                            <div className='flex flex-col items-center'>
                                <GoogleLogin
                                    clientId={`${clientId}`}
                                    //clientId='501608638714-k3v6c9nspv5oqrp9un6tm44vsb8n51vd.apps.googleusercontent.com'
                                    onSuccess={googleSuccess}
                                    onFailure={googleFailure}
                                    cookiePolicy={'single_host_origin'}
                                    render={renderProps => (
                                        <button
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                            className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                                        >
                                            <div className=' p-2 rounded-full '>
                                                <i className='fab fa-google ' />
                                            </div>
                                            <span className='ml-4'>Sign In with Google</span>
                                        </button>
                                    )}
                                ></GoogleLogin>
                                
                                <a
                                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                    href='/register'
                                    target='_self'
                                ><Link to='/register'>
                                    <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500' />
                                    <span className='ml-4'>Sign Up</span>
                                    </Link>
                                </a>
                                
                            </div>
                            <div className='my-12 border-b text-center'>
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                    Or sign In with e-mail
                                </div>
                            </div>
                            <form
                                className='mx-auto max-w-xs relative '
                                onSubmit={handleSubmit}
                            >
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    type='email'
                                    placeholder='Email'
                                    onChange={handleChange('email')}
                                    value={email}
                                />
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                    type='password'
                                    placeholder='Password'
                                    onChange={handleChange('password1')}
                                    value={password1}
                                />
                                    <button
                                        type='submit'
                                        className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                    >
                                        <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                                        <span className='ml-3'>{textChange}</span>
                                    </button>
                                <Link to='/forgotPassword'>
                                    <div className='my-5 border-b text-center'>
                                        <div className='leading-none hover:underline px-2 inline-block text-md text-indigo-600 font-large bg-white transform translate-y-1/2'>
                                            Forgot Password ?
                                        </div>
                                    </div>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};
