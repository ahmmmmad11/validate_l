const validations = require('./validations');
const respond = require('./respond');

const getFunctionParameters = (fn) => {
    return /\((.*?)\)/.exec(validations[fn].toString())[1];
};

const breaks = {};

const getArgs = (argsList, field, value, body, appendix) => {
    let args = [];

    for (let arg of argsList) {
        if (arg === 'item') {
            args.push(value);
            continue;
        }

        if (arg === 'field') {
            args.push(field);
            continue;
        }

        if (arg === 'body') {
            args.push(body);
            continue;
        }

        args.push(appendix);
    }

    return args;
};

const validate = async (rule, appendix, field, value, body) => {
    return await validations[rule](
        ...getArgs(
            getFunctionParameters(rule).split(','),
            field,
            value,
            body,
            appendix
        )
    );
};

/**
 * get field value by going deep inside request body object
 * either it's nested objects or arrays
 * */
const looper = async (rule, appendix, field, body, array = false) => {
    let subs = field.split('.');

    if (subs.length === 1 && !array) {
        let value = typeof(body) !== 'object' && !field ? body : body[field];
        return await validate(rule, appendix, field, value, body);
    }

    if (subs.length === 1 && array) {
        return await loopOverArray(rule, appendix, field, body);
    }

    return await loopOverFields(subs, rule, appendix, field, body);
};

const loopOverArray = async (rule, appendix, field, body) => {
    let counter = 0;

    for (let element of body){
        counter ++;

        if (ignore(field, counter)) {
            continue;
        }

        let result = await looper(rule, appendix, field, element);

        if (!result) {
            return result;
        }

        if (result === 'break') {
            toBeIgnored(field, counter);
        }
    }

    return true;
};

const loopOverFields = async (subs, rule, appendix, field, body) => {
    let chain = body;

     for(let element of subs) {
        if (element === '*') {
            let spliceTo = subs.indexOf(element);
            subs.splice(0, spliceTo + 1);
            return await looper(subs.join('.'), chain, true);
        }

        chain = chain[element];
    }

    return await validate(rule, appendix, field, chain, body);
};

const toBeIgnored = (field, counter) => {
    if (breaks[field]) {
        return breaks[field].push(counter)
    }

    breaks[field] = [counter];
}

const ignore = (field, counter) => {
    return breaks[field] ? breaks[field].indexOf(counter) > 0 : false
}

module.exports = async (req, field, rule, conf) => {
    rule = rule.split(':');

    if (rule[0] in validations) {
        let result = await looper(rule[0], rule[1], field, req.body);

        if(result) {
            return result;
        }

        respond(conf, rule[0], field, rule[1]);

        return false;
    }
}