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

}

//class to hold scores of each player as well as the winner
export class Scores {
    constructor(playerList = Constants.playerColors) {
        //initalize all scores to 0
        this.playerScores = {};
        for (const pColor of playerList) {
            this.playerScores[pColor] = 0;
        }

        //add a winner
        this.winner = "";
    }

    //player score setter
    setScore(playerColor, playerScore) {
        this.playerScores[playerColor] = playerScore;
    }

    //if have an object of players and scores, set all at once
    setAll(playersAndScores) {
        this.playerScores = playersAndScores;
    }


    //winner getter
    setWinner(playerColor) {
        this.winner = playerColor;
    }

    //getter for player score
    getScore(playerColor) {
        return this.playerScores[playerColor];
    }

    //getter for winner
    getWinner() {
        return this.winner;
    }

}