const expect = require('chai').expect;
const {required, string, number, boolean, date, array, url, min, max, email, confirmed, alpha,
    after, before, not_in, starts_with, ends_with, regex, alpha_num, required_if, required_unless, required_with,
    required_with_all, required_without, required_without_all, missing, missing_if, missing_unless
} = require('../src/validations');

const body = {
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
};

describe("Testing required rule", () => {
    it("should return true if item exists in request body", () => {
        expect(required('name')).to.equal(true);
    });

    it("should return false if item not exists in request body", () => {
        expect(required('')).to.equal(false);
    });
});

describe("Testing string rule", () => {
    it('should return true if item is string.', () => {
        expect(string('string')).to.equal(true);
    });

    it('should return false if item is not string.', () => {
        expect(string(855)).to.equal(false);
    });
});

describe("Testing alpha rule", () => {
    it('should return true if item string contains only letters.', () => {
        expect(alpha('string')).to.equal(true);
    });

    it('should return false if item string contains numbers.', () => {
        expect(alpha('88')).to.equal(false);
    });
});

describe("Testing alpha num rule", () => {
    it('should return true if item string contains letters numbers.', () => {
        expect(alpha_num('string808')).to.equal(true);
    });

    it('should return false if item string dose not contains letters numbers.', () => {
        expect(alpha_num('alpha')).to.equal(false);
    });
});

describe("Testing email rule", () => {
    it('should return true if item is a valid email.', () => {
        expect(email('email@e.com')).to.equal(true);
    });

    it('should return false if item is not a valid email.', () => {
        expect(email('number')).to.equal(false);
    });
});

describe("Testing number rule", () => {
    it('should return true if item is number.', () => {
        expect(number(800)).to.equal(true);
    });

    it('should return true if item is number.', () => {
        expect(number(3.2)).to.equal(true);
    });

    it('should return false if item is not number.', () => {
        expect(number('string')).to.equal(false);
    });
});

describe("Testing boolean rule", () => {
    it('should return true if item is boolean.', () => {
        expect(boolean(false)).to.equal(true);
    });

    it('should return false if item is not boolean.', () => {
        expect(boolean('string')).to.equal(false);
    });
});

describe("Testing date rule", () => {
    it('should return true if item is date.', () => {
        expect(date('2020/01/20')).to.equal(true);
    });

    it('should return false if item is not date.', () => {
        expect(date('string')).to.equal(false);
    });
});

describe("Testing after rule", () => {
    it('should return true if item is date after other date.', () => {
        expect(after('2020/01/20', '2020/02/20')).to.equal(true);
    });

    it('should return true if item is date not after other date.', () => {
        expect(after('2020/01/20', '2020/01/01')).to.equal(false);
    });
});

describe("Testing before rule", () => {
    it('should return true if item is date before other date.', () => {
        expect(before('2020/01/20', '2020/01/01')).to.equal(true);
    });

    it('should return true if item is date not before other date.', () => {
        expect(before('2020/01/20', '2020/05/01')).to.equal(false);
    });
});

describe("Testing array rule", () => {
    it('should return true if item is array.', () => {
        expect(array(['1', '2'])).to.equal(true);
    });

    it('should return false if item is not array.', () => {
        expect(array('string')).to.equal(false);
    });
});

describe("Testing url rule", () => {
    it('should return true if item is a valid url.', () => {
        expect(url('https://www.google.com')).to.equal(true);
    });

    it('should return false if item is not a valid url.', () => {
        expect(url('string')).to.equal(false);
    });
});

describe("Testing min rule", () => {
    it('should return true if item value is more than the minimum.', () => {
        expect(min(5, 3)).to.equal(true);
    });

    it('should return false if item value is less than the minimum.', () => {
        expect(min(5, 10)).to.equal(false);
    });
});

describe("Testing max rule", () => {
    it('should return true if item value is less than the maximum.', () => {
        expect(max(5, 10)).to.equal(true);
    });

    it('should return false if item value is more than the maximum.', () => {
        expect(max(5, 3)).to.equal(false);
    });
});

describe("Testing not_in rule", () => {
    it('should return true if item value is in not the list of values.', () => {
        expect(not_in('Jane', ['Jon', 'Doe'])).to.equal(true);
    });

    it('should return false if item value is in the list of values.', () => {
        expect(not_in('Jane', ['Jane', 'Doe'])).to.equal(false);
    });
});

describe("Testing starts_with rule", () => {
    it('should return true if item value is start with the specified.', () => {
        expect(starts_with('string', 'st')).to.equal(true);
    });

    it('should return false if item value is not start with the specified.', () => {
        expect(starts_with('string', 'tn')).to.equal(false);
    });
});

describe("Testing ends_with rule", () => {
    it('should return true if item value is end with the specified.', () => {
        expect(ends_with('string', 'ng')).to.equal(true);
    });

    it('should return false if item value is not end with the specified.', () => {
        expect(ends_with('string', 'tn')).to.equal(false);
    });
});

describe("Testing regx rule", () => {
    it('should return true if item value matched the pattern.', () => {
        expect(regex('string', '[a-z]')).to.equal(true);
    });

    it('should return false if item value didn\'t match the pattern.', () => {
        expect(regex('string', '[A-Z]')).to.equal(false);
    });
});

describe("Testing required_if rule", () => {
    it('should return true if the item is exist and the requirement condition is met .', () => {
        expect(required_if('any', {name: 'ahmed'}, 'name,ahmed')).to.equal(true);
    });

    it('should return true if the item is exist and the requirement condition is met .', () => {
        expect(required_if('any', {name: 'ahmed'}, 'name')).to.equal(true);
    });

    it('should return false if the item is not exist and the requirement condition is met .', () => {
        expect(required_if('', {name: 'ahmed'}, 'name,ahmed')).to.equal(false);
    });

    it('should return break if the item is not exist and the requirement condition is not met .', () => {
        expect(required_if('', {name: 'ahmed'}, 'name,mohamed')).to.equal('break');
    });
});

describe("Testing required_unless rule", () => {
    it('should return true if the item is exist and the requirement condition is met .', () => {
        expect(required_unless('any', {name: 'mohamed'}, 'name,ahmed')).to.equal(true);
    });

    it('should return break if the item is exist and the requirement condition is met .', () => {
        expect(required_unless('', {name: 'ahmed'}, 'name')).to.equal('break');
    });

    it('should return break if the item is not exist and the requirement condition is met .', () => {
        expect(required_unless('', {name: 'ahmed'}, 'name,ahmed')).to.equal('break');
    });

    it('should return false if the item is not exist and the requirement condition is not met .', () => {
        expect(required_unless('', {name: 'ahmed'}, 'name,mohamed')).to.equal(false);
    });
});

describe("Testing required_with rule", () => {
    it('should return true if one or more of the fields in the request body .', () => {
        expect(required_with('any', {name: 'ahmed', age: 30}, 'name')).to.equal(true);
    });

    it('should return break if all of fields are not in the request body .', () => {
        expect(required_with('', {name: 'ahmed', age: 30}, 'birthdate')).to.equal('break');
    });

    it('should return break if the all of the fields are empty.', () => {
        expect(required_with('', {name: 'ahmed', age: ''}, 'age')).to.equal('break');
    });

    it('should return false if the fields are in the request body .', () => {
        expect(required_with('', {name: 'ahmed', age: 30}, 'age')).to.equal(false);
    });
});

describe("Testing required_with_all rule", () => {
    it('should return true if all of the fields in the request body .', () => {
        expect(required_with_all('any', {name: 'ahmed', age: 30}, 'name,age')).to.equal(true);
    });

    it('should return break if any of the specified fields are not in the request body .', () => {
        expect(required_with_all('', {name: 'ahmed', age: 30}, 'name,birthdate')).to.equal('break');
    });

    it('should return false if the fields are in the request body .', () => {
        expect(required_with_all('', {name: 'ahmed', age: 30}, 'name,age')).to.equal(false);
    });
});

describe("Testing required_without rule", () => {
    it('should return true if one or more of the fields are not in the request body .', () => {
        expect(required_without('any', {name: 'ahmed', age: 30}, 'birthdate')).to.equal(true);
    });

    it('should return break if one of the fields are not in the request body .', () => {
        expect(required_without('', {name: 'ahmed', age: 30}, 'birthdate')).to.equal('break');
    });

    it('should return break if the one of the fields are empty.', () => {
        expect(required_without('', {name: 'ahmed', age: ''}, 'age')).to.equal('break');
    });

    it('should return false if one of the fields are in the request body .', () => {
        expect(required_without('', {name: 'ahmed', age: 30}, 'age')).to.equal(false);
    });
});

describe("Testing required_without_all rule", () => {
    it('should return true if item is exists.', () => {
        expect(required_without_all('any', {name: 'ahmed', age: 30}, 'birthdate')).to.equal(true);
    });

    it('should return break if all of the fields are not in the request body .', () => {
        expect(required_without_all('', {name: 'ahmed', age: 30}, 'birthdate')).to.equal(false);
    });

    it('should return break if the one of the fields is not empty.', () => {
        expect(required_without_all('', {name: 'ahmed', age: ''}, 'name,age')).to.equal('break');
    });

    it('should return false if one of the fields are in the request body .', () => {
        expect(required_without_all('', {name: 'ahmed', age: ''}, 'birthdate,age')).to.equal(false);
    });
});

describe("Testing missing rule", () => {
    it('should return true if item is missing in.', () => {
        expect(missing(body['foo'])).to.equal(true);
    });

    it('should return false if item is existed in the request body .', () => {
        expect(missing(body['string'])).to.equal(false);
    });
});

describe("Testing missing_if rule", () => {
    it('should return break if item is missing in.', () => {
        expect(missing_if(body['foo'], {name: 'ahmed', age: ''}, 'birthdate,age')).to.equal('break');
    });

    it('should return false if item is exited in request body and the condition is met.', () => {
        expect(missing_if(body['string'], {name: 'ahmed', age: ''}, 'name,ahmed')).to.equal(false);
    });

    it('should return true if item is existed in request body but the condition did not met.', () => {
        expect(missing_if(body['string'], {name: 'ahmed', age: ''}, 'name,mohamed')).to.equal(true);
    });
});

describe("Testing missing_unless rule", () => {
    it('should return break if item is missing in.', () => {
        expect(missing_unless(body['foo'], {name: 'ahmed', age: ''}, 'birthdate,age')).to.equal('break');
    });

    it('should return false if item is exited in request body and the condition is met.', () => {
        expect(missing_unless(body['string'], {name: 'ahmed', age: ''}, 'name,mohamed')).to.equal(false);
    });

    it('should return false if item is existed in request body but the condition did not met.', () => {
        expect(missing_unless(body['string'], {name: 'ahmed', age: ''}, 'name,mohamed')).to.equal(false);
    });
});
