/* 1. For each of the following code blocks, read the code and predict
what the result of evaluating it would be, then execute the statement(s)
in the Chrome console. */
console.log("\n******Exercise 1********");
var a = 1;
var b = a++;
var c = ++a;
// what is the value of a, b, and c?
//prediction: 3, 1, 3
// output:
console.log(a); //3
console.log(b); //1
console.log(c); //3


var d = "hello";
var e = false;
d++; //outcome NaN
e++; //outcome 0
//prediction: both will produce an error?


var perplexed; // perplexed is undefined (no value is assigned)
perplexed + 2; //outcome 2
//prediction - NaN or 2


var price = 2.7;
price.toFixed(2); //outcome '2.70'
//prediction: 2.70

var price = "2.7";
//price.toFixed(2); //outcome uncaught typeError
//prediction: NaN

isNaN(0) //prediction: false -- outcome: false
isNaN(1) //prediction: false -- outcome: false
isNaN("") //prediction: true -- outcome: false              // wrong why are empty strings considered numbers?
isNaN("string") //prediction: true -- outcome: true
isNaN("0") //prediction: false -- outcome: false
isNaN("1") //prediction: false -- outcome: false
isNaN("3.145") //prediction: false -- outcome: false
isNaN(Number.MAX_VALUE) //prediction: false -- outcome: false
isNaN(Infinity) //prediction: true -- outcome: false                // wrong - note that infinity is considered a number
isNaN("true") //prediction: true -- outcome: true
isNaN(true) //prediction: false -- outcome: false
isNaN("false") //prediction: true -- outcome: true
isNaN(false) //prediction: true -- outcome: false           // wrong - why?

// to illustrate why the isNaN() function is needed:
NaN == NaN

!true //prediction: false -- outcome: false
!false //prediction: true -- outcome: true
!!true //prediction: true -- outcome: true
!!false //prediction: false -- outcome: false
!!0 //prediction: false -- outcome: false
!!-0 //prediction: false -- outcome: false
!!1 //prediction: true -- outcome: true
!!-1 //prediction: true -- outcome: true
!!0.1 //prediction: true -- outcome: true
!!"hello" //prediction: true -- outcome: true
!!"" //prediction: false -- outcome: false
!!'' //prediction: false -- outcome: false
!!"false" //prediction: true -- outcome: true
!!"0" //prediction: false -- outcome: true


/* 2.Execute the following statement in the Chrome JavaScript console and then follow the directions below.

var sample = "Hello Codeup";

Use .length to find the number of characters in the string.
Try to make the sample string all upper or all lower case.
Update the variable sample via concatenation so that it contains "Hello Codeup Students".
Replace "Students" with "Class".
Find the index of "c" using .indexOf(). What do you observe?
Find the index of "C" using .indexOf().
Retrieve a substring that contains only the word "Codeup" by using indexOf() and substring().
 */
console.log("\n\n*******Exercise 2*********")
var sample = "Hello Codeup";

console.log(sample.length);
console.log(sample.toUpperCase());
sample = sample + " Students";
console.log(sample);
sample = sample.replace("Students", "Class");
console.log(sample);
console.log(sample.indexOf("c"));
//observed it's -1 - likely because it does not exist
console.log(sample.indexOf("C")); //6
console.log(sample.substring(6, 12));

/* 3. Write some JavaScript code, that is, variables and operators, to describe the
following scenarios. Do not worry about the real operations to get the values, the
goal of these exercises is to understand how real world conditions can be represented
with code.

-You have rented some movies for your kids: The little mermaid (for 3 days), Brother
Bear (for 5 days, they love it), and Hercules (1 day, you don't know yet if they're
going to like it). If price for a movie per day is $3, how much will you have to pay?

-Suppose you're working as a contractor for 3 companies: Google, Amazon and Facebook,
they pay you a different rate per hour. Google pays $400, Amazon $380, and Facebook $350.
How much will you receive in payment for this week? You worked 10 hours for Facebook, 6
hours for Google and 4 hours for Amazon.

-A student can be enrolled in a class only if the class is not full and the class schedule
does not conflict with her current schedule.

-A product offer can be applied only if a person buys more than 2 items, and the offer
has not expired. Premium members do not need to buy a specific amount of products.
*/
console.log("\n\n******Exercise 3********");
//Scenario 1
console.log("Scenario 1");
var pricePerDay = 3;
var daysOfLittleMermaid = 3;
var daysOfBrotherBear = 5;
var daysOfHercules = 1;

var priceMermaid = pricePerDay * daysOfLittleMermaid;
var priceBrotherBear = pricePerDay * daysOfBrotherBear;
var priceHercules = pricePerDay * daysOfHercules;

var totalPrice = priceHercules + priceMermaid + priceBrotherBear;

console.log("Total cost: " + totalPrice);

//Scenario 2
console.log("\nScenario 2");
var googleRate = 400;
var amazonRate = 380;
var facebookRate = 350;

var hoursFacebook = 10;
var hoursGoogle = 6;
var hoursAmazon = 4;

var recievingFacebook = facebookRate * hoursFacebook;
var recievingGoogle = googleRate * hoursGoogle;
var recievingAmazon = amazonRate * hoursAmazon;

var totalWages = recievingAmazon + recievingGoogle + recievingFacebook;

console.log("Money recieved this week: " + totalWages);

//Scenario 3
console.log("\nScenario 3");
var full = false;
var conflicts = false;
var canEnroll;

if (!full && !conflicts) {
    canEnroll = true;
} else {
    canEnroll = false;
}

console.log("Can this student enoll? " + canEnroll);

//Scenario 4
console.log("\nScenario 4");
var numItemsBought = 4;
var premiumMember = false;
var offerExpired = false;
var offerApplied;

if ((numItemsBought > 2 || premiumMember) && !offerExpired) {
    offerApplied = true;
} else {
    offerApplied = false;
}

console.log("Offer Applied: " + offerApplied);

/* 4. Use the following code to follow the instructions below:


var username = 'codeup';
var password = 'notastrongpassword';
Create a variable that holds a boolean value for each of the following conditions:

the password must be at least 5 characters
the password must not include the username
the username must be no more than 20 characters
neither the username or password can start or end with whitespace
*/
console.log("\n\n******Exercise 4********");
var username = 'codeup';
var password = 'notastrongpassword';

var passwordLength;
var passwordNoUsername;
var usernameLength;
var noWhiteSpace;

if (password.length > 5) {
    passwordLength = true;
} else {
    passwordLength = false;
}

if (!password.includes(username)) {
    passwordNoUsername = true;
} else {
    passwordNoUsername = false;
}

if (username.length <= 20 ) {
    usernameLength = true;
} else {
    usernameLength = false;
}

username = username.trim();
password = password.trim();
noWhiteSpace= true;


console.log("Password is at least 5 characters: " + passwordLength);
console.log("Password does not include username: " + passwordNoUsername);
console.log("Username is not more than 20 characters: " + usernameLength);
console.log("There are no whitespace! " + noWhiteSpace);
