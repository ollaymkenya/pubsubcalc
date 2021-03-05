const resultComponent = document.getElementById("calculator-result__component");
const calcButtonsComponent = document.getElementById("calculator-buttons__component");

import { calcInput } from "./calcInput.js";
import { calculator } from "./calculator.js";
import { calcResult } from "./calcResult.js";
import { calcButtonsNumbers } from "./calcButtonsNumbers.js";
import { calcButtonsOperators } from "./calcButtonsOperators.js";

document.addEventListener("DOMContentLoaded", () => {
    // adding the calculator Input to the resultComponent
    calcInput.render(resultComponent);

    // running the calculator
    calculator.run();

    // adding the calculator Result to the resultComponent
    calcResult.render(resultComponent);

    // adding the calculator Buttons to the calButtons component
    calcButtonsNumbers.render(calcButtonsComponent);

    // adding the calculator Buttons to the calButtons component
    calcButtonsOperators.render(calcButtonsComponent);
})