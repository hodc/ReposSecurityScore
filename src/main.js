'use strict';

import githubApi from './Api/githubApi';
import repoVerification from './dependencyCheck';

export async function start(url, mode) {
    
    // add mode to run by trends or by specific url
    let ret = await githubApi.getTrends({ language: 'javascript' });
    let result = await repoVerification.start(ret);
    console.table(result);
    return result;
}