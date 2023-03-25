import React from 'react';



//3 types of files
//data types


//need a class for data - use class methods to get/set
//player scores should not be untyped like that
//constants file: place all the defs
//import {thing} from './comnstants'

//make sure everthing is being expoted
export const allModules = ["base", "royalGoods", "blackMarket", "specialOrder", "merryMen"];

export const supportedModules = ["base", "royalGoods"];


export const base = {
    cheese: { score: 3 },
    apples: { score: 2 },
    bread: { score: 3 },
    chickens: { score: 4 },
    money: { score: 1 },
    pepper: { score: 6 },
    mead: { score: 7 },
    silk: { score: 8 },
    crossbows: { score: 9 }
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
        score: 9,
        goodType: "cheese",
        goodBonus: 3
    },
    goudaCheese: {
        name: "Gouda Cheese",
        copies: 2,
        score: 6,
        goodType: "cheese",
        goodBonus: 2
    },
    royalRooster: {
        name: "Royal Rooster",
        copies: 2,
        score: 8,
        goodType: "chickens",
        goodBonus: 2
    },
    greenApples: {
        name: "Green Apples",
        copies: 2,
        score: 4,
        goodType: "apples",
        goodBonus: 2
    },
    goldenApples: {
        name: "Golden Apples",
        copies: 2,
        score: 6,
        goodType: "apples",
        goodBonus: 3
    },
    ryeBread: {
        name: "Rye Bread",
        copies: 2,
        score: 6,
        goodType: "bread",
        goodBonus: 2
    },
    pumperBread: {
        name: "Pumpernickel",
        copies: 1,
        score: 9,
        goodType: "bread",
        goodBonus: 3
    }
}