import './App.css';
import React, { useState } from 'react';



function Royal(props) {
    //score tracking for the royal goods



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

            <input type = "submit" value = "submit"/>

    </form>
    );
}

export default Royal;
