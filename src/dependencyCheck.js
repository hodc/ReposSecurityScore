'use strict';
import depcheck from 'depcheck';


export default class dependencyCheck {
    /**
     * Start executing the dependencies check on repository
     * @param {represent the repository from Github} item 
     * @param {repository url to clone from} clone_url 
     * @param {folder path where repository cloned} folderPath
     */
    static run = async function (item, folderPath) {

        let retVal = null;

        if (item) {
            try {
                let dependencies = await this.verifyRepositoryDependencies(folderPath);
                let repoScore = this.calculateRepoScore(dependencies);
                retVal = this.toDTO(item, repoScore);
            } catch (err) {
                console.error("an error happened: " + err)
            }
        }

        return retVal;
    };




    /**
    * Verify dependencies are not used.   
    * folderPath - the path to the repository git files
    */
    static verifyRepositoryDependencies = async function (folderPath) {
        let retVal = null;

        try {
            await depcheck(folderPath, depcheckOptions).then((unused) => {
                retVal = unused.dependencies;
                // console.log(unused.dependencies); // an array containing the unused dependencies
                // console.log(unused.devDependencies); // an array containing the unused devDependencies
                // console.log(unused.missing); // a lookup containing the dependencies missing in `package.json` and where they are used
                // console.log(unused.using); // a lookup indicating each dependency is used by which files
                // console.log(unused.invalidFiles); // files that cannot access or parse
                // console.log(unused.invalidDirs); // directories that cannot access
            });
        } catch (err) {
            console.warn("An error occurred while try to verify dependencies")
        }

        return retVal;
    };

    /**
     * Calculate the risk score by dependencies length.
     * @param {dependencies list} dependencies 
     */
    static calculateRepoScore = function (dependencies) {
        let retVal = 0;

        if (dependencies && dependencies.length >= 0) {
            let numberOfUnused = dependencies.length;
            if (1 <= numberOfUnused && numberOfUnused <= 5) {
                retVal = 1;
            } else if (6 <= numberOfUnused && numberOfUnused <= 10) {
                retVal = 2;
            } else if (11 <= numberOfUnused && numberOfUnused <= 20) {
                retVal = 3;
            } else if (21 <= numberOfUnused && numberOfUnused <= 30) {
                retVal = 4;
            } else if (numberOfUnused > 30) {
                retVal = 5;
            }
        } else {
            retVal = null;
        }

        return retVal;
    }

    /**
     * Return an object represent the score and the repository details
     * @param {Repository by Github representation} item 
     * @param {calculated score} score 
     */
    static toDTO = function (item, score) {
        let retVal = {
            repo_url: item.clone_url,
            owner: item.owner.login,
            score
        }

        return retVal;
    }
}

const depcheckOptions = {
    ignoreBinPackage: false, // ignore the packages with bin entry
    skipMissing: false, // skip calculation of missing dependencies
    ignorePatterns: [
        // files matching these patterns will be ignored
        'sandbox',
        'dist',
        'bower_components',
    ],
    ignoreMatches: [
        // ignore dependencies that matches these globs
        'grunt-*',
    ],
    parsers: {
        // the target parsers
        '**/*.js': depcheck.parser.es6,
        '**/*.jsx': depcheck.parser.jsx,
    },
    detectors: [
        // the target detectors
        depcheck.detector.requireCallExpression,
        depcheck.detector.importDeclaration,
    ],
    specials: [
        // the target special parsers
        depcheck.special.eslint,
        depcheck.special.webpack,
    ],
    package: {
        // may specify dependencies instead of parsing package.json
        // dependencies: {
        //     lodash: '^4.17.15',
        // },
        devDependencies: {
            eslint: '^6.6.0',
        },
        peerDependencies: {},
        optionalDependencies: {},
    },
};