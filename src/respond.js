const path = require('path')
const { request } = require("express");
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
    console.log(path.join(__dirname, 'app'))
    //check if a developer added another message for the validation
    //if so change the default message with altered one
    if (`${item}.${rule}` in conf.message_aliace) {
        conf.response[item] = conf.message_aliace[`${item}.${rule}`].replace(':item', field_name(item, conf.fields_aliace));
        return;
    }
    conf.response[item] = messages[rule].replace(':item', field_name(item, conf.fields_aliace));
}