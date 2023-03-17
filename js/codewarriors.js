function spinWords(string){
    var splitStringIntoWords = string.split(" ");
    for(var i = 0; i < splitStringIntoWords.length; i++) {
        if (splitStringIntoWords[i].length >= 5) {
            splitStringIntoWords[i] = splitStringIntoWords[i].split("");
            splitStringIntoWords[i] = splitStringIntoWords[i].reverse();
            splitStringIntoWords[i] = splitStringIntoWords[i].join("");
        }
    }
    splitStringIntoWords = splitStringIntoWords.join(" ");
    return splitStringIntoWords;
}

console.log(spinWords("Hey fellow warriors"));