import React, { useState } from 'react';
import './App.css';
import PlayerForm from './playerForm'
import ScoreDisplay from './scoreDisplay'
import RoyalGoodsForm from './royalGoodsForm'
import * as Constants from './constants'
import { calculateScores } from './utils'
import {Player, Scores } from './customClasses'

//3 types of files
//data types
//ui types
//logic type
//ui types should have anoun (playerform, scoredisplay, etc) in their name

//need a class for data - use class methods to get/set
//player scores should not be untyped like that
//constants file: place all the defs
//import {thing} from './comnstants'

//make sure everthing is being expoted



function App() {
    //temporary - will be variable later
    const numPlayers = 6;


    //create a map of players and colors
    let defaultData = {};
    for (const pColor of Constants.playerColors) {
        defaultData[pColor] = new Player;
    }

    //create initial scores list
    let initScores = new Scores;

    //states
    const [playerData, setData] = useState(defaultData);
    const [playerScores, setScores] = useState(initScores);



    //get data from player forms
    const getData = (playerColor, formData) => {
        //unpack. given a formdata object
        let updatedVals = Object.fromEntries(formData.entries());



        let updatedPlayer = playerData[playerColor];
        updatedPlayer.updateCounts(updatedVals);


        setData(prevState =>
        ({
            ...prevState,
            [playerColor]: updatedPlayer
        }));
    };



    //calculate scores for all players and determines winner, updates score state
    const getScores = () => {
        let calculatedScores = calculateScores(playerData);

        setScores(calculatedScores);
    };

    //create the player UI displays
    return (
        <div>
            <h1>Player Scoring</h1>
                <br />

            {Constants.playerColors.map((color) => {
                return (
                    <div key={"player" + color}>
                        <PlayerForm color={color} setter={getData} />
                        <br />
                        <RoyalGoodsForm color={color} />
                        <br />
                    </div>
                );
            })}

          
            <ScoreDisplay scores = {playerScores} onClick = {getScores} />
        </div>
    );
}

export default App;