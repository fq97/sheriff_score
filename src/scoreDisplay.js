import './App.css';
import React, { useState } from 'react';
import * as Constants from './constants'
import Scores from './customClasses'


//takes scores state object and onclick handler
function ScoreDisplay(props) {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <button onClick={props.onClick} className="submitButton">Calculate Scores</button>

            <table
                style={{
                    borderStyle: "solid",
                    margin: "20px",
                    fontSize: "24px",
                    background: "rgba(255, 255, 255, 0.50)",
                    borderSpacing: "10px 5px",
                    tableLayout: "fixed"
                }}>
                <tbody>
                    <tr>
                        <th className="scoreHeader"></th>

                        {Constants.playerColors.map((color) => {
                            return (
                                <th key={color + "scoreheader"} className="scoreHeader">{color}</th>
                            );
                        })}

                        {props.scores.hasWinner() &&
                            <th className="scoreHeader">winner</th>
                        }

                    </tr>

                    <tr>
                        <th>Scores</th>

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
                        <th>Legal</th>

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
                        <th>Contraband</th>

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