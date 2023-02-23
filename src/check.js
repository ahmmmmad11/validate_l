const validations = require('./validations');
const respond = require('./respond');

const getFunctionParameters = (fn) => {
    return /\((.*?)\)/.exec(validations[fn].toString())[1];
};

const getArgs = (argsList, field, req, appendix) => {
    let args = [];

    for (let arg of argsList) {
        if (arg === 'item') {
            args.push(req.body[field]);
            continue;
        }

        if (arg === 'field') {
            args.push(field);
            continue;
        }

        if (arg === 'body') {
            args.push(req.body);
            continue;
        }

        if (arg === 'req') {
            args.push(req);
            continue;
        }

        args.push(appendix);
    }

    return args;
};

module.exports = (req, field, rule, conf) => {
    rule = rule.split(':')

    if (rule[0] in validations) {

        if(
            validations[rule[0]](...getArgs(
                getFunctionParameters(rule[0]).split(','),
                field,
                req,
                rule[1]
            ))
        ) {
            return true;
        }

        respond(conf, rule[0], field, rule[1]);

        return false;
    }
}