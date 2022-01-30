import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { getCookie, removeCookie } from '../helpers/auth';
export const Navbar = (props) => {
    const [username, setusername] = useState("");
    let history  = useHistory();
    useEffect(() => {
    console.log(props.user)
      if(props.user){
          console.log("In IF")
          var signoutbutton = document.getElementById('signout-button');
          signoutbutton.classList.remove('hidden');
          var signinbutton = document.getElementById('signin-button');
          signinbutton.classList.add('hidden');
          setusername(props.user.name)
      } else {
          console.log("In ELSE")
        var signoutbutton = document.getElementById('signout-button');
        signoutbutton.classList.add('hidden');
        var signinbutton = document.getElementById('signin-button');
        signinbutton.classList.remove('hidden');
      }
      if (props.user.is_activated === false) {
        history.push('/updateProfile')
      }
    }, [props.user],);
    
    const handleClick = (e) => {
        var target = document.getElementById("navigation");
        if(target.classList.contains('hidden')){
            target.classList.remove('hidden');
        } else {
            target.classList.add('hidden');
        }
    }

    const handleSignOut = (e) => {
        removeCookie('token');
        history.push('/login')
    }

    return <div>
        <nav className='flex items-center bg-indigo-500 p-3 flex-wrap'>
            <a href="/" className='p-2 mr-4 ml-4 inline-flex items-center text-gray-100 text-2xl font-bold tracking-wide mb-1'>Diet Suggestion</a>
            <button className='text-gray-100 inline-flex p-3 hover:bg-indigo-700 rounded md:hidden ml-auto nav-toggler' dataTarget = '#navigation' onClick={handleClick}>
                <i class="fas fa-bars"></i>
            </button>
            <div className='top-nav w-full md:inline-flex md:flex-grow md:w-auto' id='navigation'>
                <div className='lg:inline-flex md:flex-row md:mr-auto text-lg flex flex-col'>
                    <a href="/" className='md:inline-flex font-semibold md:w-auto px-3 py-2 rounded text-gray-100 hover:bg-indigo-700'>
                        <Link to='/home'><span>Home</span></Link>
                    </a>
                    <a href="/" className='md:inline-flex font-semibold md:w-auto px-3 py-2 rounded text-gray-100 hover:bg-indigo-700'>
                        <span>About</span>
                    </a>
                </div>
                <div className='md:inline-flex md:flex-row md:ml-auto text-lg flex flex-col'>
                    <a href="/" className='md:inline-flex font-semibold md:w-auto px-3 py-2 rounded text-gray-100'>
                        <span>{username}</span>
                    </a>
                    <button id = "signin-button"
                        className=' ml-3 mr-3 tracking-wide font-semibold bg-indigo-100 text-indigo-700 rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none w-auto'
                    >
                        <i className='fas fa-sign-in-alt w-6 ml-2 text-indigo-600' />
                        <Link to='/login'>
                            <span className='ml-3 mr-3'>Sign In</span>
                        </Link>
                    </button>
                    <button id = "signout-button"
                        className=' ml-3 mr-3 tracking-wide font-semibold bg-indigo-100 text-indigo-700 rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none w-auto'
                    >
                        <i className='fas fa-sign-in-alt w-6 ml-2 text-indigo-600' />
                            <span className='ml-3 mr-3' onClick={handleSignOut}>Sign Out</span>
                    </button>
                </div>
            </div>
        </nav>
    </div>;
};
