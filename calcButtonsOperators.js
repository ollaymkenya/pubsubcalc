import { pubsub } from "./pubsub.js";
import { renderHandler } from "./renderhandler.js";

export const calcButtonsOperators = {
    render: (component) => {
        let template = "calculatorButtonsOperators";
        renderHandler(component, template);

        // add event listener
        let buttons = document.querySelectorAll(".calculator-buttons__operators .calculator-button");
        buttons.forEach(button => button.addEventListener("click", calcButtonsOperators.clicked));
    },

    clicked: ev => {
        const ops = ev.target.dataset.ops;
        let data = {type: "ops", numberOp: ops};
        
        console.log(`BUTTON-OPERATION: I have just published to the event "buttonOperationClicked", with the data: "${JSON.stringify(data)}"`);
        pubsub.publish('buttonOperationClicked', JSON.stringify(data));
    }
}