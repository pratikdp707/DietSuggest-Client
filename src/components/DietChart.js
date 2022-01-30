import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './Navbar';
import { FoodCard } from './FoodCard';
export const DietChart = (props) => {

    const baseURL = "http://localhost:4000/api"
    const [diet, setDiet] = useState({});
    let dietData = diet;
    let foodItems = [{
        "Food": "idli",
        "Category": "breakfast",
        "Quantity": "14 Piece",
        "Calories": 490,
        "Carbs": 36.75,
        "Protein": 24.5,
        "Fats": 21.777777784,
        "_id": "61f672c393ae376f6247fe18"
    }]
    foodItems = diet.foodItems;
    useEffect(() => {
        axios.get(baseURL + '/diet/getDiet/61f66b38816a623c2536a27b')
            .then(response => {
                console.log(response)
                setDiet(response.data.data)
                console.log(diet)
            })
        console.log(foodItems)
    });

    return <div>
        <Navbar user={props.user} />
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm-rounded-lg flex justify-center flex-1">
                <div className='grid grid-cols-1 lg:w-full xl:w-full p-6 sm:p-12 divide-y divide-gray-300'>
                    <div className="mt-2 flex flex-col items-center">
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            BMI
                        </h1>
                        <div className='grid grid-cols-1 mt-10 justify-center'>
                            <div className='bg-indigo-500 rounded-xl p-10 w-full' >
                                <h1 className='text-2xl xl:text-3xl font-extrabold ml-5 mr-5 mt-1 mb-2 text-gray-100 w-full'>
                                    BMI
                                </h1>
                                <h3 className='text-xl font-semibold text-gray-100 text-center w-full'>
                                    {parseFloat(dietData.bmi).toFixed(2)} kg/m<sup>2</sup>
                                </h3>
                                <h3 className='text-xl font-semibold text-gray-100 text-center w-full'>
                                    ({dietData.status})
                                </h3>
                            </div>
                        </div>
                        {/* <hr className=/> */}
                    </div>
                    <div className="mt-10 pt-10 flex flex-col items-center">
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Diet Chart
                        </h1>
                        <h3 className='text-xl xl:text-2xl mt-5 font-semibold text-indigo-500'>
                            Breakfast
                        </h3>
                        {/* <FoodCard /> */}
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {
                                foodItems && foodItems.map(food => {
                                    if (food.Category === 'breakfast')
                                        return (
                                            <FoodCard food={food} />)
                                })
                            }
                        </div>
                        <h3 className='text-xl xl:text-2xl mt-5 font-semibold text-indigo-500'>
                            Lunch
                        </h3>
                        {/* <FoodCard /> */}
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {
                                foodItems && foodItems.map(food => {
                                    if (food.Category === 'lunch')
                                        return (
                                            <FoodCard food={food} />)
                                })
                            }
                        </div>
                        <h3 className='text-xl xl:text-2xl mt-5 font-semibold text-indigo-500'>
                            Dinner
                        </h3>
                        {/* <FoodCard /> */}
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {
                                foodItems && foodItems.map(food => {
                                    if (food.Category === 'dinner')
                                        return (
                                            <FoodCard food={food} />)
                                })
                            }
                        </div>
                        {/* <hr className=/> */}
                    </div>
                </div>
            </div>
        </div>
    </div>;
};
