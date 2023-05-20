"use strict";

(function() {

const users = [
    {
        id: 1,
        name: 'ryan',
        email: 'ryan@codeup.com',
        languages: ['clojure', 'javascript'],
        yearsOfExperience: 5
    },
    {
        id: 2,
        name: 'luis',
        email: 'luis@codeup.com',
        languages: ['java', 'scala', 'php'],
        yearsOfExperience: 6
    },
    {
        id: 3,
        name: 'zach',
        email: 'zach@codeup.com',
        languages: ['javascript', 'bash'],
        yearsOfExperience: 7
    },
    {
        id: 4,
        name: 'fernando',
        email: 'fernando@codeup.com',
        languages: ['java', 'php', 'sql'],
        yearsOfExperience: 8
    },
    {
        id: 5,
        name: 'justin',
        email: 'justin@codeup.com',
        languages: ['html', 'css', 'javascript', 'php'],
        yearsOfExperience: 9
    }
];

let knowsAtLeastThree = users.filter(user => user.languages.length >= 3);

// console.log(knowsAtLeastThree)

let emails = users.map(user => user.email);

// console.log(emails)

let totalYearsOfExperience = users.reduce((total, person) => {
    return total + person.yearsOfExperience
},0)

let averageExperience = totalYearsOfExperience / users.length;

// console.log(totalYearsOfExperience)
// console.log(averageExperience);

let longestEmail = users.reduce((total, person) => {
    if(person.email.length > total.length) {
        total = person.email
    }
    return total
},"")

// console.log(longestEmail)


let names = users.reduce((accumulation, person) => {
    if(users.indexOf(person) === users.length -1 ) {
        return accumulation + `${person.name}.`
    } else {
        return accumulation + `${person.name}, `
    }

}, "Your instructors are: ")

// console.log(names)


//bonus
let uniqueLanguages = users.reduce((all, person) => {
    person.languages.forEach(language => {
        if(!all.includes(language)) {
            all.push(language);
        }
    });
    return all;
},[])

console.log(uniqueLanguages);

})();