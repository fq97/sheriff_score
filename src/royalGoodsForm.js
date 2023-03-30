import './App.css';
import React, { useState } from 'react';
import * as Constants from './constants'



function RoyalGoodsForm(props) {
    return (

        <fieldset
            style={{
                borderStyle: "none",
            }}>
            {Object.keys(Constants.royalGoods).map((itemName) => {
                return (
                    <div key={itemName + "form"}>

                        <p style={{
                            fontSize: "24px",
                            fontWeight: "500",
                            margin: "0px"
                        }}>{Constants.royalGoods[itemName].name}</p>
                        
                        <input type="radio" id={"royal" + itemName + 0} className="radioButton"
                            name={"royalGoods " + itemName} value="0" onChange={() => { }} defaultChecked />
                        <label htmlFor={"royal" + itemName + 0}>0</label>

                        
                        <input type="radio" id={"royal" + itemName + 1} className="radioButton"
                            name={"royalGoods " + itemName} value="1" />
                        <label htmlFor={"royal" + itemName + 1}>1</label>

                        
                        <input type="radio" id={"royal" + itemName + 2} className="radioButton"
                            name={"royalGoods " + itemName} value="2" />
                        <label htmlFor={"royal" + itemName + 2}>2</label>
                        < br />

                    </div>
                );
            })}
        </fieldset>

    );

}

export default RoyalGoodsForm;
