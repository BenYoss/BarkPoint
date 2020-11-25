const { expect } = require('chai');


describe('first-test', () => {
    it ('should register this', () => {
        expect("hello world").to.be.a('string');
    })
})