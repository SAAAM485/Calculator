function operate(numArr, opArr) {
    let answer = 0;
    if (opArr.length === 0 || numArr.length === 1) {
        answer = numArr[0];
    } else {
        answer = numArr[0];
        for (let num = 1; num < numArr.length; num++) {
            switch (opArr[num - 1]) {
                case "+":
                    answer = answer + numArr[num];
                    break;
                case "-":
                    answer = answer - numArr[num];
                    break;
                case "×":
                    answer = answer * numArr[num];
                    break;
                case "÷":
                    answer = (answer / numArr[num]).toFixed(6);
                    break;
            }
            
        }
    }
    numArr = [];
    opArr = [];
    return answer;
}

let numArr = [];
let opArr = [];
let tempNum = "";

const opPad = document.querySelector(".operator");
opPad.forEach(op => {
    op.addEventListener("click", () => {
        numArr.push(tempNum);
        tempNum = "";
        opArr.push(op.innerHTML);
    })
})

const numPad = document.querySelectorAll(".number");
numPad.forEach(num => {
    num.addEventListener("click", () => {
        tempNum = tempNum + nem.innerHTML;
    })
});

const dotPad = document.querySelector(".dot");
dotPad.addEventListener("click", () => {
    if (tempNum.indexOf(".") > -1) {
        return
    } else {
        tempNum = tempNum + ".";
    }
})

const equalPad = document.querySelector(".equal");
equalPad.addEventListener("click", () => {
    operate(numArr, opArr);
});

const clrPad = document.querySelector(".clear");
clrPad.addEventListener("click", () => {
    numArr = [];
    opArr = [];
})

const bsPad = document.querySelector(".backspace");
bsPad.addEventListener("click", () => {
    if (tempNum === "") {
        opArr.pop();
    } else {
        tempNum = tempNum(0, -1);
    }
})