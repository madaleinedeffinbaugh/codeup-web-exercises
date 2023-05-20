"use strict";

(function() {

function gitRequest(username) {
    return fetch(`https://api.github.com/users/${username}/events`, {headers: {'Authorization': GITHUB_TOKEN}})
        .then(res => res.json())
        .then(data => data[0].created_at)
}

console.log(gitRequest('madaleinedeffinbaugh'));

function wait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time);
        }, time);
    });
}

wait(1000).then(res => console.log(`You'll see this after ${res/1000} second(s)`));
wait(3000).then(res => console.log(`You'll see this after ${res/1000} second(s)`));
wait(5000).then(res => console.log(`You'll see this after ${res/1000} second(s)`));

})();