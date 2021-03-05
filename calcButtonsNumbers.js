import { pubsub } from "./pubsub.js";

import { renderHandler } from "./renderhandler.js";

export const calcButtonsNumbers = {
    render: (component) => {
        let template = "calculatorButtonsNumbers";
        renderHandler(component, template);

        //add Event listener
        let buttons = document.querySelectorAll(".calculator-buttons__numbers .calculator-button");
        buttons.forEach(button => button.addEventListener("click", calcButtonsNumbers.clicked));
    },

    clicked: ev => {
        const value = ev.target.dataset.value;
        const ops = ev.target.dataset.ops;
        let data = value ? {type: "number", value: value} : {type: "ops", numberOp: ops}
        
        console.log(`BUTTON-NUMBER: I have just published to the event "buttonNumberClicked", with the data: "${JSON.stringify(data)}"`);
        pubsub.publish('buttonNumberClicked', JSON.stringify(data));
    }
}