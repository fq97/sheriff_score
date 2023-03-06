import './App.css';
import React, { useState } from 'react';


//takes scores state object
function Scores(props) {

    return (
        <div>
            <button onClick={props.onClick}>Calculate Scores</button>
            <table
                style={{
                    borderStyle: "solid"
                }}>
                <tbody>
                    <tr>
                        <th>blue</th>
                        <th>red</th>
                        <th>green</th>
                        <th>yellow</th>
                        <th>purple</th>
                        <th>black</th>
                        <th>Winner</th>
                    </tr>

                    <tr>
                        <td> {props.scores.blue} </td>
                        <td> {props.scores.red} </td>
                        <td> {props.scores.green} </td>
                        <td> {props.scores.yellow} </td>
                        <td> {props.scores.purple} </td>
                        <td> {props.scores.black} </td>
                        <td> {props.scores.winner} </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Scores;
