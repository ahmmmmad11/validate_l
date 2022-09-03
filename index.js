const check = require("./src/check");

module.exports = (req, res, items, fields={}, messages={}) => {
    //initialize response 
    const conf = {
        response: {},
        fields_aliace: fields,
        message_aliace: messages,
    }

    for (item in items) {
        for (term of items[item]) {
            if (!check(req, res, items, conf)) break;
        }
    }

    console.log(conf.response)
}