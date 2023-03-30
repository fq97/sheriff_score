import './App.css';
import React, { useState } from 'react';
import * as Constants from './constants'



function BaseForm(props) {
    return (

        <fieldset>
            {Object.keys(Constants.base).map((itemName) => {
                return (
                    <div key={itemName}>
                        <label htmlFor={itemName + " entry"}
                            style={{
                                display: "inline-block",
                                float: "center",
                                width: Constants.imageWidth / 3,
                                textAlign: "right",
                                marginRight: "10px",
                                marginBottom: "10px",
                                transform: "translate(-30px)"
                            }}>{itemName}</label>
                        <input type="number" name={"base " + itemName} id={itemName + " entry"}
                            style={{
                                display: "inline-block",
                                float: "center",
                                width: "3em",
                                fontSize: "24px",
                                transform: "translate(-30px)"
                            }} />
                        < br />

                    </div>

                );
            })}
        </fieldset>

    );

}

export default BaseForm;