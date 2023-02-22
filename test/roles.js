const expect = require('chai').expect;
const {required, string, number, boolean, date, array, url, min, max, notin, email, confirmed, alpha, alphanumeric,
    after, before
} = require('../src/validations');

describe("Testing with chai", () => {
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
            password_confirmation: '12345678'
        }
    };

    const conf = {
        response: {},
        fields_aliace: {},
        message_aliace: {},
        lang: req.lang ?? 'en'
    }

    it("should return true if item exists in request body", () => {
        expect(required(conf, req, 'name')).to.equal(true);
    });

    it("should return false if item not exists in request body", () => {
        expect(required(conf, req, 'age')).to.equal(false);
    });

    it('should return true if item is string', () => {
        expect(string(conf, req, 'string')).to.equal(true);
    });

    it('should return false if item is not string', () => {
        expect(string(conf, req, 'number')).to.equal(false);
    });

    it('should return true if item string contains only letters', () => {
        expect(alpha(conf, req, 'string')).to.equal(true);
    });

    it('should return false if item string contains numbers', () => {
        expect(alpha(conf, req, 'number')).to.equal(false);
    });

    it('should return true if item string contains letters numbers', () => {
        expect(alphanumeric(conf, req, 'alphaNum')).to.equal(true);
    });

    it('should return false if item string dose not contains letters numbers', () => {
        expect(alphanumeric(conf, req, 'string')).to.equal(false);
    });

    it('should return true if item is a valid email', () => {
        expect(email(conf, req, 'email')).to.equal(true);
    });

    it('should return false if item is not a valid email', () => {
        expect(email(conf, req, 'number')).to.equal(false);
    });

    it('should return true if item is number', () => {
        expect(number(conf, req, 'number')).to.equal(true);
    });

    it('should return true if item is number', () => {
        expect(number(conf, req, 'float')).to.equal(true);
    });

    it('should return false if item is not number', () => {
        expect(number(conf, req, 'string')).to.equal(false);
    });

    it('should return true if item is boolean', () => {
        expect(boolean(conf, req, 'bool')).to.equal(true);
    });

    it('should return false if item is not boolean', () => {
        expect(boolean(conf, req, 'string')).to.equal(false);
    });

    it('should return true if item is date', () => {
        expect(date(conf, req, 'date')).to.equal(true);
    });

    it('should return false if item is not date', () => {
        expect(date(conf, req, 'string')).to.equal(false);
    });

    it('should return true if item is date after other date', () => {
        expect(after(conf, req, 'date', '2020/02/20')).to.equal(true);
    });

    it('should return true if item is date not after other date', () => {
        expect(after(conf, req, 'date', '2020/01/01')).to.equal(false);
    });

    it('should return true if item is date before other date', () => {
        expect(before(conf, req, 'date', '2020/01/01')).to.equal(true);
    });

    it('should return true if item is date not before other date', () => {
        expect(before(conf, req, 'date', '2020/05/01')).to.equal(false);
    });

    it('should return true if item is array', () => {
        expect(array(conf, req, 'array')).to.equal(true);
    });

    it('should return false if item is not array', () => {
        expect(array(conf, req, 'string')).to.equal(false);
    });

    it('should return true if item is a valid url', () => {
        expect(url(conf, req, 'url')).to.equal(true);
    });

    it('should return false if item is not a valid url', () => {
        expect(url(conf, req, 'string')).to.equal(false);
    });

    it('should return true if item value is more than the minimum', () => {
        expect(min(conf, req, 'number', 3)).to.equal(true);
    });

    it('should return false if item value is less than the minimum', () => {
        expect(min(conf, req, 'number', 10)).to.equal(false);
    });

    it('should return true if item value is less than the maximum', () => {
        expect(max(conf, req, 'number', 10)).to.equal(true);
    });

    it('should return false if item value is more than the maximum', () => {
        expect(max(conf, req, 'number', 3)).to.equal(false);
    });

    it('should return true if item value is in not the list of values', () => {
        expect(notin(conf, req, 'name', ['Jon', 'Doe'])).to.equal(true);
    });

    it('should return false if item value is in the list of values', () => {
        expect(notin(conf, req, 'name', ['Jane', 'Doe'])).to.equal(false);
    });

    it('should return true if item value is confirmed', () => {
        expect(confirmed(conf, req, 'password')).to.equal(true);
    });

    it('should return false if item value is not confirmed', () => {
        expect(confirmed(conf, req, 'string')).to.equal(false);
    });
});