import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './Navbar';
import { FoodCard } from './FoodCard';
export const DietChart = (props) => {

    const baseURL = "https://dietsuggest-app.herokuapp.com/api"
    // const baseURL = "http://localhost:4000/api"
    const [diet, setDiet] = useState({});
    const [foodItems, setFoodItems] = useState([])
    let dietData = diet;
    // let foodItems = [{
    //     "Food": "idli",
    //     "Category": "breakfast",
    //     "Quantity": "14 Piece",
    //     "Calories": 490,
    //     "Carbs": 36.75,
    //     "Protein": 24.5,
    //     "Fats": 21.777777784,
    //     "_id": "61f672c393ae376f6247fe18"
    // }]
    // foodItems = diet.foodItems;
    useEffect(() => {
        console.log(props.user._id)
        axios.get(baseURL + '/diet/getDiet/' + props.user._id)
            .then(response => {
                console.log(response)
                setDiet(response.data.data[0])
                setFoodItems(response.data.data[0].foodItems)
                // console.log(diet)
            })
        console.log(foodItems)
    }, [props.user._id]);

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
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                            <div className="w-full rounded-lg bg-gray-200 overflow-hidden shadow-lg mt-2 h-full">
                                <div className="px-4 py-4">
                                    <h3 className='text-center text-xl xl:text-2xl mt-5 mb-5 font-semibold text-indigo-500'>
                                        Breakfast
                                    </h3>
                                    <ul className='list-disc list-outside'>
                                        {
                                            foodItems && foodItems.map(food => {
                                                if (food.Category === 'breakfast')
                                                    return (
                                                        // <FoodCard food={food} />
                                                        <div className='bg-white rounded-lg mt-2 h-full overflow-hidden shadow-lg px-4 py-2'>
                                                            <div className='flex justify-between items-center mb-2'>
                                                                <p className='font-bold text-xl text-lg mb-0'>{food.Food}&nbsp;
                                                                    <span className='text-gray-600 text-base'>({food.Quantity})</span>
                                                                </p>
                                                                <p className='text-gray-900 text-base mt-0'>{food.Calories}&nbsp;kcal.</p>
                                                            </div>
                                                            <div className='flex justify-between items-center'>
                                                                <div className='flex flex-col'>
                                                                    <p className='font-bold text-gray-600 text-base text-center mb-0'>{parseFloat(food.Carbs).toFixed(2)} gm</p>
                                                                    <p className='text-gray-900 text-base text-center mt-0'>(Carbs)</p>
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <p className='font-bold text-gray-600 text-base text-center mb-0'>{parseFloat(food.Protein).toFixed(2)} gm</p>
                                                                    <p className='text-gray-900 text-base text-center mt-0'>(Protein)</p>
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <p className='font-bold text-gray-600 text-base text-center mb-0'>{parseFloat(food.Fats).toFixed(2)} gm</p>
                                                                    <p className='text-gray-900 text-base text-center mt-0'>(Fats)</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                            })
                                        }
                                    </ul>

                                </div>
                            </div>
                            <div className="w-full rounded-lg bg-gray-200 overflow-hidden shadow-lg mt-2 h-full">
                                <div className="px-4 py-4">
                                    <h3 className='text-center text-xl xl:text-2xl my-5 font-semibold text-indigo-500'>
                                        Lunch
                                    </h3>
                                    <ul className='list-disc list-outside'>
                                        {
                                            foodItems && foodItems.map(food => {
                                                if (food.Category === 'lunch')
                                                    return (
                                                        // <FoodCard food={food} />
                                                        <div className='bg-white rounded-lg mt-2 h-full overflow-hidden shadow-lg px-4 py-2'>
                                                            <div className='flex justify-between items-center mb-2'>
                                                                <p className='font-bold text-xl text-lg mb-0'>{food.Food}&nbsp;
                                                                    <span className='text-gray-600 text-base'>({food.Quantity})</span>
                                                                </p>
                                                                <p className='text-gray-900 text-base mt-0'>{food.Calories}&nbsp;kcal.</p>
                                                            </div>
                                                            <div className='flex justify-between items-center'>
                                                                <div className='flex flex-col'>
                                                                    <p className='font-bold text-gray-600 text-base text-center mb-0'>{parseFloat(food.Carbs).toFixed(2)} gm</p>
                                                                    <p className='text-gray-900 text-base text-center mt-0'>(Carbs)</p>
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <p className='font-bold text-gray-600 text-base text-center mb-0'>{parseFloat(food.Protein).toFixed(2)} gm</p>
                                                                    <p className='text-gray-900 text-base text-center mt-0'>(Protein)</p>
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <p className='font-bold text-gray-600 text-base text-center mb-0'>{parseFloat(food.Fats).toFixed(2)} gm</p>
                                                                    <p className='text-gray-900 text-base text-center mt-0'>(Fats)</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                            })
                                        }
                                    </ul>

                                </div>
                            </div>
                            <div className="w-full rounded-lg bg-gray-200 overflow-hidden shadow-lg mt-2 h-full">
                                <div className="px-4 py-4">
                                    <h3 className='text-center text-xl xl:text-2xl my-5 font-semibold text-indigo-500'>
                                        Dinner
                                    </h3>
                                    <ul className='list-disc list-outside'>
                                        {
                                            foodItems && foodItems.map(food => {
                                                if (food.Category === 'dinner')
                                                    return (
                                                        // <FoodCard food={food} />
                                                        <div className='bg-white rounded-lg mt-2 h-full overflow-hidden shadow-lg px-4 py-2'>
                                                            <div className='flex justify-between items-center mb-2'>
                                                                <p className='font-bold text-xl text-lg mb-0'>{food.Food}&nbsp;
                                                                    <span className='text-gray-600 text-base'>({food.Quantity})</span>
                                                                </p>
                                                                <p className='text-gray-900 text-base mt-0'>{food.Calories}&nbsp;kcal.</p>
                                                            </div>
                                                            <div className='flex justify-between items-center'>
                                                                <div className='flex flex-col'>
                                                                    <p className='font-bold text-gray-600 text-base text-center mb-0'>{parseFloat(food.Carbs).toFixed(2)} gm</p>
                                                                    <p className='text-gray-900 text-base text-center mt-0'>(Carbs)</p>
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <p className='font-bold text-gray-600 text-base text-center mb-0'>{parseFloat(food.Protein).toFixed(2)} gm</p>
                                                                    <p className='text-gray-900 text-base text-center mt-0'>(Protein)</p>
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <p className='font-bold text-gray-600 text-base text-center mb-0'>{parseFloat(food.Fats).toFixed(2)} gm</p>
                                                                    <p className='text-gray-900 text-base text-center mt-0'>(Fats)</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                            })
                                        }
                                    </ul>

                                </div>
                            </div>
                        </div>

                        {/* <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
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
                        </h3> */}
                        {/* <FoodCard /> */}
                        {/* <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
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
                        </h3> */}
                        {/* <FoodCard /> */}
                        {/* <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {
                                foodItems && foodItems.map(food => {
                                    if (food.Category === 'dinner')
                                        return (
                                            <FoodCard food={food} />)
                                })
                            }
                        </div> */}
                        {/* <hr className=/> */}
                    </div>
                </div>
            </div>
        </div>
    </div>;
};
