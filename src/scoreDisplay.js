import './App.css';
import React, { useState } from 'react';
import * as Constants from './constants'
import Scores from './customClasses'


//takes scores state object and onclick handler
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
                        <th></th>

                        {Constants.playerColors.map((color) => {
                            return (
                                <th key={color + "scoreheader"}>{color}</th>
                            );
                        })}

                        {props.scores.hasWinner() &&
                            <th>Winner</th>
                        }

                    </tr>

                    <tr>
                        <td>Scores</td>

                        {Constants.playerColors.map((color) => {
                            return (
                                <td key={color + "score"}>{props.scores.getScore(color)}</td>
                            );
                        })}


                        {props.scores.hasWinner() &&
                            <td> {props.scores.getWinner()} </td>
                        }
                    </tr>

                    <tr>
                        <td>Legal</td>

                        {Constants.playerColors.map((color) => {
                            return (
                                <td key={color + "legal"}>{props.scores.getLegalScore(color)}</td>
                            );
                        })}

                        {props.scores.hasWinner() &&
                            <td> { props.scores.getLegalScore(props.scores.getWinner())} </td>
                        }
                        
                    </tr>

                    <tr>
                        <td>Contraband</td>

                        {Constants.playerColors.map((color) => {
                            return (
                                <td key={color + "contraband"}>{props.scores.getContrabandScore(color)}</td>
                            );
                        })}

                        {props.scores.hasWinner() &&
                            <td> {props.scores.getContrabandScore(props.scores.getWinner())} </td>
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ScoreDisplay;