'use strict';

import arg from 'arg';
import { start } from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {

            '--repoURL': String,
            '--mode': Number,
            '-u': '--repoURL',
            '-m': '--mode',
            
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        repositoryURL: args['--repoURL'] || "https://api.github.com/search/repositories",
        mode: args['--mode'] || 1,
        // template: args._[0],
    };
}

export function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    console.table(options);
    start(options.repositoryURL, options.mode);
}
