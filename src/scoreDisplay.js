import './App.css';
import React, { useState } from 'react';
import * as Constants from './constants'


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
                        {Constants.playerColors.map((color) => {
                            return (
                                <th key={color + "scoreheader"}>{color}</th>
                            );
                        })}

                        <th>Winner</th>
                    </tr>

                    <tr>
                        {Constants.playerColors.map((color) => {
                            return (
                                <td key={color + "scorevalue"}>{props.scores.getScore(color)}</td>
                            );
                        })}
                        <td> {props.scores.getWinner()} </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ScoreDisplay;