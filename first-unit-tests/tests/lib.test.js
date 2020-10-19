const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');


describe('absolute', () => {
    it('should return a positive num if input positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return a positive num if input negitive', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return zero if inputis zero', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
})

describe('greet', () => {
    it('should return a greeting message', () => {
        const result = lib.greet('Ori');
        // expect(result).toMatch(/Ori/);
        expect(result).toContain('Ori');
    });
})

describe('getCurrencies', () => {
    it('should return a supported currencies', () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
})

describe('getProduct', () => {
    it('should return with the given id', () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({ id: 1, price: 10 }); // Too specific.
        expect(result).toMatchObject({ id: 1, price: 10 });
        expect(result).toHaveProperty('id', 1);
    })
})

describe('registerUser', () => {
    it('should throw if username is falsy ', () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow();
        });   
    });

    it('should return a userObject if valid username is past', () => {
        const result = lib.registerUser('Ori');
        expect(result).toMatchObject({ username: 'Ori'});
        expect(result.id).toBeGreaterThan(0);
    });
})

// Using mock functions
describe('applyDiscount', () => {
    it('should apply 10% disscount if customer has more than 10 points', () => {
        console.log('Fake reading customer...');
        db.getCustomerSync = function(customerId) {
            return { id: customerId, points: 20 }
        }        
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    })
})

// Using mock functions
describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'arbitrary mail' });
        mail.send = jest.fn();
        
        console.log('Fake email sent...');
        // db.getCustomerSync = function(customerId) {
        //     return { id: customerId, email: 'arbitrary mail' }
        // }
        
        // let mailSent = false;
        // mail.send = function(email, message) {
        //     mailSent = true;
        // }

        const order = { customerId: 1 };
        lib.notifyCustomer(order);
        // expect(mailSent).toBe(true);
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('arbitrary mail');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);

    })
})