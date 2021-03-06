export const headers = {
    getHeaders: {
        headers: {
            'Content-Type': 'application/vnd.github.v3+json'
        },
        method: 'GET',
    }
}

export const endPoints = {
    github: {
        trends: "https://api.github.com/search/repositories"
    },
}

export const Helpers = {
    buildRequest: function (url, options) {
        let retVal = `${url}?q=${this.serialize(options)}`;
        return retVal;
    },
    serialize: function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    },
}