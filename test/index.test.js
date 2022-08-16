const assert = require('assert');

const IsniValidator = require('../index');

describe('ISNI validator', () => {
    it('Should return false if input is undefined', () => {
        const testValue = undefined;
        const result = IsniValidator.validate(testValue);
        assert.equal(result, false);
    });

    it('Should return false if input is null', () => {
        const testValue = null;
        const result = IsniValidator.validate(testValue);
        assert.equal(result, false);
    });

    it('Should return false if input is an empty string', () => {
        const testValue = '';
        const result = IsniValidator.validate(testValue);
        assert.equal(result, false);
    });

    it('Should return false if input is a string longer than 16 characters', () => {
        const testValue = '12345678901234567';
        const result = IsniValidator.validate(testValue);
        assert.equal(result, false);
    });

    it('Should return false if input is a number longer than 16 digits', () => {
        const testValue = 12345678901234567;
        const result = IsniValidator.validate(testValue);
        assert.equal(result, false);
    });

    it('Should return false if input is a string shorter than 16 characters', () => {
        const testValue = '123456789012345';
        const result = IsniValidator.validate(testValue);
        assert.equal(result, false);
    });

    it('Should return false if input is a number shorter than 16 digits', () => {
        const testValue = 123456789012345;
        const result = IsniValidator.validate(testValue);
        assert.equal(result, false);
    });

    it('Should return true for valid ISNI without dashes or whitespaces provided as string', () => {
        const testValue = '0000000121478925';
        const result = IsniValidator.validate(testValue);
        assert.equal(result, true);
    });

    it('Should return true for valid ISNI without dashes or whitespaces provided as a number', () => {
        const testValue = 1000000121478926;
        const result = IsniValidator.validate(testValue);
        assert.equal(result, true);
    });

    it('Should return true for valid ISNIs in various formats', () => {
        const validIsnis = [
            '0000000121478925',
            '0000 0001 2147 8925',
            '0000 000121478925',
            '0000-0001-2147-8925',
            '0000-0001 2147 8925',
            '1234 6834 9573 0495',
            1234683495730495,
            '0000-0002-1694-233X',
            '0000 0004 5169 943X'
        ];
        validIsnis.forEach((validIsni) => {
            const result = IsniValidator.validate(validIsni);
            assert.equal(result, true, `${validIsni} should be valid`);
        });
    });

    it('Should return false for invalid ISNIs in various formats', () => {
        const validIsnis = [
            '1234 6834 9573 0491',
            '1234-6834-9573-0491',
            '1234683495730491',
            '0000 0001 2103 2681',
            '0000 0001 1449 9591',
            1234683495730491
        ];
        validIsnis.forEach((validIsni) => {
            const result = IsniValidator.validate(validIsni);
            assert.equal(result, false, `${validIsni} should be invalid`);
        });
    });
});

describe('ISNI generator', () => {
    it('Should generate valid ISNI codes', () => {
        for (let i = 0; i < 100; i++) {
            const result = IsniValidator.generate();
            assert.equal(IsniValidator.validate(result), true, `${result} should be valid`);
        }
    });
});
