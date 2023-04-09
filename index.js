const fs = require("fs");
const path = require("path");
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

    sync: async () => {
        let exists = fs.existsSync('lang/en');

        if (! exists) {
            let data = await fs.readFileSync(path.resolve(__dirname, 'stubs', 'validations.js.stub'));
            fs.mkdirSync('lang/en', { recursive: true });
            fs.writeFileSync('lang/en/validations.js', data.toString());
        }
    }
}