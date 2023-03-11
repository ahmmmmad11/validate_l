const check = require('./src/check');


module.exports = {
    validate: async (req, res, items, fields= {}, messages= {}) => {
        const conf = {
            response: {},
            fields_alias: fields,
            message_alias: messages,
            lang: req.lang ?? 'en'
        }
    
        for (let item in items) {
            for (let rule of items[item]) {
                let result = await check(req, item, rule, conf);
                if (result === 'break' || !result) break;
            }
        }
    
        return conf.response;
    },
}