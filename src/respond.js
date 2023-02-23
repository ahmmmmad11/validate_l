const path = require('path')
const messages = require("./messages");

//determine if a field has an alliance
//if so return the alliance
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

    //take validation messages from the built-in messages.js file inside the package
    conf.response[item] = messages[rule].replace(':item', field_name(item, conf.fields_alias));

    //take validation messages from the localization files
    if (localization != null && typeof(localization) == 'object') {
        console.log(localization.messages)
        conf.response[item] = localization.messages[rule].replace(':item', field_name(item, localization.fields));
    }
    
    //check if a developer added another message for the validation
    //if so change the default message with altered one
    if (`${item}.${rule}` in conf.message_alias) {
        conf.response[item] = conf.message_alias[`${item}.${rule}`].replace(':item', field_name(item, conf.fields_alias));
    }
}