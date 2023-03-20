import './App.css';
import React, { useState } from 'react';
import * as Constants from './constants'



function RoyalGoodsForm(props) {
    return (

        <form
            style={{
                borderStyle: "solid",
                backgroundColor: props.color
            }}
        >
            {Object.keys(Constants.royalGoods).map((itemName) => {
                //create array of 0-number of copies
                let possCopies = [];

                for (let i = 0; i <= Constants.royalGoods[itemName].copies; i++) {
                    possCopies.push(i);
                }

                return (
                    <div key={itemName + "form"}>

                        {Constants.royalGoods[itemName].name}
                        <br />
                        0 <input type="radio" name={itemName} value="0" checked/>
                        1 <input type="radio" name={itemName} value="1" />
                        2 <input type="radio" name={itemName} value="2" />

                        < br />


                    </div>
                );
            })}


        <input type="submit" value="submit" />


        </form>

    );

}

export default RoyalGoodsForm;
