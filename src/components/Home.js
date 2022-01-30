import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { getCookie } from '../helpers/auth';
import axios from 'axios';
import {Link} from 'react-router-dom'
export const Home = (props) => {

  const baseURL = "http://localhost:4000/api"
  useEffect(() => {
    const token = getCookie('token');
    console.log(token);
    axios.post(baseURL + '/user/getUser/' + token)
      .then(response => {
        console.log(response)
        if (response.data.status === 'success') {
          console.log(response.data.data)
          props.setUser(response.data.data);
        } else {
          props.setUser(null);
        }
      })
      console.log(props.user);
    // console.log(props.user.bmi_parameters);
    

  });

  return <div>
    <Navbar user={props.user} />
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm-rounded-lg flex justify-center flex-1">
        <div className='lg:w-2/3 xl:w-8/12 p-6 sm:p-12'>
          <div className="mt-12 flex flex-col items-center">
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Your Data
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 justify-center'>
              <div className='bg-indigo-500 rounded-xl p-10' >
                <h1 className='text-2xl xl:text-3xl font-extrabold m-5 text-gray-100'>
                  Height
                </h1>
                <h3 className='text-xl font-semibold text-gray-100 text-center'>
                  {props.user['height']} cm 
                </h3>
              </div>
              <div className='bg-indigo-500 rounded-xl p-10' >
                <h1 className='text-2xl xl:text-3xl font-extrabold m-5 text-gray-100'>
                  Weight
                </h1>
                <h3 className='text-xl font-semibold text-gray-100 text-center'>
                  {props.user['weight']} kg
                </h3>
              </div>
              <div className='bg-indigo-500 rounded-xl p-10' >
                <h1 className='text-2xl xl:text-3xl font-extrabold m-5 text-gray-100'>
                  Gender
                </h1>
                <h3 className='text-xl font-semibold text-gray-100 text-center'>
                  {props.user.gender}
                </h3>
              </div>
            </div>
            <div className='grid grid-cols-1 gap-8 mt-10 justify-center'>
              <div className='bg-indigo-500 rounded-xl p-10' >
                <h1 className='text-2xl xl:text-3xl font-extrabold m-5 text-gray-100 w-full'>
                  Activity Type
                </h1>
                <h3 className='text-xl font-semibold text-gray-100 text-center w-full'>
                  {props.user.activity_type}
                </h3>
              </div>
            </div>
            <a
              className='mt-10 w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
              href='/'
              target='_self'
            ><Link to='/updateProfile'>
                <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500' />
                <span className='ml-4'>Update Profile</span>
              </Link>
            </a>
            <a
              className='mt-10 w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
              href='/'
              target='_self'
            ><Link to='/dietChart'>
                <i className='fas fa-utensils fa 1x w-6  -ml-2 text-indigo-500' />
                <span className='ml-4'>Check BMI and Diet Chart</span>
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div >
  </div>;
};
