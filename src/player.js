import './App.css';
import React, { useState } from 'react';



function Player(props) {

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        props.setter(props.color, data);
    }




    return (
        <form
            style={{
                borderStyle: "solid",
                backgroundColor: props.color
            }}
            onSubmit={handleSubmit}
        >

            Cheese:
            <input type="number" name="cheese" />
            <br />

            Apples:
            <input type="number" name="apples" />
            <br />

            Bread:
            <input type="number" name="bread" />
            <br />

            Chickens:
            <input type="number" name="chickens" />
            <br />

            Money:
            <input type="number" name="money" />
            <br />


            Pepper:
            <input type="number" name="pepper" />
            <br />

            Mead:
            <input type="number" name="mead" />
            <br />

            Silk:
            <input type="number" name="silk" />
            <br />

            Crossbows:
            <input type="number" name="crossbows" />
            <br />

            <input type = "submit" value = "submit"/>

    </form>
    );
}

export default Player;
