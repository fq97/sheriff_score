import './App.css';
import React, { useState } from 'react';
import * as Constants from './constants'



function PlayerForm(props) {

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        props.setter(props.color, data);
    }


    //export function calcscore(){} in utils.js file


    return (
        <form
            style={{
                borderStyle: "solid",
                backgroundColor: props.color
            }}
            onSubmit={handleSubmit}
        >

            {Object.keys(Constants.itemVals).map((itemName) => {
                return (
                    <div key={itemName}>
                        {itemName}
                        <input type="number" name={itemName} />
                        < br />

                    </div>

                );
            })}



            <input type = "submit" value = "submit"/>

    </form>
    );
}

export default PlayerForm;
