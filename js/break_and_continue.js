//Prompt the user for an odd number between 1 and 50. Use a loop and a break statement to continue prompting the user if they enter invalid input.
// Use a loop and the continue statement to output all the odd numbers between 1 and 50, except for the number the user entered.
// Your output should look like this:
//
//
// Number to skip is: 27
//
// Here is an odd number: 1
// Here is an odd number: 3
// . . .
// Here is an odd number: 23
// Here is an odd number: 25
// Yikes! Skipping number: 27
// Here is an odd number: 29
// Here is an odd number: 31
// Here is an odd number: 33
// . . .
// Here is an odd number: 47
// Here is an odd number: 49

"use strict";


var userInput;
var validInput = false;

do {
    userInput = Number(prompt("Give me a number between 1 and 50:"));
    if (userInput > 0 && userInput < 51) {
        validInput = true;
    }
} while (!validInput);


console.log("Number to skip: " + userInput);
for (var i = 0; i < 50; i++) {
    if (i % 2 != 0) {
        if (i == userInput) {
            console.log("Yikes! Skipping number: " + i);
            continue;
        }
        console.log("Here is an odd number: " + i);
    }
}

