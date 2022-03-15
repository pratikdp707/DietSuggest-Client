import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { Navbar } from './Navbar';
export const UpdateProfile = (props) => {

    const [formData, setFormData] = useState({
        gender: "",
        age: "",
        weight: "",
        height: "",
        activity_type: "",
        textChange: "Submit"
    });
    let history = useHistory();
    const { gender, age, weight, height, activity_type, textChange } = formData;
    const baseURL = "https://dietsuggest-app.herokuapp.com/api"
    // const baseURL = "http://localhost:4000/api"
    const handleChange = text => (e) => {
        console.log(text + " " + e.target.value)
        setFormData({ ...formData, [text]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        setFormData({ ...formData, textChange: "Submitting" })
        axios.post(baseURL + "/user/updateDetails/" + props.user._id, {
            gender,
            age,
            weight,
            height,
            activity_type
        })
            .then(response => {
                if (response.data.status === "failed") {
                    toast.error("Failed to update details");
                    setFormData({
                        ...formData,
                        gender: "",
                        age: "",
                        weight: "",
                        height: "",
                        activity_type: "",
                        textChange: "Submit"
                    })
                } else {
                    toast.success("Details updated successfully.");
                    setFormData({
                        ...formData,
                        textChange: "Submitted"
                    })
                }
            })
            console.log(props.user._id)
        axios.post(baseURL + '/diet/updateDiet/' + props.user._id)
            .then(res => {
                console.log(res)
                if (res.data.status === "success") {
                    toast.success("Diet Updated Successfully")
                }
                toast.success("Redirecting");
                setTimeout(() => {
                    history.push('/home');
                }, 3000);
            })

    }
    return <div>
        <Navbar user={props.user} />
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            <ToastContainer />
            <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-2/3 xl:w-7/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Update Profile
                        </h1>
                        <form
                            className='mx-auto mt-2 max-w-xs relative'
                            onSubmit={handleSubmit}
                        >
                            <label htmlFor='gender' className='ml-2 mb-1 block text-sm font-medium text-gray-500'>
                                Gender
                            </label>

                            <select id='gender' name='gender' className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                placeholder='Gender' onChange={handleChange('gender')}>
                                <option value=""></option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                            <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                type='number'
                                placeholder='Age'
                                onChange={handleChange('age')}
                                value={age}
                            />
                            <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                type='number'
                                placeholder='Weight (kg)'
                                onChange={handleChange('weight')}
                                value={weight}
                            />
                            <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                type='number'
                                placeholder='Height (cms)'
                                onChange={handleChange('height')}
                                value={height}
                            />

                            <label htmlFor='activity_type' className='ml-2 mb-1 mt-2 block text-sm font-medium text-gray-500'>
                                Activity Type
                            </label>

                            <select id='activity_type' name='activity_type' className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                placeholder='Gender' onChange={handleChange('activity_type')}>
                                <option value=""></option>
                                <option value="No Exercise">No Exercise</option>
                                <option value="Little Exercise">Little Exercise</option>
                                <option value="Daily Exercise">Daily Exercise</option>
                                <option value="Routine Physical Work">Routine Physical Work</option>
                                <option value="Exercise And Physical Work">Exercise And Physical Work</option>
                            </select>

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
    </div>;
};
