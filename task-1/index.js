#!/usr/bin/env node
const readline = require("readline");
const process = require('process');

//** Interface for reading data from a readable stream */
const readlineInterface = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
});

//** Reverces the string. */
function reverseString(string) {
    return string.split("").reverse().join("");
}

/**
 * Gets user input as a string, reverts it and prints the output to the terminal.
 * Repeas the whole process recursively until we end the Node.js process by pressing ctrl + c. 
 */
function ask(inputString) {
    readlineInterface.question(inputString, (resultString) => {
        const result = reverseString(resultString.toString());
        readlineInterface.write(`Result:  ${result}\n`)
        ask(inputString)
    })
};

ask("Put the string to revert it (to stop: CTRL + C): ")



