import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { removeLocalStorage } from '../helpers/auth';
export const ChangePassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword1 : "",
        newPassword2 : "",
        textChange: 'Submit'
      });
    let history = useHistory();
    const {oldPassword, newPassword1, newPassword2, textChange} = formData;
    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
      };
      const baseURL = "https://dietsuggest-app.herokuapp.com/api"
    const handleSubmit = e => {
        e.preventDefault();
        const email = JSON.parse(localStorage.getItem('email'));
        console.log(email)
        if(oldPassword || newPassword1 || newPassword2){
            if(newPassword2 === newPassword1){
                setFormData({
                    ...formData,
                    textChange : "Submitting"
                })
                axios.post(baseURL + '/user/changePassword', {
                    email,
                    oldPassword,
                    newPassword: newPassword1 
                })
                .then(response => {
                    if(response.data.status === 'failed'){
                        toast.error(response.data.data);
                        setFormData({
                            ...formData,
                            oldPassword : "",
                            newPassword1: "",
                            newPassword2 :"",
                            textChange: "Submit"
                        })
                    } else {
                        setFormData({
                            ...formData,
                            textChange: "Submitted"
                        })
                        toast.success(response.data.data);
                        toast.success("Redirecting to the login page")
                        removeLocalStorage('email')
                        setTimeout(() => {
                            history.push('/login')
                        }, 3000);
                    }
                })
            } else{
                toast.error("Passwords doesnt match")
            }
        } else{
            toast.error("Please Fill all details")
        }
    }
    
  return <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
  <ToastContainer />
  <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
    <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
      <div className='mt-12 flex flex-col items-center'>
        <h1 className='text-2xl xl:text-3xl font-extrabold'>
          Forget Password
        </h1>
        <div className='w-full flex-1 mt-8 text-indigo-500'>

          <form
            className='mx-auto max-w-xs relative '
            onSubmit={handleSubmit}
          >
            <input
              className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
              type='password'
              placeholder='Old Password'
              onChange={handleChange('oldPassword')}
              value={oldPassword}
            />
            <input
              className='mt-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
              type='password'
              placeholder='New Password'
              onChange={handleChange('newPassword1')}
              value={newPassword1}
            />
            <input
              className='mt-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
              type='password'
              placeholder='Confirm Password'
              onChange={handleChange('newPassword2')}
              value={newPassword2}
            />
            <button
              type='submit'
              className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
            >
              <i className='fas fa-sign-in-alt  w-6  -ml-2' />
              <span className='ml-3'>{textChange}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
};
