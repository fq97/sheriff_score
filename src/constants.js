import React from 'react';



//3 types of files
//data types


//need a class for data - use class methods to get/set
//player scores should not be untyped like that
//constants file: place all the defs
//import {thing} from './comnstants'

//make sure everthing is being expoted
export const itemVals = {
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

export const kqBonus = {
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


export const playerColors = ["blue", "red", "green", "purple", "yellow", "black"];