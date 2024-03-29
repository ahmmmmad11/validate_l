const emptyValue  = (val) => {
    return val === null ||
        val === undefined ||
        val === '' ||
        (typeof (val) === 'object' && Object.keys(val).length === 0);

}

module.exports = {
    after: (item, compared) => {
        return Date.parse(item) >= Date.parse(compared);
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
        return Date.parse(item) <= Date.parse(compared);
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
        let words = suffix.split(',')

        for (let word of words) {
            if (item.endsWith(word)) {
                return true;
            }
        }

        return false;
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

    missing: (item) => {
        return item === undefined;
    },

    missing_if: (item, body, expression) => {
        let value = expression.split(',');

        if(value.length === 1 && expression === 'true' && item) {
            return false;
        }

        if(value.length === 1 && body[expression] && item) {
            return false;
        }

        if(value.length > 1 && body[value[0]] === value[1] && item) {
            return false;
        }

        return item ? true : 'break';
    },

    missing_unless: (item, body, expression) => {
        let value = expression.split(',');

        if(value.length === 1 && expression === 'true' && item) {
            return true;
        }

        if(value.length === 1 && body[expression] && item) {
            return true;
        }

        if(value.length > 1 && body[value[0]] === value[1] && item) {
            return true;
        }

        return item ? false : 'break';
    },

    missing_with: (item, body, fields) => {
        for (let field of fields.split(',')) {
            if (!emptyValue(body[field])) {
                return item === undefined;
            }
        }

        return item ? true : 'break';
    },

    missing_with_all: (item, body, fields) => {
        for (let field of fields.split(',')) {
            if (emptyValue(body[field])) {
                return item ? true : 'break';
            }
        }

        return !item;
    },

    regex: (item, pattern) => {
        return RegExp(pattern).test(String(item));
    },

    required: (item) => {
        if (item == null) return false;
        return item !== '';
    },

    required_if: (item, body, expression) => {
        if (!emptyValue(item)) {
            return true;
        }

        let value = expression.split(',');

        if(value.length === 1 && expression === 'true') {
            return false;
        }

        if(value.length === 1 && body[expression]) {
            return false;
        }

        if (value.length > 1 && body[value[0]] === value[1]) {
            return false;
        }

        return 'break';
    },

    required_unless: (item, body, expression) => {

        if (!emptyValue(item)) {
            return true;
        }

        let value = expression.split(',');

        if(value.length === 1 && expression === 'null') {
            return 'break';
        }

        if(value.length === 1 && body[expression]) {
            return 'break';
        }

        if (value.length > 1 && body[value[0]] === value[1]) {
            return 'break';
        }

        return false;
    },

    required_with: (item, body, fields) => {
        if (!emptyValue(item)) {
            return true;
        }

        for (let field of fields.split(',')) {
            if (!emptyValue(body[field])) {
                return false;
            }
        }

        return 'break';
    },

    required_without: (item, body, fields) => {
        if (!emptyValue(item)) {
            return true;
        }

        for (let field of fields.split(',')) {
            if (emptyValue(body[field])) {
                return 'break';
            }
        }

        return false;
    },

    required_without_all: (item, body, fields) => {
        if (!emptyValue(item)) {
            return true;
        }

        for (let field of fields.split(',')) {
            if (!emptyValue(body[field])) {
                return 'break';
            }
        }

        return false;
    },

    required_with_all: (item, body, fields) => {
        if (!emptyValue(item)) {
            return true;
        }

        for (let field of fields.split(',')) {
            if (emptyValue(body[field])) {
                return 'break';
            }
        }

        return false;
    },

    starts_with: (item, prefix) => {
        let words = prefix.split(',')

        for (let word of words) {
            if (item.startsWith(word)) {
                return true;
            }
        }

        return false;
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