# Validate_L

validation package for express framework inspired from Laravel.
the main reason for it, is to simplify the way validation rules are written.


- [Writing The Validation Logic](#quick-writing-the-validation-logic)
- [Working With Error Messages](#working-with-error-messages)
- [Available Validation Rules](#available-validation-rules)
- [Validating Arrays](#validating-arrays)


<a name="quick-writing-the-validation-logic"></a>
## Writing The Validation Logic

validation logic can be written anywhere as long as `req` and `res` objects are provided with the `fields` object. 

    const {validate} = require('validte_l');
    
    async (req, res, next) => {
        let response = await validate(req, res, {
            name: ['required', 'string', 'max:255'],
            email: ['required', 'email'],
            birthdate: ['required', 'date']
        });
    }

> **Warning**  
> `req` should contain a "body" which should contain the request body.

<a name="working-with-error-messages"></a>
## Working With Error Messages

<a name="custom-messages-for-specific-attributes"></a>
#### Custom Messages For Specific Attributes

You may customize the error messages used for specified attribute and rule

    let fields = {
        name: ['required', 'string', 'max:255'],
        email: ['required', 'email'],
        birthdate: ['required', 'date']
    };

    let customMessages = {
        'name.required': ':item need to be existed in the request to register the person.'
    }

    let response = await validate(req, res, fields, customMessages);

now the message for the name will be changed if the name attribute in not found in the request body.

> :item will be replaced with field name, so the message will be "name need to be existed in the request to register the person".



<a name="available-validation-rules"></a>
## Available Validation Rules

[After (Date)](#rule-after)
[Alpha](#rule-alpha)
[Alpha Numeric](#rule-alpha-num)
[Array](#rule-array)
[Before (Date)](#rule-before)
[Boolean](#rule-boolean)
[Confirmed](#rule-confirmed)
[Date](#rule-date)
[Email](#rule-email)
[Ends With](#rule-ends-with)
[In](#rule-in)
[Max](#rule-max)
[Min](#rule-min)
[Not In](#rule-not-in)
[Nullable](#rule-nullable)
[Number](#rule-number)
[Regular Expression](#rule-regex)
[Required](#rule-required)
[Starts With](#rule-starts-with)
[URL](#rule-url)

<a name="rule-after"></a>
#### after:_date_

The field under validation must be a value after a given date. instance:

    'start_date': ['required', date', after:2022/01/01']

<a name="rule-alpha"></a>
#### alpha

The field under validation must be entirely Unicode alphabetic characters contained in [`\p{L}`](https://util.unicode.org/UnicodeJsps/list-unicodeset.jsp?a=%5B%3AL%3A%5D&g=&i=) and [`\p{M}`](https://util.unicode.org/UnicodeJsps/list-unicodeset.jsp?a=%5B%3AM%3A%5D&g=&i=).

    'username': ['alpha']

#### alpha_num

The field under validation must be entirely Unicode alpha-numeric characters contained in [`\p{L}`](https://util.unicode.org/UnicodeJsps/list-unicodeset.jsp?a=%5B%3AL%3A%5D&g=&i=), [`\p{M}`](https://util.unicode.org/UnicodeJsps/list-unicodeset.jsp?a=%5B%3AM%3A%5D&g=&i=), and [`\p{N}`](https://util.unicode.org/UnicodeJsps/list-unicodeset.jsp?a=%5B%3AN%3A%5D&g=&i=).

    'username': ['alpha_num']

<a name="rule-array"></a>
#### array

The field under validation must be a VALID `array`.

    'user': ['array']

<a name="rule-before"></a>
#### before:_date_

The field under validation must be a value preceding the given date.

    'birthdate': ['date', 'before:2000/01/01']

<a name="rule-boolean"></a>
#### boolean

The field under validation must be able to be cast as a boolean. Accepted input are `true`, `false`, `1`, `0`, `"1"`, and `"0"`.

    'accepted': ['boolean']

<a name="rule-confirmed"></a>
#### confirmed

The field under validation must have a matching field of `{field}_confirmation`. For example, if the field under validation is `password`, a matching `password_confirmation` field must be present in the input.

    'password': ['confirmed']

<a name="rule-date"></a>
#### date

The field under validation must be a valid Date

    'birthdate': ['date']

<a name="rule-email"></a>
#### email

The field under validation must be formatted as an email address.

    'email': ['email']

<a name="rule-ends-with"></a>
#### ends_with:_foo_,_bar_,...

The field under validation must end with one of the given values.

    'email': ['ends_with:.com,.net']

<a name="rule-in"></a>
#### in:_foo_,_bar_,...

The field under validation must be included in the given list of values.

    'user_type': ['in:admin,supervisor']

<a name="rule-max"></a>
#### max:_value_

The field under validation must be less than or equal to a maximum _value_. Strings, numerics and array.

    'username': ['required', 'string' 'max:20'] // username should not exeed 20 chars as length
    'age': ['required', 'numeric', 'max:20'] // age should not be grater than 20

<a name="rule-min"></a>
#### min:_value_

The field under validation must have a minimum _value_. Strings, numerics and arrays.

    'username': ['required', 'string' 'min:20'] // username should not be lss than 20 chars as length
    'age': ['required', 'numeric', 'min:20'] // age should not be less than 20

<a name="rule-not-in"></a>
#### not_in:_foo_,_bar_,...

The field under validation must not be included in the given list of values.

    'user_type': ['not_in:admin,supervisor']

<a name="rule-nullable"></a>
#### nullable

The field under validation may be `null` or not existed in the request body.

    'description': ['nullable']

<a name="rule-number"></a>
#### number

The field under validation must be a valid number.

    'age': ['required', 'number', 'min:20'] 

<a name="rule-regex"></a>
#### regex:_pattern_

The field under validation must match the given regular expression.

    'formula': ['required', 'regex:[1-9]'] 

<a name="rule-required"></a>
#### required

The field under validation must be present in the input data and not empty.

    'age': ['required']

<a name="rule-starts-with"></a>
#### starts_with:_foo_,_bar_,...

The field under validation must start with one of the given values.

    'url': ['strats_with:www,api']

<a name="rule-string"></a>
#### string

The field under validation must be a string.

    'username': ['required', 'string']

<a name="rule-url"></a>
#### url

The field under validation must be a valid URL.

    'url': ['url', strats_with:www,api']