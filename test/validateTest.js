const expect = require('chai').expect;
const {validate} = require('../index');

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
            },
            list: [
                {
                    name: 'name',
                    age: 10,
                }
            ]
        }
    };

    it("should return empty object if validation is passed", async () => {
        expect(await validate(req, {}, {
            'name': ['required', 'string', 'min:3'],
            'object.inner': ['required', 'string', 'min:3'],
            'list.*.name': ['required', 'string', 'min:3'],
        })).to.be.empty;
    });

    it("should return object with validation messages", async () => {
        expect(await validate(req, {}, {
            'name': ['required', 'string', 'min:10'],
            'fullName': ['required'],
            'object.inner': ['required', 'string', 'min:3'],
            'list.*.name': ['required', 'string', 'min:3'],
        })).to.have.keys(['name', 'fullName']);
    });

    it("should return empty object if nullable rule is used", async () => {
        expect(await validate(req, {}, {
            'fullName': ['nullable', 'string'],
        })).to.be.empty;
    });

});