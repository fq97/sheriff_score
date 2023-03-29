import './App.css';
import React, { useState } from 'react';
import * as Constants from './constants';
import RoyalGoodsForm from './royalGoodsForm';
import BaseForm from './baseForm'



function PlayerForm(props) {

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        props.setter(props.color, data);
    }

    //image url
    let imageUrl = "url(./images/" + props.color + ".jpg)";



    //testing
    let curModule = "royalGoods";


    return (
        <div className="formContainer"
            style={{
                marginTop: "20px"
            }}>
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
                    width: Constants.imageWidth + "px",
                    height: Constants.imageHeight + "px",
                    padding: "none"
                }}
                onSubmit={handleSubmit}
            >

                {
                    {
                        "base": <BaseForm />,
                        "royalGoods": <RoyalGoodsForm />
                    }[curModule]
                }



                <input type = "submit" value = "submit"/>

            </form>
        </div>
    );
}

export default PlayerForm;
