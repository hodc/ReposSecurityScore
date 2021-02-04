'use strict';

let api = require('./Api/githubApi');
console.log(api)

export function start(options) {
    console.log(JSON.stringify(options));
}