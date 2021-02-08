// const _Api = require('./_baseAPI');
import * as _baseApi from './_baseAPI';
const axios = require('axios');
export default class githubApi {
    static async getTrends(options, count) {
        let retVal = null;
        let url = _baseApi.Helpers.buildRequest(_baseApi.endPoints.github.trends, options);
        await axios.get(url)
            .then(response => {
                console.log('getTrends results count: ' + response.data.items.length);
                retVal = response.data.items;
            })
            .catch(error => {
                console.log(error);
                throw error;
            });
        return retVal;
    }
}