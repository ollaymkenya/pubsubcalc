export const utils = {
    operationValidator: (operator) => {
        let input = document.querySelector(".calculator-input").innerText.trim();
        let prevValue = input.charAt(input.length - 1);
        let checkPrevInputIsNumber = prevValue / 0 === Infinity;
        let runOperation = utils.operationAllowed(operator, prevValue, checkPrevInputIsNumber);
        if (!runOperation) return false;
        return true;
    },

    operationAllowed: (operator, prevValue, prevIsNumber) => {
        let arr = ["÷", "×", "%", "−", "+"];
        let arr2 = ["÷", "×", "%"];
        if (arr.includes(operator) && prevIsNumber) {
            return true
        } else if ((operator === "−" || operator === "+") && (arr2.includes(prevValue) || prevValue === "")) {
            return true;
        } else {
            return false;
        }
    }
}