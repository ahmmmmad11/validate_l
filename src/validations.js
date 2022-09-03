const respond = require('./respond')

function getFuncName () {return getFuncName.caller.name;}

module.exports = {
    required: (conf, req, item) => {
        if (!(item in req.body) || req.body[item] == '') {
            respond(conf, getFuncName(), item)
            return false;
        }
        return true;
    },

    email: (conf, req, item) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (! pattern.test(String(req.body[item]).toLowerCase())) {
            respond(conf, getFuncName(), item)
            return false;
        }
        return true;
    },

    url: (conf, req, item) => {
        const isValidUrl = urlString=> {
            let url;
            try { 
                  url =new URL(urlString); 
            }
            catch(e){ 
              return false; 
            }
            return url.protocol === "http:" || url.protocol === "https:";
        }

        if (! isValidUrl(req.body[item])) {
            respond(conf, getFuncName(), item)
            return false;
        }

        return true;
    },

    number: (conf, req, item) => {
        if (String(Number(req.body[item])) == 'NaN') {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    string: (conf, req, item) => {
        if (typeof(req.body[item]) != 'string') {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    boolean: (conf, req, item) => {
        if (typeof(req.body[item]) != 'boolean') {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    array: (conf, req, item) => {
        if (! Array.isArray((req.body[item]))) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    confirmed: (conf, req, item) => {
        if (!req.body[item + '_confirmation'] || req.body[item + '_confirmation'] != req.body[item] ) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    min: (conf, req, item, len, roles) => {
        if ('number' in roles && Number(req.body[item]) < len) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    max: (conf, req, item, len, roles) => {
        if ('number' in roles && Number(req.body[item]) > len) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    regx: (conf, req, item, pattern, roles) => {
        let str = String(req.body[item])
        if (! pattern.test(str)) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },
};