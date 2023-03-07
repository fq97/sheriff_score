import React, { useState } from 'react';
import './App.css';
import PlayerForm from './playerForm'
import ScoreDisplay from './scoreDisplay'
import * as Constants from './constants'

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

    //create default values
    let defaultPlayer = {};
    for (const item of Object.keys(Constants.itemVals)) {
        defaultPlayer[item] = 0;
    }

    //create default players and initial scores list
    let defaultData = {};
    let initScores = {};
    for (const pColor of Constants.playerColors) {
        defaultData[pColor] = defaultPlayer;
        initScores[pColor] = 0;
    }

    //add a winner field to scores
    initScores.winner = "";

    //states
    const [playerData, setData] = useState(defaultData);
    const [playerScores, setScores] = useState(initScores);

    //get data from player forms
    const getData = (playerColor, formData) => {
        //unpack. given a formdata object
        let updatedVals = Object.fromEntries(formData.entries());

        //state setter takes an object and merges that new object with previous state
        //the ({}) is 2 shortcuts. {} is object builder notation and () around it means return that value
        setData(prevState =>
        ({
            ...prevState,
            [playerColor]: updatedVals
        }));
    };

    //calculate k/q bonuses given temp score object
    function calcKQ(temp) {
        //king bonus tie: split king and queen, round down
        //queen bonus tie, split round down

        //for each legal good item
        for (const good of Object.keys(Constants.kqBonus)) {
            //for each player

            let goodAmount = [];
            //put the amounts into a list
            for (const player of Object.keys(playerData)) {
                goodAmount.push([player, playerData[player][good]]);
            }

            //sort the list
            goodAmount.sort((a, b) => { return a[1] - b[1]; });
            goodAmount.reverse();

            //count occurances of 1st place, that aren't 0
            if (goodAmount[0][1] != 0) {
                let indSecond = 0;
                let numSecond = 0;
                let ind = 0;

                while (ind < numPlayers) {
                    //if current index is first place, inc second place pointer
                    if (goodAmount[ind][1] == goodAmount[0][1]) {
                        indSecond += 1;
                    }

                    //else: see if equal to 2nd place, if is, increment
                    else if (goodAmount[ind][1] == goodAmount[indSecond][1] &&
                        goodAmount[ind][1] != 0) {
                        numSecond += 1;
                    }

                    //else, neither, break
                    else {
                        break;
                    }

                    ind++;
                }

                //indsecond is number of 1st plcae, num second is num second place
                //only king
                if (indSecond > 1) {
                    let extra = Math.floor(
                        (Constants.kqBonus[good].king + Constants.kqBonus[good].queen) / indSecond);

                    //add the bonus to each
                    for (let i = 0; i < indSecond; i++) {
                        let pColor = goodAmount[i][0];
                        temp[pColor] += extra;
                    }
                }

                //has single king, mayble multiple queens
                else {
                    //add king
                    let pColor = goodAmount[0][0];
                    temp[pColor] += Constants.kqBonus[good].king;

                    //add queens: if none, give to king
                    if (numSecond == 0) {
                        temp[pColor] += Constants.kqBonus[good].queen;
                    }

                    else {
                        let extra = Math.floor(Constants.kqBonus[good].queen / numSecond);
                        for (let i = indSecond; i < indSecond + numSecond; i++) {
                            pColor = goodAmount[i][0];
                            temp[pColor] += extra;
                        }
                    }

                }


            }


        }
    }


    //calculate scores for all players and determines winner
    function calculateScores() {
        //calculate the scores of each player
        //iterate over all items, multiply by correcponding value in item list
        //for item in blue.keys:
        //  total += blue[item] * itemVals[item]
        //temp: since can't trust when state will update
        let temp = {};

        //calculate individual player raw scores
        for (const player of Object.keys(playerData)) {
            let total = 0;

            for (const item of Object.keys(playerData[player])) {

                total += playerData[player][item] * Constants.itemVals[item];
            }

            temp[player] = total;
        }

        //add on the king and queen bonuses
        calcKQ(temp);


        //find the winner: use temp since state hasn't updated yet
        let curMax = 0;
        let curWinner = "";

        for (const player of Object.keys(temp)) {
            if (temp[player] > curMax) {
                curMax = temp[player];
                curWinner = player;
            }
        }

        //break ties: most legal goods, then most contraband goods

        temp.winner = curWinner;

        //update state
        setScores(temp);

    }

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
                    </div>
                );
            })}

          
            <ScoreDisplay scores = {playerScores} onClick = {calculateScores} />
        </div>
    );
}

export default App;
