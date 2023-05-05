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

var knowsAtLeastThree = users.filter(user => user.languages.length >= 3);

// console.log(knowsAtLeastThree)

var emails = users.map(user => user.email);

// console.log(emails)

var totalYearsOfExperience = users.reduce((total, person) => {
    return total + person.yearsOfExperience
},0)

// console.log(totalYearsOfExperience)

var longestEmail = users.reduce((total, person) => {
    if(person.email.length > total.length) {
        total = person.email
    }
    return total
},"")

// console.log(longestEmail)


var names = users.reduce((accumulation, person) => {
    if(users.indexOf(person) === users.length -1 ) {
        return accumulation + `${person.name}.`
    } else {
        return accumulation + `${person.name}, `
    }

}, "Your instructors are: ")

// console.log(names)