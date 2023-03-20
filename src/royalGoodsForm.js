import './App.css';
import React, { useState } from 'react';
import * as Constants from './constants'



function RoyalGoodsForm(props) {
    return (

        <fieldset
            style={{
                borderStyle: "solid",
                backgroundColor: props.color
            }}>
            {Object.keys(Constants.royalGoods).map((itemName) => {
                return (
                    <div key={itemName + "form"}>

                        {Constants.royalGoods[itemName].name}
                        <br />
                        0 <input type="radio" name={"royalGoods " + itemName} value="0" onChange={() => { }} checked/>
                        1 <input type="radio" name={"royalGoods " + itemName} value="1" />
                        2 <input type="radio" name={"royalGoods " + itemName} value="2" />
                        < br />


                    </div>
                );
            })}
        </fieldset>

    );

}

export default RoyalGoodsForm;
