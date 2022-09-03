const validations = require('./validations')

module.exports = (req, res, items, conf) => {
    let role = term.split(':')
    if (role[0] in validations) {
        if (role.length > 1) {
            return validations[term](conf, req, item, role[1], items[item])
        }
        return validations[term](conf, req, item)
    }
}