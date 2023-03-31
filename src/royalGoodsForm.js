import './App.css';
import React, { useState } from 'react';
import * as Constants from './constants'



function RoyalGoodsForm(props) {
    return (

        <fieldset
            style={{
                borderStyle: "none",
                display: "flex",
                flexDirection: "column",
                alignC: "flex-start"
            }}>
            {Object.keys(Constants.royalGoods).map((itemName) => {
                return (
                    <div key={itemName + "form"}>

                        <p style={{
                            fontSize: "24px",
                            fontWeight: "500",
                            margin: "0px",
                            float: "center"
                        }}>{Constants.royalGoods[itemName].name}</p>
                        
                        <input type="radio" id={"royal" + itemName + 0} className="radioButton"
                            name={"royalGoods " + itemName} value="0" onChange={() => { }}
                            defaultChecked />
                        <label htmlFor={"royal" + itemName + 0} className="radioLabel">0</label>

                        
                        <input type="radio" id={"royal" + itemName + 1} className="radioButton"
                            name={"royalGoods " + itemName} value="1" />
                        <label htmlFor={"royal" + itemName + 1} className="radioLabel">1</label>

                        {Constants.royalGoods[itemName].copies == 2 && 
                            <>
                                <input type="radio" id={"royal" + itemName + 2} className="radioButton"
                                name={"royalGoods " + itemName} value="2" />
                                <label htmlFor={"royal" + itemName + 2} className="radioLabel">2</label>
                            </>
                        }
                        
                        < br />

                    </div>
                );
            })}
        </fieldset>

    );

}

export default RoyalGoodsForm;
