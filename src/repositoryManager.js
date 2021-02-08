'use strict';

import Git from 'nodegit';
import fs from 'fs';

export default class repositoryManager {
    /**
    * Clone repository to you local drive
    * @param {URL for the Repository} clone_url 
    * @param {Local path for the repository git files} folderPath 
    */
    static cloneRepository = async function (clone_url, folderPath) {
        // console.log(`Start clone url:${clone_url} to folder:${folderPath}`);
        if (fs.existsSync(folderPath)) {
            return Git.Repository.open(folderPath)
                .then(function (repo) {
                    return repo.getMasterCommit();
                })
        } else {
            return Git.Clone(clone_url, folderPath, {})
                .then(result => {
                })
                .catch(function (err) {
                    console.log(err);
                    throw err;
                });
        }
    };
}