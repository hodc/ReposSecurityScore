// const _Api = require('./_baseAPI');
import * as _Api from './_baseAPI';
const axios = require('axios');
export default class githubApi {
    static async getTrends(options) {
        let retVal = null;
        let url = _Api.Helpers.buildRequest(_Api.EndPoints.Github.Trends, options);
        await axios.get(url)
            .then(response => {
                console.log('result: ' + response.data.items.length);
                retVal = response.data.items;
            })
            .catch(error => {
                console.log(error);
                throw error;
            });
        return retVal;
    }
}