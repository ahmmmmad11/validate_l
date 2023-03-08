module.exports = {
    after: (item, compared) => {
        return Date.parse(item) <= Date.parse(compared);
    },

    alpha: (item) => {
        const pattern = /[A-z]/;

        return pattern.test(item);
    },

    alpha_num: (item) => {
        const pattern = /^[A-z].*[0-9].*/;

        return pattern.test(item);
    },

    array: (item) => {
        return Array.isArray((item));
    },

    before: (item, compared) => {
        return Date.parse(item) >= Date.parse(compared);
    },

    boolean: (item) => {
        return typeof (item) == 'boolean';
    },

    confirmed: (item, field, body) => {
        return body[field + '_confirmation'] === item;
    },

    date: (item) => {
        return !isNaN(Date.parse(item));
    },

    email: (item) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return pattern.test(String(item).toLowerCase());
    },

    ends_with: (item, suffix) => {
        return item.endsWith(suffix);
    },

    in: (item, list) => {
        let listArray = typeof(list) === 'string' ? list.split(',') : list;

        return listArray.find((element) => element === item);
    },

    not_in: (item, list) => {
        let listArray = typeof(list) === 'string' ? list.split(',') : list;

        return !listArray.find((element) => element === item);
    },

    nullable: (item) => {
        if (item === null || item === '' || item === undefined) {
            return 'break'
        }
        return true;
    },

    number: (item) => {
        if (!item) return false;
        return String(Number(item)) !== 'NaN';
    },

    max: (item, len) => {
        //if the type is a number we will compare the value
        if (typeof(item) === 'number' && item > len) {

            return false;
        }

        //if the type is a string we will compare the length
        return !(typeof (item) === 'string' && item.length > len);
    },

    min: (item, len) => {
        //if the type is a number we will compare the value
        if (typeof(item) === 'number' && item < len) {

            return false;
        }

        //if the type is a string we will compare the length
        return !(typeof (item) === 'string' && item.length < len);
    },

    regex: (item, pattern) => {
        return RegExp(pattern).test(String(item));
    },

    required: (item) => {
        if (item == null) return false;
        return item !== '';
    },

    starts_with: (item, prefix) => {
        return item.startsWith(prefix);
    },

    string: (item) => {
        return typeof (item) == 'string';
    },

    url: (item) => {

        let url;

        try {
              url =new URL(item);
        }
        catch(e){
          return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    },
};