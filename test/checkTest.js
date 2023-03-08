const expect = require('chai').expect;
const check = require('../src/check');

describe("Testing check js", () => {
    const req = {
        body: {
            name: 'Jane',
            string: 'string',
            alphaNum: 'asd22',
            bool: true,
            number: 5,
            float: 5.6,
            array: [1, 2],
            date: '2020/01/20',
            url: 'https://www.geeksforgeeks.org/',
            email: 'jane@example.com',
            password: '12345678',
            password_confirmation: '12345678',
            object: {
                inner: 'string'
            }
        }
    };

    const conf = {
        response: {},
        fields_alias: {},
        message_alias: {},
        lang: req.lang ?? 'en'
    }

    it("should return true if validation is passed", () => {
        expect(check(req, 'bool', 'boolean', conf)).to.equal(true);
    });

    it("should return true if validation is passed", () => {
        expect(check(req, 'string', 'string', conf)).to.equal(true);
    });

    it("should return true if validation is passed", () => {
        expect(check(req, 'date', 'before:2020/01/01', conf)).to.equal(true);
    });

    it("should return false if validation is not passed", () => {
        expect(check(req, 'string', 'number', conf)).to.equal(false);
        expect(conf.response).not.empty;
        expect(conf.response).has.key('string');
    });

    it("should return false if validation is not passed", () => {
        expect(check(req, 'number', 'min:20', conf)).to.equal(false);
        expect(conf.response).not.empty;
    });

    it("should return true if validation is passed", () => {
        expect(check(req, 'object.inner', 'string', conf)).to.equal(true);
    });
});