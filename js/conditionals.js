"use strict";
//start IIFE
(function () {

    /* ########################################################################## */

    /**
     * TODO:
     * Create a function named `analyzeColor` that accepts a string that is a color
     * name as input. This function should return a message which relates to the
     * color stated in the argument of the function. For colors you do not have
     * responses written for, return a string stating so
     *
     * Example:
     *  > analyzeColor('blue') // returns "blue is the color of the sky"
     *  > analyzeColor('red') // returns "Strawberries are red"
     *
     *
     *  > analyzeColor('cyan') // returns "I don't know anything about cyan"
     *
     * You should use an if-else-if-else block to return different messages.
     *
     * Test your function by passing various string literals to it and
     * console.logging the function's return value
     */

    // function analyzeColor(color) {
    //     if (color.toLowerCase() == "red") {
    //         return "Roses are red";
    //     } else if (color.toLowerCase() == "blue") {
    //         return "The ocean is blue";
    //     } else if (color.toLowerCase() == "purple") {
    //         return "Grapes are purple";
    //     } else if (color.toLowerCase() == "green") {
    //         return "Grass is green";
    //     } else if (color.toLowerCase() == "yellow") {
    //         return "The sun is yellow";
    //     } else if (color.toLowerCase() == "pink") {
    //         return "Cotton candy is pink";
    //     } else if (color.toLowerCase() == "orange") {
    //         return "Carrots are orange";
    //     } else if (color.toLowerCase() == "brown") {
    //         return "Chocolate is brown";
    //     } else {
    //         return "I don\'t know anything about " + color;
    //     }
    // }

    //tests
    //console.log(analyzeColor("purple"));
    //console.log(analyzeColor("brown"));
    //console.log(analyzeColor("green"));
    //console.log(analyzeColor("maroon"));
    //console.log(analyzeColor("RED"));
    //console.log(analyzeColor("Blue"));
    //console.log(analyzeColor("yelLOW"));

    // Don't change the next two lines!
    // These lines create two variables for you:
    // - `colors`: a list of the colors of the rainbow
    // - `randomColor`: contains a single random color value from the list (this
    //                  will contain a different color every time the page loads)
    var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    /**
     * TODO:
     * Pass the `randomColor` variable to your 'analyzeColor' function and console.log the results.
     * You should see a different message every time you refresh the page
     */

    //console.log(analyzeColor(randomColor));

    /**
     * TODO:
     * Comment out the code above, and refactor your function to use a switch-case statement
     */

    function analyzeColor(color) {
        color = color.toLowerCase();
        switch (color) {
            case "red":
                return "Roses are red";
            case "blue":
                return "The ocean is blue";
            case "purple":
                return "Grapes are purple";
            case "green":
                return "Grass is green";
            case "yellow":
                return "The sun is yellow";
            case "pink":
                return "Cotton candy is pink";
            case "orange":
                return "Carrots are orange";
            case "brown":
                return "Chocolate is brown";
            default:
                return "I dont know anything about " + color;
        }
    }

    /**
     * TODO:
     * Prompt the user for a color when the page loads, and pass the input from the
     * user to your `analyzeColor` function. Alert the return value from your
     * function to show it to the user.
     */
    var userColor = prompt("Please enter a color");
    alert(analyzeColor(userColor));

    /* ########################################################################## */

    /**
     * TODO:
     * Suppose there's a promotion in Walmart, each customer is given a randomly
     * generated "lucky number" between 0 and 5. If your lucky number is 0 you have
     * no discount, if your lucky number is 1 you'll get a 10% discount, if it's 2,
     * the discount is 25%, if it's 3, 35%, if it's 4, 50%, and if it's 5 you'll get
     * everything for free!.
     *
     * Write a function named `calculateTotal` which accepts a lucky number and total
     * amount, and returns the discounted price.
     *
     * Example:
     * calculateTotal(0, 100) // returns 100
     * calculateTotal(4, 100) // returns 50
     * calculateTotal(5, 100) // returns 0
     *
     * Test your function by passing it various values and checking for the expected
     * return value.
     */
    function calculateTotal(luckyNumber, total) {
        var discount = 0;
        switch (luckyNumber) {
            case 0 :
                discount = 0;
                break;
            case 1 :
                discount = .10;
                break;
            case 2 :
                discount = .25;
                break;
            case 3 :
                discount = .35;
                break;
            case 4 :
                discount = .50;
                break;
            case 5 :
                discount = 1;
                break;
            default :
                return "Lucky number was invalid.";
        }
        var discountedPrice = total - (total * discount);
        return "The new discounted price is $" + discountedPrice;
    }

    console.log(calculateTotal(0, 100));
    console.log(calculateTotal(4, 100));
    console.log(calculateTotal(5, 100));
    console.log(calculateTotal(1, 100));
    console.log(calculateTotal(2, 100));
    console.log(calculateTotal(3, 100));
    console.log(calculateTotal(6, 100));

    /**
     * TODO:
     * Uncomment the line below to generate a random number between 0 and 5.
     * (In this line of code, 0 is inclusive, and 6 is exclusive)
     * Prompt the user for their total bill, then use your `calculateTotal` function
     * and alerts to display to the user what their lucky number was, what their
     * price before the discount was, and what their price after the discount is.
     */
    // Generate a random number between 0 and 6
    var luckyNumber = Math.floor(Math.random() * 6);
    var userTotal = Number(prompt("What is your total bill amount?"));
    alert("Your price before is discount is $" + userTotal + ". Your lucky number was " + luckyNumber + ". " + calculateTotal(luckyNumber, userTotal));
    /**
     * TODO:
     * Write some JavaScript that uses a `confirm` dialog to ask the user if they
     * would like to enter a number. If they click 'Ok', prompt the user for a
     * number, then use 3 separate alerts to tell the user:
     *
     * - whether the number is even or odd
     * - what the number plus 100 is
     * - if the number is negative or positive
     *
     * Do *NOT* display any of the above information
     * if the user enters a value that is not of the number data type.
     * Instead, use an alert to inform them of the incorrect input data type.
     *
     *
     * Can you refactor your code to use functions?
     * HINT: The way we prompt for a value could be improved
     */
    var userDesire = confirm("Would you like to enter a number?");
    if (userDesire == true) {
        allAboutNumbers();
    }

//function to get and display information about a users chosen number
    function allAboutNumbers() {
        var userNumber = Number(prompt("What is your number?"));
        if (isNaN(userNumber)) {
            alert("The input you gave is not a number");
        } else {
            isEven(userNumber);
            plus100(userNumber);
            isPositive(userNumber);
        }
    }

//function to determine if a number is even or odd
    function isEven(number) {
        if (number % 2 == 0) {
            alert("This number is even!")
        } else {
            alert("This number is odd!");
        }
    }

//function to determine what a number plus 100 is
    function plus100(number) {
        alert("Your number of " + number + " plus 100 is " + (number + 100));
    }

//function to determine if a number is positive or negative
    function isPositive(number) {
        if (number >= 0) {
            alert("Your number is positive");
        } else {
            alert("Your number is negative");
        }
    }

//end IIFE
})();