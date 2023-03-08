const fs = require('fs');
const path = require('path');
const check = require('./src/check');


module.exports = {
    validate: (req, res, items, fields= {}, messages= {}) => {
        const conf = {
            response: {},
            fields_alias: fields,
            message_alias: messages,
            lang: req.lang ?? 'en'
        }
    
        for (let item in items) {
            for (let rule of items[item]) {
                let result = check(req, item, rule, conf);
                if (result === 'break' || !result) break;
            }
        }
    
        return conf.response;
    },

    sync: () => {
        console.log(path.join(__dirname))
    }
}