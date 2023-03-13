"use strict";
//Exercise hello message on console log
console.log("Hello from external JavaScript");

//Exercise hello message to user
alert("Welcome to my Website!");

//exercise asking the user for their favorite color and displaying it back to them
var userInput = prompt("What is your favorite color?");
alert("Great, " + userInput + " is my favorite color too!");

//Exercise - do exercise 3 from the previous lesson

//3.1
alert("Exercise 3: Scenario 1");
//gathering input from the user about how many days they had each movie and then saving it
var daysOfLittleMermaid = Number(prompt("How many days did you rent The Little Mermaid?"));
var daysBrotherBear = Number(prompt("How many days did you rent Brother Bear?"));
var daysOfHercules = Number(prompt("How many days did you rent Hercules?"));
//calculating the cost
var totalCost = 3 * (daysOfHercules + daysBrotherBear + daysOfLittleMermaid);
//displaying it to the user through an alert
alert("The total cost of renting all three movies is $" + totalCost);

//3.2
alert("Exercise 3: Scenario 2");
//saving the rates of each company to be used later
var googleRate = 400;
var facebookRate = 350;
var amazonRate = 380;
//gathering from the user how many hours they worked per company
var hoursFacebook = Number(prompt("How many hours did you work for Facebook this week?"));
var hoursGoogle = Number(prompt("How many hours did you work for Google this week?"));
var hoursAmazon = Number(prompt("How many hours did you work for Amazon this week?"));
//calculating their total pay based on the rates and hours
var wagesRecieved = (googleRate * hoursGoogle) + (facebookRate * hoursFacebook) + (amazonRate * hoursAmazon);
//displaying it back to the user
alert("You will be receiving a total of $" + wagesRecieved + " for work this week! Woohoo!");

//3.3
alert("Exercise 3: Scenario 3");
//Asking the user if they would like to sign up for classes.
var wantToEnroll = confirm("Would you like to sign up for classes?");
//if statement to try and sign then up only if they want it.
if (wantToEnroll) {
    //prompting the user to determine if the class is full or conflicts with their current schedule
    var full = confirm("Is this class full? Hit \"Ok\" for Yes and \"Cancel\" for No");
    var conflicts = confirm("Does the class conflict with other classes on the schedule? Hit \"Ok\" for Yes and \"Cancel\" for No");
    //if the class is BOTH not full and does not conflict, then the student is allowed to enroll
    var canEnroll = !full && !conflicts;
    //informing the student of their enrollment eligibility
    alert("It is " + canEnroll + " that you can enroll.");
}


//3.4
alert("Exercise 3: Scenario 4");
//gathering information from the user about the number of items they bought,
//their membership status, and the status of the coupon
var numItemsBought = Number(prompt("How many items did you buy?"));
var premiumMember = confirm("Are you a premium member? \"Ok\" for Yes and \"Cancel\" for No.");
var offerExpired = confirm("Has the offer expired? \"Ok\" for Yes and \"Cancel\" for No.");
//if the coupon has not expired, and they are either a premium member
var offerApplied = (numItemsBought > 2 || premiumMember) && !offerExpired;
//informing the user if the offer was applied
alert("Offer Applied: " + offerApplied);

