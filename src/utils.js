import React from 'react';
import * as Constants from './constants'
import { Player, Scores } from './customClasses'

//calculate k/q bonuses given temp score object and player data. mutates the temp object 
export function calcKQ(playerData, temp) {
    //king bonus tie: split king and queen, round down
    //queen bonus tie, split round down
    //temp constant for num players
    const numPlayers = 6;
    let playerBonus = {};

    //initialize playerbonus object
    for (const player of Object.keys(playerData)) {
        playerBonus[player] = 0;
    }

    //for each legal good item
    for (const good of Constants.legalGoods) {
        //for each player, reset helper vars
        let goodAmount = [];
        let effectiveAmount = 0;
        
        //put the effective amounts (with bonus) into a list
        for (const player of Object.keys(playerData)) {
            //get the current number of that good
            effectiveAmount = playerData[player].getItemCount(good);

            //check if have royals for that good
            //iterate through all the royal in player
            
            for (const royalGood of Object.keys(Constants.royalGoods)) {
                //if royal good matches current good, add good * goodbonus to good amount
                if (Constants.royalGoods[royalGood].goodType == good) {
                    let playerHas = playerData[player].getItemCount(royalGood);

                    effectiveAmount += playerData[player].getItemCount(royalGood) *
                        Constants.royalGoods[royalGood].goodBonus;
                }

                
            }

            //add to list
            goodAmount.push([player, effectiveAmount]);
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
                    playerBonus[pColor] += extra;
                }
            }

            //has single king, mayble multiple queens
            else {
                //add king
                let pColor = goodAmount[0][0];
                playerBonus[pColor] += Constants.kqBonus[good].king;

                //add queens: if none, give to king
                if (numSecond == 0) {
                    playerBonus[pColor] += Constants.kqBonus[good].queen;
                }

                else {
                    let extra = Math.floor(Constants.kqBonus[good].queen / numSecond);
                    for (let i = indSecond; i < indSecond + numSecond; i++) {
                        pColor = goodAmount[i][0];
                        playerBonus[pColor] += extra;
                    }
                }
            }
        }
    }

    //return object of bonus points
    return playerBonus;
}


//determines winner given player data and score object. return string of winner
export function calculateWinner(playerData, playerScores) {
    //create array of [player, score]
    let curScores = [];
    for (const player of Object.keys(playerScores.getAll())) {
        curScores.push([player, playerScores.getScore(player)]);
    }

    //sort the array
    curScores.sort((a, b) => { return a[1] - b[1]; });
    curScores.reverse();

    //throw out blank case: no scores
    let winner = curScores[0][0];
    let winnerScore = curScores[0][1];
    if (winnerScore == 0) {
        return "";
    }

    //check for ties
    let numTied = 0;
    for (const pAndS of curScores) {
        if (pAndS[1] == winnerScore) {
            numTied++;
        }
    }

    //one winner
    if (numTied == 1) {
        return winner;
    }

    //else, tie: break with legal goods. discard all non-tied from array
    while (curScores.length > numTied) {
        curScores.pop();
    }

    //replace score with legal goods count, sort
    for (const pAndS of curScores) {
        pAndS[1] = playerData[pAndS[0]].getLegalCount();
    }
    curScores.sort((a, b) => { return a[1] - b[1]; });
    curScores.reverse();

    //check for ties
    numTied = 0;
    winner = curScores[0][0];
    for (const pAndS of curScores) {
        if (pAndS[1] == winnerScore) {
            numTied++;
        }
    }

    //tie broken
    if (numTied == 1) {
        return winner;
    }

    //still not broken, break using contraband goods. discard non tied from array
    while (curScores.length > numTied) {
        curScores.pop();
    }

    //replace score with contraband goods count, sort
    for (const pAndS of curScores) {
        pAndS[1] = playerData[pAndS[0]].getContrabandCount();
    }
    curScores.sort((a, b) => { return a[1] - b[1]; });
    curScores.reverse();

    //return 1st player (assume all ties broken)
    return curScores[0][0];

}


//calculate scores for all players. takes object containing raw player data
//return score object
export function calculateScores(playerData) {
    let temp = {};

    //calculate individual player raw scores
    for (const player of Object.keys(playerData)) {
        let total = 0;

        //calculate raw scores of each supported module
        for (const module of Constants.supportedModules) {

            //calculate raw scores
            for (const item of Object.keys(Constants[module])) {
                total += playerData[player].getItemCount(item) *
                    Constants[module][item].score;
            }
        }

        temp[player] = total;
    }


    //add on the king and queen bonuses
    let kqBonus = calcKQ(playerData, temp);
    for (const player of Object.keys(playerData)) {
        temp[player] += kqBonus[player];
    }

    //create a scores object with player scores
    let pScores = new Scores;
    pScores.setAll(temp);

    //calculate and set the winner
    let winner = calculateWinner(playerData, pScores);


    return pScores;
}