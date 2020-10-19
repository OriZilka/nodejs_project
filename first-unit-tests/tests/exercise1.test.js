
const exercise1 = require('../exercise1');

describe('fizzBuzz', () => {
    it('should throw an exeption if input not a number', () => {
        const args = ['1', null, undefined, {}, false, true];
        args.forEach(a => {
            expect(() => { exercise1.fizzBuzz(a) }).toThrow();
        });
    });

    it('should return FizzBuzz if input divisable by 3 and 5', () => {
        const result = exercise1.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if input is only divisable by 3', () => {
        const result = exercise1.fizzBuzz(12);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if input is only divisable by 5', () => {
        const result = exercise1.fizzBuzz(10);
        expect(result).toBe('Buzz');
    });

    it('should return input if input is not divisable by 3 or 5', () => {
        const result = exercise1.fizzBuzz(2);
        expect(result).toBe(2);
    });
})