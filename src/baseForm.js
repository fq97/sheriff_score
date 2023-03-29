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
                                fontSize: "24px",
                                fontWeight: "500",
                                textAlign: "right",
                                marginRight: "10px"
                            }}>{itemName}</label>
                        <input type="number" name={"base " + itemName} id={itemName + " entry"}
                            style={{
                                display: "inline-block",
                                float: "center",
                                width: Constants.imageWidth / 3,
                                fontSize: "24px",
                            }} />
                        < br />

                    </div>

                );
            })}
        </fieldset>

    );

}

export default BaseForm;