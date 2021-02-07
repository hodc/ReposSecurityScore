'use strict';

import githubApi from './Api/githubApi';
import dependencyCheck from './dependencyCheck';
import repositoryManager from './repositoryManager';
import fs from 'fs';
const tempFolder = "./temp/repoClone/";

export async function start(url, mode) {

    // add mode to run by trends or by specific url
    let trendsList = await githubApi.getTrends({ language: 'javascript' });
    if (!trendsList) {
        return null;
    }
    let trendsSecurityResults = [];
    trendsList = trendsList.slice(0, 10);
    for (const item of trendsList) {
        let { clone_url, id } = item;
        let folderPath = `${tempFolder}${id}`;
        try {
            await repositoryManager.cloneRepository(clone_url, folderPath);
            let result = await dependencyCheck.start(item, clone_url, folderPath)
            trendsSecurityResults.push(result)
        } catch (err) {
            console.error(`Failed to process repository:${clone_url}`);
        } finally {
            fs.rmdir(folderPath, { recursive: true }, (error) => {
                if (error) {
                    console.log('failed to remove directory');
                    // console.log(error);
                }
                else {
                    // console.log("Non Recursive: Directories Deleted!");
                }
            });
        }

    }

    console.table(trendsSecurityResults);
    return trendsSecurityResults;
}