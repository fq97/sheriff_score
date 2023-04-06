import React from 'react';
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


export class Player {
    //constructor: initializes a default score of 0 for each item in each module given
    constructor(moduleList = ["base", "royalGoods"]) {
        for (const module of moduleList) {
            this[module] = {};

            for (const item in Constants[module]) {
                this[module][item] = 0;
            }
        }
    }

    //setter: takes an object of key value pairs of item name and item count
    updateCounts(itemsAndCounts) {
        let module = "";
        let itemName = "";

        //for each item, split to find the module and item name, then update
        for (const fieldName in itemsAndCounts) {
            [module, itemName] = fieldName.split(" ");
            this[module][itemName] = parseInt(itemsAndCounts[fieldName]) || 0;
        }
    }

    //getter: return single item
    getItemCount(item) {
        //find the module
        for (const module of Constants.supportedModules) {
            if (item in this[module]) {
                return this[module][item];
            }
        }
    }

    //count legal goods
    getLegalCount() {
        let total = 0;

        //for base module, count number of legal goods
        for (const lGood of Constants.legalGoods) {
            total += this.getItemCount(lGood);
        }

        return total;
    }

    //count contraband goods
    getContrabandCount() {
        let total = 0;

        //count contraband in base game
        for (const good of Object.keys(Constants.base)) {
            if ((good != "money") && !Constants.legalGoods.includes(good)) {
                total += this.getItemCount(good);
            }
        }

        //count royal goods
        for (const rGood of Object.keys(Constants.royalGoods)) {
            total += this.getItemCount(rGood);
        }

        return total;
    }

}

//class to hold scores and legal/contraband totals of each player as well as the winner
export class Scores {
    constructor(playerList = Constants.playerColors) {
        //initalize all scores to 0
        this.playerScores = {};
        for (const pColor of playerList) {
            this.playerScores[pColor] = {
                score: 0,
                legal: 0,
                contraband: 0
            };
        }

        //add a winner, winner set state
        this.winner = "";
        this.winnerSet = false;
    }

    //player score setter
    setScore(playerColor, playerScore) {
        this.playerScores[playerColor].score = playerScore;
    }

    //player legal count setter
    setLegalScore(playerColor, legalCount) {
        this.playerScores[playerColor].legal = legalCount;
    }

    //player contraband count setter
    setContrabandScore(playerColor, contrabandCount) {
        this.playerScores[playerColor].contraband = contrabandCount;
    }

    //winner setter
    setWinner(playerColor) {
        this.winner = playerColor;
        this.winnerSet = true;
    }

    //getter for player score
    getScore(playerColor) {
        if (playerColor == "") {
            return 0;
        }
        else {
            return this.playerScores[playerColor].score;
        }
    }

    //get player legal count
    getLegalScore(playerColor) {
        if (playerColor == "") {
            return 0;
        }
        else {
            return this.playerScores[playerColor].legal;
        }
    }

    //get player contraband count
    getContrabandScore(playerColor) {
        if (playerColor == "") {
            return 0;
        }
        else {
            return this.playerScores[playerColor].contraband;
        }
    }

    
    //getter for winner
    getWinner() {
        return this.winner;
    }

    hasWinner() {
        return this.winnerSet;
    }

    //get players
    getPlayers() {
        return Object.keys(this.playerScores);
    }
}