'use strict';

import githubApi from './Api/githubApi';
import dependencyCheck from './dependencyCheckManager';
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
                if (mode == 1) {
                    await repositoryManager.cloneRepository(clone_url, folderPath);
                }
                let result = await dependencyCheck.run(item, folderPath);
                retVal.push(result)
            } catch (err) {
                throw `Failed to process repository:${clone_url}`;
            }
        }
    } catch (err) {
        console.error('something went wrong, err:' + err);
    } finally {
        if (mode == 1) {
            fs.rmdir(tempFolder, { recursive: true }, (error) => {
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

    console.table(retVal);
    return retVal;
}