module.exports = {
    after: (item, compared, roles = []) => {
        return Date.parse(item) <= Date.parse(compared);
    },

    alpha: (item) => {
        const pattern = /[A-z]/;

        return pattern.test(String(item));
    },

    alphanumeric: (item) => {
        const pattern = /^[A-z].*[0-9].*/;

        return pattern.test(String(item));
    },

    array: (item) => {
        return Array.isArray((item));
    },

    before: (item, compared, roles = []) => {
        return Date.parse(item) >= Date.parse(compared);
    },

    boolean: (item) => {
        return typeof (item) == 'boolean';
    },

    confirmed: (item) => {
        return !(!req.body[item + '_confirmation'] || req.body[item + '_confirmation'] !== item);
    },

    date: (item) => {
        return !isNaN(Date.parse(item));
    },

    email: (item) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return pattern.test(String(item).toLowerCase());
    },

    end_with: (item, suffix, roles = []) => {
        return item.endsWith(suffix);
    },

    in: (item, list, roles = []) => {
        let listArray = typeof(list) === 'string' ? list.split(',') : list;

        return listArray.find((element) => element === item);
    },

    notin: (item, list, roles = []) => {
        let listArray = typeof(list) === 'string' ? list.split(',') : list;

        return !listArray.find((element) => element === item);
    },

    number: (item) => {
        return String(Number(item)) !== 'NaN';
    },

    max: (item, len, roles) => {
        //if the type is a number we will compare the value
        if (typeof(item) === 'number' && item > len) {

            return false;
        }

        //if the type is a string we will compare the length
        return !(typeof (item) === 'string' && item.length > len);
    },

    min: (item, len, roles) => {
        //if the type is a number we will compare the value
        if (typeof(item) === 'number' && item < len) {

            return false;
        }

        //if the type is a string we will compare the length
        return !(typeof (item) === 'string' && item.length < len);
    },

    regx: (item, pattern, roles = []) => {
        return RegExp(pattern).test(String(item));
    },

    required: (item) => {
        return !(!(item in req.body) || item === '');
    },

    start_with: (item, prefix, roles = []) => {
        return item.startsWith(prefix);
    },

    string: (item) => {
        return typeof (item) == 'string';
    },

    url: (item) => {
        const isValidUrl = urlString => {
            let url;

            try { 
                  url =new URL(urlString); 
            }
            catch(e){ 
              return false; 
            }

            return url.protocol === "http:" || url.protocol === "https:";
        }

        return isValidUrl(item);
    },
};