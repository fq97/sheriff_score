import './App.css';
import React, { useState } from 'react';


//takes scores state object
function ScoreDisplay(props) {

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
                        <td> {props.scores.getScore("blue")} </td>
                        <td> {props.scores.getScore("red")} </td>
                        <td> {props.scores.getScore("green")} </td>
                        <td> {props.scores.getScore("yellow")} </td>
                        <td> {props.scores.getScore("purple")} </td>
                        <td> {props.scores.getScore("black")} </td>
                        <td> {props.scores.getWinner()} </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ScoreDisplay;
