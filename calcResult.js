import { pubsub } from "./pubsub.js";
import { renderHandler } from "./renderhandler.js";

export const calcResult = {
    render: (component) => {
        let template = "calcResult";
        renderHandler(component, template);

        // subscribe to the event returnCurrentValue
        pubsub.subscribe("returnCurrentValue", calcResult.showResult, "calcResult");

        // subscribe to the event returnData
        pubsub.subscribe("returnData", calcResult.changeStyle, "calcResult");
    },

    showResult: (data) => {
        console.log(`CALC-RESULT: I have just received the data ${JSON.stringify(data)} from the calculator using the event "returnCurrentValue"`);
        let resultText = document.querySelector(".calculator-result");
        resultText.innerText = data.value;
        resultText.style.color = "#0000005b";
    },

    changeStyle: (data) => {
        console.log(`CALC-RESULT: Acting on the return key pressed due to the event "returnData"`);
        let resultText = document.querySelector(".calculator-result");
        resultText.style.color = "#000000";
    }
}