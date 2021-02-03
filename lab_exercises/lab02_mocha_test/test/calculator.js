var calculator = require("../app/calculator");
var expect = require("chai").expect;

describe("Sample Test Cases For Calculator App", () => {
    describe("Addition of two numbers", () => {
        it("add 5 and 2 to get 7", () => {
            let test = calculator.add(5, 2);
            expect(test).to.equal(7);
        });

        it("add 5 and 2 to get 8", () => {
            let test = calculator.add(5, 2);
            expect(test).to.equal(8);
        });
    });

    describe("Subtraction of two numbers", () => {
        it("subtract 2 out of 5 to get 3", () => {
            let test = calculator.sub(5, 2);
            expect(test).to.equal(3);
        });

        it("subtract 2 out of 5 to get 5", () => {
            let test = calculator.sub(5, 2);
            expect(test).to.equal(5);
        });
    });

    describe("Multiplication of two numbers", () => {
        it("multiply 5 with 2 to get 10", () => {
            let test = calculator.mul(5, 2);
            expect(test).to.equal(10);
        });

        it("multiply 5 with 2 to get 12", () => {
            let test = calculator.mul(5, 2);
            expect(test).to.equal(12);
        });
    });

    describe("Division of two numbers", () => {
        it("divide 10 by 2 to get 5", () => {
            let test = calculator.div(10, 2);
            expect(test).to.equal(5);
        });

        it("divide 10 by 2 to get 2", () => {
            let test = calculator.div(10, 2);
            expect(test).to.equal(10);
        });
    });
});