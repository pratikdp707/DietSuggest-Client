import React from 'react';

export const FoodCard = (props) => {
    return <div>
        <div className="max-w-sm rounded-lg bg-gray-200 overflow-hidden shadow-lg mt-2 h-full">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-gray-900">{props.food.Food}</div>
                    <h2 className="text-gray-900 text-lg">
                        Quantity : {props.food.Quantity}
                    </h2>
                    <h2 className="text-gray-900 text-lg">
                        Calories : {props.food.Calories}
                    </h2>
                    <p className="text-gray-900 text-base">
                        Carbs : {parseFloat(props.food.Carbs).toFixed(2)} gm
                    </p>
                    <p className="text-gray-900 text-base">
                        Protein : {parseFloat(props.food.Protein).toFixed(2)} gm
                    </p>
                    <p className="text-gray-900 text-base">
                        Fats : {parseFloat(props.food.Fats).toFixed(2)} gm
                    </p>
                </div>
        </div>
    </div>;
};
