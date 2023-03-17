//Create a while loop that uses console.log() to create the output shown below.
// 2
// 4
// 8
// 16
// 32
// 64
// 128
// 256
// 512
// 1024
// 2048
// 4096
// 8192
// 16384
// 32768
// 65536

var multiplyMe = 1;

while (multiplyMe < 65536) {
    multiplyMe *= 2;
    console.log(multiplyMe);
}

//An ice cream seller can't go home until she sells all of her cones. First write enough code that generates a random number between 50 and 100 representing the amount of cones to sell before you start your loop. Inside of the loop your code should generate another random number between 1 and 5, simulating the amount of cones being bought by her clients. Use a do-while loop to log to the console the amount of cones sold to each person. The below code shows how to get the random numbers for this exercise.
var conesToSell = Math.floor(Math.random() * 51) + 50;
console.log("I have "+ conesToSell + " cones to sell today!");
do {
    var conesSold = Math.floor(Math.random() * 5) + 1;
    if (conesToSell >= conesSold) {
        console.log(conesSold + " cones sold.");
        conesToSell -= conesSold;
        if(conesToSell == 0) {
            console.log("Yay! I sold them all!")
        }
    } else {
        console.log("I cannot sell you " + conesSold + " cones, I only have " + conesToSell);
    }

} while (conesToSell > 0);


















