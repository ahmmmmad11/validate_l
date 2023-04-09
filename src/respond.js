const messages = require("./messages");

//determine if a field has an alias
//if so return the alliance
const field_name = (item, user_fields) => {
    if (item in user_fields){
        return user_fields[item]
    }
    return item
};

const value = (message, val) => {
    return message.replace(':value', val);
}

module.exports = (conf, rule, item, extra = {}) => {
    let localization;

    try {
        localization = require(`lang/${conf.lang}/validations.js`);
    }
    catch (e) {
        localization = null
    }

    let message;

    //take validation messages from the built-in messages.js file inside the package
    message = messages[rule].replace(':item', field_name(item, conf.fields_alias));
    message = value(message, extra);

    //take validation messages from the localization files
    if (localization != null && typeof(localization) == 'object') {
        message = localization["messages"][rule].replace(':item', field_name(item, localization["fields"]));
        message = value(message, extra);
    }

    //check if a developer added another message for the validation
    //if so change the default message with altered one
    if (`${item}.${rule}` in conf.message_alias) {
        message = conf.message_alias[`${item}.${rule}`].replace(':item', field_name(item, conf.fields_alias));
        message = value(message, extra);
    }

    conf.response[item] = message;
}