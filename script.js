function operate(numArr, opArr) {
    let answer = 0;
    if (opArr.length === 0 || numArr.length === 1) {
        answer = numArr[0];
    } else if (numArr.length ===  0) {
        answer = 0;
    } else {
        answer = numArr[0];
        for (let num = 1; num < numArr.length; num++) {
            switch (opArr[num - 1]) {
                case "+":
                    answer = Number(answer) + Number(numArr[num]);
                    break;
                case "-":
                    answer = answer - numArr[num];
                    break;
                case "×":
                    answer = answer * numArr[num];
                    break;
                case "÷":
                    answer = Number((answer / numArr[num]).toFixed(10));
                    break;
            }
            
        }
    }
    return answer;
}

const firstLine = document.querySelector(".firstLine");
const secondLine = document.querySelector(".secondLine");
const thirdLine = document.querySelector(".thirdLine");
const currentLine = document.querySelector(".currentLine");

let numArr = [];
let opArr = [];
let tempNum = "";
let tempOp = "";
let displayLine = "";
currentLine.innerHTML = "0";
let newCal = true;
let answer;

const opPad = document.querySelectorAll(".operator");
opPad.forEach(op => {
    op.addEventListener("click", () => {
        if (newCal === false) {
            firstLine.innerHTML = secondLine.innerHTML;
            secondLine.innerHTML = thirdLine.innerHTML;
            thirdLine.innerHTML = currentLine.innerHTML;
            displayLine = tempNum;
            currentLine.innerHTML = displayLine;
            newCal = true;
        }

        if (tempNum !== "" && tempOp === "") {
            numArr.push(tempNum);
            tempNum = "";
            tempOp = op.innerHTML;
            displayLine = displayLine + " " + tempOp + " ";
            currentLine.innerHTML = displayLine;
        } else if (tempNum === "" && tempOp !== "") {
            tempOp = op.innerHTML;
            displayLine = displayLine.slice(0, -3) + " " + tempOp + " ";
            currentLine.innerHTML = displayLine;
        }
    })
})

const numPad = document.querySelectorAll(".number");
numPad.forEach(num => {
    num.addEventListener("click", () => {
        if (newCal === false) {
            firstLine.innerHTML = secondLine.innerHTML;
            secondLine.innerHTML = thirdLine.innerHTML;
            thirdLine.innerHTML = currentLine.innerHTML;
            tempNum = "";
            console.log(tempNum);
            displayLine = tempNum;
            currentLine.innerHTML = displayLine;
            newCal = true;
        }

        if (displayLine === "0" && (tempNum.indexOf("0") === 0 && tempNum.indexOf(".") === -1 )) {
            return;
        }
        
        if (tempOp === "") {
            tempNum = tempNum + num.innerHTML;
            displayLine = displayLine + num.innerHTML;
            currentLine.innerHTML = displayLine;
        } else if (tempOp !== "") {
            opArr.push(tempOp);
            tempOp = "";
            tempNum = tempNum + num.innerHTML;
            displayLine = displayLine + num.innerHTML;
            currentLine.innerHTML = displayLine;
        }
    })
});

const dotPad = document.querySelector(".dot");
dotPad.addEventListener("click", () => {
    if (tempNum.indexOf(".") > -1 || tempOp !== "") {
        return;
    } else if (displayLine === "") {
        tempNum = "0.";
        displayLine = tempNum;
        currentLine.innerHTML = displayLine;
    } else {
        tempNum = tempNum + ".";
        displayLine = displayLine + ".";
        currentLine.innerHTML = displayLine;
    }
})

const equalPad = document.querySelector(".equal");
equalPad.addEventListener("click", () => {
    if (currentLine.innerHTML !== "0") {
        numArr.push(tempNum);
        tempNum = operate(numArr, opArr);
        numArr = [];
        opArr = [];
        tempOp = "";
        newCal = false;
        displayLine = "= " + tempNum;
        firstLine.innerHTML = secondLine.innerHTML;
        secondLine.innerHTML = thirdLine.innerHTML;
        thirdLine.innerHTML = currentLine.innerHTML;
        currentLine.innerHTML = displayLine;
    }
});

const clrPad = document.querySelector(".clear");
clrPad.addEventListener("click", () => {
    firstLine.innerHTML = "";
    secondLine.innerHTML = "";
    thirdLine.innerHTML = "";
    currentLine.innerHTML = "0";
    numArr = [];
    opArr = [];
    tempNum = "";
    tempOp = "";
    displayLine = "";
    newCal = true;
})

const bsPad = document.querySelector(".delete");
bsPad.addEventListener("click", () => {
    if (newCal === false) {
        return;
    }
 
    if (tempNum === "" && tempOp !== "") {
        tempOp = "";
        displayLine = displayLine.slice(0, -3);
        currentLine.innerHTML = displayLine;
        return;
    } else if (tempNum !== "" && tempOp === "") {
        tempNum = tempNum.slice(0, -1);
        displayLine = displayLine.slice(0, -1);
        currentLine.innerHTML = displayLine;
        if (displayLine === "") {
            currentLine.innerHTML = "0";
        }
        return;
    } else if (tempNum === "" && tempOp === ""){
        if (numArr[numArr.length - 1] === undefined) {
            currentLine.innerHTML = "0";
            return;
        } else if (opArr[opArr.length - 1] !== undefined){
            opArr.pop();
            displayLine = displayLine.slice(0, -3);
            currentLine.innerHTML = displayLine;
            return;
        } else {
            tempNum = numArr[numArr.length - 1];
            numArr.pop();
            tempNum = tempNum.slice(0, -1);
            displayLine = displayLine.slice(0, -1);
            console.log(displayLine);
            currentLine.innerHTML = displayLine;
            return;
        }
    }
})

document.addEventListener("keypress", (event) => {
    console.log(event.key);
    if (event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/") {
            if (newCal === false) {
                firstLine.innerHTML = secondLine.innerHTML;
                secondLine.innerHTML = thirdLine.innerHTML;
                thirdLine.innerHTML = currentLine.innerHTML;
                displayLine = tempNum;
                currentLine.innerHTML = displayLine;
                newCal = true;
            }

            let key;

            switch (event.key) {
                case "+":
                    key = "+";
                    break;
                case "-":
                    key = "-";
                    break;
                case "*":
                    key = "×";
                    break;
                case "/":
                    key = "÷";
                    break;
            }

            if (tempNum !== "" && tempOp === "") {
                numArr.push(tempNum);
                tempNum = "";
                tempOp = key;
                displayLine = displayLine + " " + tempOp + " ";
                currentLine.innerHTML = displayLine;
            } else if (tempNum === "" && tempOp !== "") {
                tempOp = key;
                displayLine = displayLine.slice(0, -3) + " " + tempOp + " ";
                currentLine.innerHTML = displayLine;
            }
    } else if (parseInt(event.key) >= 0 && parseInt(event.key) <= 9) {
        if (newCal === false) {
            firstLine.innerHTML = secondLine.innerHTML;
            secondLine.innerHTML = thirdLine.innerHTML;
            thirdLine.innerHTML = currentLine.innerHTML;
            tempNum = "";
            console.log(tempNum);
            displayLine = tempNum;
            currentLine.innerHTML = displayLine;
            newCal = true;
        }

        if (displayLine === "0" && (tempNum.indexOf("0") === 0 && tempNum.indexOf(".") === -1 )) {
            return;
        }
        
        if (tempOp === "") {
            tempNum = tempNum + event.key;
            displayLine = displayLine + event.key;
            currentLine.innerHTML = displayLine;
        } else if (tempOp !== "") {
            opArr.push(tempOp);
            tempOp = "";
            tempNum = tempNum + event.key;
            displayLine = displayLine + event.key;
            currentLine.innerHTML = displayLine;
        }
    } else if (event.key ===".") {
        if (tempNum.indexOf(".") > -1 || tempOp !== "") {
            return;
        } else if (displayLine === "") {
            tempNum = "0.";
            displayLine = tempNum;
            currentLine.innerHTML = displayLine;
        } else {
            tempNum = tempNum + ".";
            displayLine = displayLine + ".";
            currentLine.innerHTML = displayLine;
        }
    } else if (event.key === "=" || event.key === "Enter") {
        if (currentLine.innerHTML !== "0") {
            numArr.push(tempNum);
            tempNum = operate(numArr, opArr);
            numArr = [];
            opArr = [];
            tempOp = "";
            newCal = false;
            displayLine = "= " + tempNum;
            firstLine.innerHTML = secondLine.innerHTML;
            secondLine.innerHTML = thirdLine.innerHTML;
            thirdLine.innerHTML = currentLine.innerHTML;
            currentLine.innerHTML = displayLine;
        }
    } else if (event.key === "Delete") {
        if (newCal === false) {
            return;
        }
    
        if (tempNum === "" && tempOp !== "") {
            tempOp = "";
            displayLine = displayLine.slice(0, -3);
            currentLine.innerHTML = displayLine;
            return;
        } else if (tempNum !== "" && tempOp === "") {
            tempNum = tempNum.slice(0, -1);
            displayLine = displayLine.slice(0, -1);
            currentLine.innerHTML = displayLine;
            if (displayLine === "") {
                currentLine.innerHTML = "0";
            }
            return;
        } else if (tempNum === "" && tempOp === ""){
            if (numArr[numArr.length - 1] === undefined) {
                currentLine.innerHTML = "0";
                return;
            } else if (opArr[opArr.length - 1] !== undefined){
                opArr.pop();
                displayLine = displayLine.slice(0, -3);
                currentLine.innerHTML = displayLine;
                return;
            } else {
                tempNum = numArr[numArr.length - 1];
                numArr.pop();
                tempNum = tempNum.slice(0, -1);
                displayLine = displayLine.slice(0, -1);
                console.log(displayLine);
                currentLine.innerHTML = displayLine;
                return;
            }
        }
    }
})