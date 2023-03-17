"use strict";
//start IIFE
(function() {
    //Create a function named showMultiplicationTable that accepts a number and console.logs the multiplication table for that number (just multiply by the numbers 1 through 10)
    function showMultiplicationTable(number) {
        for (var i = 1; i < 11; i++) {
            var result = number*i;
            console.log(number + " x " + i + " = " + result);
        }
    }

    //testing the function by calling it with various numbers
    showMultiplicationTable(5);
    showMultiplicationTable(3);
    showMultiplicationTable(7);
    showMultiplicationTable(8);
    showMultiplicationTable(2);

    //Use a for loop and the code from the previous lessons to generate 10 random numbers between 20 and 200 and output to the console whether each number is odd or even. For example:
    for (var i = 0; i < 10; i++) {
        var randomNumber = Math.floor(Math.random() * 181) + 20;
        if (randomNumber % 2 == 0) {
            console.log(randomNumber + " is even.");
        } else {
            console.log(randomNumber + " is odd.");
        }
    }

    //Create a for loop that uses console.log to create the output shown below.
    // 1
    // 22
    // 333
    // 4444
    // 55555
    // 666666
    // 7777777
    // 88888888
    // 999999999
    //option1 - nested loop?
    function nestedLoop() {
        var result = "This is the nested loop version.";
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < i; j++) {
                result = result  + i;
            }
            result = result + "\n";
        }
        console.log(result);
    }
    //option 2 - switch statement?
    function switchMethod() {
        console.log("This is the switch method.")
        for (var i = 1; i < 10; i++) {
            switch (i) {
                case 1:
                    console.log(i);
                    break;
                case 2:
                    console.log(i,i);
                    break;
                case 3:
                    console.log(i,i,i);
                    break;
                case 4:
                    console.log(i,i,i,i);
                    break;
                case 5:
                    console.log(i,i,i,i,i);
                    break;
                case 6:
                    console.log(i,i,i,i,i,i);
                    break;
                case 7:
                    console.log(i,i,i,i,i,i,i);
                    break;
                case 8:
                    console.log(i,i,i,i,i,i,i,i);
                    break;
                case 9:
                    console.log(i,i,i,i,i,i,i,i,i);
                    break;
                default:
                    console.log("Something went wrong.");
                    break;
            }
        }
    }

    //option 3 - stringify
    function stringify() {
        for (let i = 1; i < 10; i ++) {
            var stringify = i.toString();
            console.log(stringify.repeat(i));
        };
    };

    //using all three functions to print the pattern (i picked my favorite and commented the rest)
    nestedLoop();
    //switchMethod();
    //stringify();

    //Create a for loop that uses console.log to create the output shown below.
    // 100
    // 95
    // 90
    // 85
    // 80
    // 75
    // 70
    // 65
    // 60
    // 55
    // 50
    // 45
    // 40
    // 35
    // 30
    // 25
    // 20
    // 15
    // 10
    // 5

    for (var i = 101; i > 1; i--) {
        if (i % 5 == 0) {
            console.log(i);
        }
    }







//End IIFE
})();