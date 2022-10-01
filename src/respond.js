const path = require('path')
const messages = require("./messages");

//detrmine if a field has an aliace
//if so return the aliace
const field_name = (item, user_fields) => {
    if (item in user_fields){
        return user_fields[item]
    }
    return item
}

module.exports = (conf, rule, item, extra = {}) => {
    let localization = null;
    try {
        localization = require(path.resolve(`validations/${conf.lang}.js`))
    }
    catch (e) {
        localization = null
    }

    //take validation messages from the built in messages.js file inside the package
    conf.response[item] = messages[rule].replace(':item', field_name(item, conf.fields_aliace));

    //take validation messages from the localization files
    if (localization != null && typeof(localization) == 'object') {
        console.log(localization.messages)
        conf.response[item] = localization.messages[rule].replace(':item', field_name(item, localization.fields));
    }
    
    //check if a developer added another message for the validation
    //if so change the default message with altered one
    if (`${item}.${rule}` in conf.message_aliace) {
        conf.response[item] = conf.message_aliace[`${item}.${rule}`].replace(':item', field_name(item, conf.fields_aliace));
        return;
    }
}