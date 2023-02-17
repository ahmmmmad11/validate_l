const fs = require('fs');
const path = require('path');
const check = require("./src/check");


module.exports = {
    validate: (req, res, items, fields={}, messages={}) => {
        //initialize config

        const conf = {
            response: {},
            fields_alliace: fields,
            message_aliace: messages,
            lang: req.lang ?? 'en'
        }
    
        for (let item in items) {
            for (let term of items[item]) {
                if (!check(req, res, items, conf)) break;
            }
        }
    
        console.log(conf.response)
    },

    sync: () => {
        console.log(path.join(__dirname))
    }
}