import { pubsub } from "./pubsub.js";

export const calculator = {
    run: () => {
        pubsub.subscribe("calcInputUpdated", calculator.runOperations, "calculator");
    },

    operators: ["÷", "×", "%", "−", "+"],
    result: [],

    runOperations: (obj) => {
        let value = obj.value;
        let lastValue = obj.value.charAt(value.length - 1);
        let lastValueIsOperator = calculator.operators.includes(lastValue);
        lastValueIsOperator ? calculator.showValue(null) : calculator.containsOperators(value);
    },

    groupNumerals: (value) => {
        let arr = [];
        let str = "";
        for (let i = 0; i < value.length; i++) {
            if (!calculator.operators.includes(value.charAt(i))) {
                str += value.charAt(i);
            } else {
                if (Boolean(str)) {
                    arr.push(JSON.parse(str));
                    str = "";
                }
                arr.push(value.charAt(i));
            }
        }
        if (Boolean(str)) {
            arr.push(JSON.parse(str));
            str = "";
        }
        return arr;
    },

    containsOperators: (value) => {
        let contains = false;
        let j = 0;
        while (!contains && j < value.length) {
            if (calculator.operators.includes(value.charAt(j))) contains = true;
            j++;
        }
        if (contains === true) return calculator.perfomDivision(value, "÷");
        return calculator.showValue(value);
    },

    perfomDivision: (value, operator) => {
        let includesValue = value.split("").includes(operator);
        if (!includesValue) return calculator.perfomMultiplication(value, "×");
        let arrOfText = calculator.groupNumerals(value);
        console.log({ arrOfText });
        let includes = arrOfText.findIndex(item => item === "÷");
        arrOfText[includes - 1] = arrOfText[includes - 1] / arrOfText[includes + 1];
        arrOfText.splice(includes, 2);
        let result = arrOfText.join("");
        calculator.perfomDivision(result, "÷");
    },

    perfomMultiplication: (value, operator) => {
        let includesValue = value.split("").includes(operator);
        if (!includesValue) return calculator.perfomAddition(value, "+");
        let arrOfText = calculator.groupNumerals(value);
        let includes = arrOfText.findIndex(item => item === "×");
        arrOfText[includes - 1] = arrOfText[includes - 1] * arrOfText[includes + 1];
        arrOfText.splice(includes, 2);
        let result = arrOfText.join("");
        calculator.perfomMultiplication(result, "×");
    },

    perfomAddition: (value, operator) => {
        let includesValue = value.split("").includes(operator);
        if (!includesValue) return calculator.perfomSubtraction(value, "−");
        let arrOfText = calculator.groupNumerals(value);
        let includes = arrOfText.findIndex(item => item === "+");
        arrOfText[includes - 1] = JSON.stringify(JSON.parse(arrOfText[includes - 1]) + JSON.parse(arrOfText[includes + 1]));
        arrOfText.splice(includes, 2);
        let result = arrOfText.join("");
        calculator.perfomAddition(result, "+");
    },

    perfomSubtraction: (value, operator) => {
        console.log(value);
        let includesValue = value.split("").includes(operator);
        if (!includesValue) return calculator.perfomModulo(value, "%");
        let arrOfText = calculator.groupNumerals(value);
        let includes = arrOfText.findIndex(item => item === "−");
        arrOfText[includes - 1] = JSON.stringify(JSON.parse(arrOfText[includes - 1]) - JSON.parse(arrOfText[includes + 1]));
        arrOfText.splice(includes, 2);
        let result = arrOfText.join("");
        calculator.perfomSubtraction(result, "−");
    },

    perfomModulo: (value, operator) => {
        let includesValue = value.split("").includes(operator);
        if (!includesValue) return calculator.showValue(value);
        let arrOfText = calculator.groupNumerals(value);
        let includes = arrOfText.findIndex(item => item === "%");
        arrOfText[includes - 1] = JSON.stringify(JSON.parse(arrOfText[includes - 1]) % JSON.parse(arrOfText[includes + 1]));
        arrOfText.splice(includes, 2);
        let result = arrOfText.join("");
        calculator.perfomModulo(result, "%");
    },

    showValue: (value) => {
        console.log(`CALCULATOR: I have published to the event "returnCurrentValue" with the data, ${JSON.stringify({value})}`);
        value === null ? pubsub.publish("returnCurrentValue", {value: ""}) : pubsub.publish("returnCurrentValue", {value});
    }
}