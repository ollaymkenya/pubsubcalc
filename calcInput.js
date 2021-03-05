import { pubsub } from "./pubsub.js";
import { utils } from "./utils.js";

import { renderHandler } from "./renderhandler.js";

export const calcInput = {
    render: (component) => {
        let template = "calcInput";
        renderHandler(component, template);

        // subscribe to the buttonNumberClicked event
        pubsub.subscribe('buttonNumberClicked', calcInput.buttonNumberClicked, 'calcInput');
        console.log(`CALC-INPUT: I have just subscribed to the "buttonNumberClicked" event`);

        // subscribe to the buttonOperationClicked event
        pubsub.subscribe('buttonOperationClicked', calcInput.buttonOperationClicked, 'calcInput');
        console.log(`CALC-INPUT: I have just subscribed to the "buttonOperationClicked" event`);
    },

    buttonNumberClicked: data => {
        data = JSON.parse(data);
        console.log(`CALC-INPUT: I have just received the data: "${JSON.stringify(data)}" from the "buttonNumberClicked" event`);

        // change UI
        if (data.value) return calcInput.addToInput(".calculator-input", data.value);
        switch (data.numberOp) {
            case "backspace":
                calcInput.removeFromInput(".calculator-input");
                break;
            case "clear":
                calcInput.clearInput(".calculator-input");
                break;
            case "%":
                const shouldAddToInput = utils.operationValidator(data.numberOp);
                if (shouldAddToInput) return calcInput.addToInput('.calculator-input', data.numberOp);
                break;
            default:
                console.log("whatsss");
                break;
        }
    },

    buttonOperationClicked: data => {
        data = JSON.parse(data);
        console.log(`CALC-INPUT: I have just received the data: "${JSON.stringify(data)}" from the "buttonOperationClicked" event`);
        const shouldAddToInput = utils.operationValidator(data.numberOp);
        if(data.numberOp === "return") {
            console.log(`CALC-INPUT: I have just published to the event "returnData" with the data: ${true}`);
            pubsub.publish("returnData", true);
        }
        if (shouldAddToInput) return calcInput.addToInput('.calculator-input', data.numberOp);
    },

    addToInput: (inputTextSelector, data) => {
        document.querySelector(inputTextSelector).innerText += data
        let inputText = { value: document.querySelector(inputTextSelector).innerText };
        calcInput.publishCalcInputUpdated(inputText);
    },

    removeFromInput: (inputTextSelector) => {
        let textArray = document.querySelector(inputTextSelector).innerText.split("");
        textArray.pop();
        document.querySelector(inputTextSelector).innerText = textArray.join("");
        let inputText = { value: document.querySelector(inputTextSelector).innerText };
        calcInput.publishCalcInputUpdated(inputText);
    },

    clearInput: (inputTextSelector) => {
        document.querySelector(inputTextSelector).innerText = "";
        let inputText = { value: document.querySelector(inputTextSelector).innerText };
        calcInput.publishCalcInputUpdated(inputText);
    },

    publishCalcInputUpdated: (inputText) => {
        console.log(`CALC-INPUT: I have just published to the event "calcInputUpdated" with the data ${JSON.stringify(inputText)}`);
        pubsub.publish('calcInputUpdated', inputText);
    }
}
