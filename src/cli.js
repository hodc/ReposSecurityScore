'use strict';

import arg from 'arg';
import { start } from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {

            '--count': Number,
            '--mode': Number,
            '-c': '--count',
            '-m': '--mode',

        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        count: args['--count'] || 10,
        mode: args['--mode'] || 1
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    console.table(options);
    await start(options.count, options.mode);
}
