'use strict';

import githubApi from './Api/githubApi';
import dependencyCheck from './dependencyCheck';
import repositoryManager from './repositoryManager';
import fs from 'fs';
const tempFolder = "./temp/repoClone/";

export async function start(count, mode) {
    // add mode to run by trends or by specific url
    let retVal = [];

    try {
        let trendsList = await githubApi.getTrends({ language: 'javascript', page: 0, per_page: count });

        if (!trendsList) {
            return null;
        }

        for (const item of trendsList) {
            let { clone_url, id } = item;
            let folderPath = `${tempFolder}${id}`;
            try {
                await repositoryManager.cloneRepository(clone_url, folderPath);
                let result = await dependencyCheck.run(item, folderPath);
                retVal.push(result)
            } catch (err) {
                console.error(`Failed to process repository:${clone_url}`);
            } finally {
                fs.rmdir(folderPath, { recursive: true }, (error) => {
                    if (error) {
                        console.log(`failed to remove directory, err:${error}`);
                        // console.log(error);
                    }
                    // else {
                    //     console.log("Non Recursive: Directories Deleted!");
                    // }
                });
            }
        }
    } catch (err) {
        console.error('something went wrong, err:' + err);
    }

    console.table(retVal);
    return retVal;
}