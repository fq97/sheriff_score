import './App.css';
import React, { useState } from 'react';
import * as Constants from './constants';
import RoyalGoodsForm from './royalGoodsForm';



function PlayerForm(props) {

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        props.setter(props.color, data);
    }

    //image url
    let imageUrl = "url(./images/" + props.color + ".jpg)"

    return (
        <div className="formContainer">
            <form
                style={{
                    borderStyle: "solid",
                    backgroundImage: imageUrl,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    backgroundPosition: "center",
                    width: Constants.imageWidth,
                    height: Constants.imageHeight,
                    padding: "none"
                }}
                onSubmit={handleSubmit}
            >

                <fieldset>
                    {Object.keys(Constants.base).map((itemName) => {
                        return (
                            <div key={itemName}>
                                {itemName}
                                <input type="number" name={"base " + itemName} />
                                < br />

                            </div>

                        );
                    })}
                </fieldset>
                <RoyalGoodsForm />

                <input type = "submit" value = "submit"/>

            </form>
        </div>
    );
}

export default PlayerForm;
