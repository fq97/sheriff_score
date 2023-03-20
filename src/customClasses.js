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
        //for each module
        for (const module of moduleList) {

            switch (module) {
                case "base":
                    this.base = {};
                    Object.keys(Constants.baseItemScores).map(
                        (item) => { this.base[item] = 0; }
                    );
                    break;

                case "royalGoods":
                    this.royalGoods = {};
                    Object.keys(Constants.royalGoods).map(
                        (item) => { this.royalGoods[item] = 0; }
                    );
                    break;

                default:
                    console.log("in player class constructor. mistake made in module selection");
            }

        }
    }

    //setter: takes an object of key value pairs of item name and item count
    updateCounts(itemsAndCounts) {
        this.items = itemsAndCounts;
    }

    //getter: return single item
    getItemCount(item) {
        return this.items[item];
    }

    //getter: return all items this.items
    getAllCounts() {
        return this.items;
    }


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