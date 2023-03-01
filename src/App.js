import React, { useState } from 'react';
import './App.css';
import Player from './player'
import Scores from './scores'


function App() {
    //this stuff is ugly. put into a json file?
    //list of items and their values
    const itemVals = {
        cheese: 3,
        apples: 2,
        bread: 3,
        chickens: 4,
        money: 1,
        pepper: 6,
        mead: 7,
        silk: 8,
        crossbows: 9

        //support for royal goods
    };

    const numPlayers = 6;

    const kqBonus = {
        cheese: {
            king: 15,
            queen: 10
        },
        apples: {
            king: 20,
            queen: 10
        },
        bread: {
            king: 15,
            queen: 10
        },
        chickens: {
            king: 10,
            queen: 5
        }
    };

    //player colors
    const playerColors = ["blue", "red", "green", "purple", "yellow", "black"];

    //create default values
    let defaultPlayer = {};
    for (const item of Object.keys(itemVals)) {
        defaultPlayer[item] = 0;
    }

    //create default players and initial scores list
    let defaultData = {};
    let initScores = {};
    for (const pColor of playerColors) {
        defaultData[pColor] = defaultPlayer;
        initScores[pColor] = 0;
    }

    //add a winner field to scores
    initScores.winner = "";

    //states
    const [playerData, setData] = useState(defaultData);
    const [playerScores, setScores] = useState(initScores);

    //is it better to do this or just use function names
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
        for (const good of Object.keys(kqBonus)) {
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
                    let extra = Math.floor((kqBonus[good].king + kqBonus[good].queen) / indSecond);

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
                    temp[pColor] += kqBonus[good].king;

                    //add queens: if none, give to king
                    if (numSecond == 0) {
                        temp[pColor] += kqBonus[good].queen;
                    }

                    else {
                        let extra = Math.floor(kqBonus[good].queen / numSecond);
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

                total += playerData[player][item] * itemVals[item];
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


    return (
        <div>
            <h1>Player Scoring</h1>
            <br />

            <Player color="blue" setter={getData} />
            <br />

            <Player color="red" setter={getData} />
            <br />

            <Player color="green" setter={getData} />
            <br />

            <Player color="yellow" setter={getData} />
            <br />

            <Player color="purple" setter={getData} />
            <br />

            <Player color="black" setter={getData} />
            <br />

            <Scores scores = {playerScores} onClick = {calculateScores} />
        </div>
  );
}

export default App;
