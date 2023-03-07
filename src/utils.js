import React from 'react';
import * as Constants from './constants'


//calculate k/q bonuses given temp score object and player data. mutates the temp object 
export function calcKQ(playerData, temp) {
    //king bonus tie: split king and queen, round down
    //queen bonus tie, split round down
    //temp constant for num players
    const numPlayers = 6;



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


//calculate scores for all players and determines winner. takes object containing raw player data
//return scores for each player including the winner
export function calculateScores(playerData) {
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
    calcKQ(playerData, temp);


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

    return temp;
}