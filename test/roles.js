const expect = require('chai').expect;
const {required, string, number, boolean, date, array, url, min, max, notin, email, confirmed, alpha, alphanumeric,
    after, before, start_with, end_with, regx
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

    it("should return true if item exists in request body", () => {
        expect(required('name')).to.equal(true);
    });

    it("should return false if item not exists in request body", () => {
        expect(required('')).to.equal(false);
    });

    it('should return true if item is string', () => {
        expect(string('string')).to.equal(true);
    });

    it('should return false if item is not string', () => {
        expect(string(855)).to.equal(false);
    });

    it('should return true if item string contains only letters', () => {
        expect(alpha('string')).to.equal(true);
    });

    it('should return false if item string contains numbers', () => {
        expect(alpha('88')).to.equal(false);
    });

    it('should return true if item string contains letters numbers', () => {
        expect(alphanumeric('string808')).to.equal(true);
    });

    it('should return false if item string dose not contains letters numbers', () => {
        expect(alphanumeric('alpha')).to.equal(false);
    });

    it('should return true if item is a valid email', () => {
        expect(email('email@e.com')).to.equal(true);
    });

    it('should return false if item is not a valid email', () => {
        expect(email('number')).to.equal(false);
    });

    it('should return true if item is number', () => {
        expect(number(800)).to.equal(true);
    });

    it('should return true if item is number', () => {
        expect(number(3.2)).to.equal(true);
    });

    it('should return false if item is not number', () => {
        expect(number('string')).to.equal(false);
    });

    it('should return true if item is boolean', () => {
        expect(boolean(false)).to.equal(true);
    });

    it('should return false if item is not boolean', () => {
        expect(boolean('string')).to.equal(false);
    });

    it('should return true if item is date', () => {
        expect(date('2020/01/20')).to.equal(true);
    });

    it('should return false if item is not date', () => {
        expect(date('string')).to.equal(false);
    });

    it('should return true if item is date after other date', () => {
        expect(after('2020/01/20', '2020/02/20')).to.equal(true);
    });

    it('should return true if item is date not after other date', () => {
        expect(after('2020/01/20', '2020/01/01')).to.equal(false);
    });

    it('should return true if item is date before other date', () => {
        expect(before('2020/01/20', '2020/01/01')).to.equal(true);
    });

    it('should return true if item is date not before other date', () => {
        expect(before('2020/01/20', '2020/05/01')).to.equal(false);
    });

    it('should return true if item is array', () => {
        expect(array(['1', '2'])).to.equal(true);
    });

    it('should return false if item is not array', () => {
        expect(array('string')).to.equal(false);
    });

    it('should return true if item is a valid url', () => {
        expect(url('https://www.google.com')).to.equal(true);
    });

    it('should return false if item is not a valid url', () => {
        expect(url('string')).to.equal(false);
    });

    it('should return true if item value is more than the minimum', () => {
        expect(min(5, 3)).to.equal(true);
    });

    it('should return false if item value is less than the minimum', () => {
        expect(min(5, 10)).to.equal(false);
    });

    it('should return true if item value is less than the maximum', () => {
        expect(max(5, 10)).to.equal(true);
    });

    it('should return false if item value is more than the maximum', () => {
        expect(max(5, 3)).to.equal(false);
    });

    it('should return true if item value is in not the list of values', () => {
        expect(notin('Jane', ['Jon', 'Doe'])).to.equal(true);
    });

    it('should return false if item value is in the list of values', () => {
        expect(notin('Jane', ['Jane', 'Doe'])).to.equal(false);
    });

    // it('should return true if item value is confirmed', () => {
    //     expect(confirmed('password')).to.equal(true);
    // });
    //
    // it('should return false if item value is not confirmed', () => {
    //     expect(confirmed('string')).to.equal(false);
    // });

    it('should return true if item value is start with the specified', () => {
        expect(start_with('string', 'st')).to.equal(true);
    });

    it('should return false if item value is not start with the specified', () => {
        expect(start_with('string', 'tn')).to.equal(false);
    });

    it('should return true if item value is end with the specified', () => {
        expect(end_with('string', 'ng')).to.equal(true);
    });

    it('should return false if item value is not end with the specified', () => {
        expect(end_with('string', 'tn')).to.equal(false);
    });

    it('should return true if item value matched the pattern', () => {
        expect(regx('string', '[a-z]')).to.equal(true);
    });

    it('should return false if item value didn\'t match the pattern', () => {
        expect(regx('string', '[A-Z]')).to.equal(false);
    });
});