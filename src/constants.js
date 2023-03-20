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

export const royalGoods = {
    bleuCheese: {
        name: "Bleu Cheese",
        copies: 1,
        value: 9,
        good: "cheese",
        goodBonus: 3
    },
    goudaCheese: {
        name: "Gouda Cheese",
        copies: 2,
        value: 6,
        good: "cheese",
        goodBonus: 2
    },
    royalRooster: {
        name: "Royal Rooster",
        copies: 2,
        value: 8,
        good: "chickens",
        goodBonus: 2
    },
    greenApples: {
        name: "Green Apples",
        copies: 2,
        value: 4,
        good: "apples",
        goodBonus: 2
    },
    goldenApples: {
        name: "Golden Apples",
        copies: 2,
        value: 6,
        good: "apples",
        goodBonus: 3
    },
    ryeBread: {
        name: "Rye Bread",
        copies: 2,
        value: 6,
        good: "bread",
        goodBonus: 2
    },
    pumperBread: {
        name: "Pumpernickel",
        copies: 1,
        value: 9,
        good: "bread",
        goodBonus: 3
    }
}