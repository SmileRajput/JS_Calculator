let input = document.getElementsByName("calc_input");
let trigonometry = document.getElementById("trigonometry");
let functions = document.getElementById("function");
let degBtn = document.getElementById("deg");
let powerFlag = false;
let tempData;
let changeFlag = true;
let memData;
let memoryFlag = false;
let degFlag = true;

var btn = document.querySelectorAll("button");
btn.forEach((element) => {
    element.addEventListener("click", () => {
        element.style.border = "2px solid rgba(0, 157, 255, 0.831)";
        setTimeout(() => element.style.border = "none", 100)
        evalData(element);
    })
});

function calculatedata() {
    try {
        let string = input[0].value;
        string = eval(string);
        input[0].value = string;
    } catch (err) {
        console.log(err);
        input[0].value = ""
        input[0].placeholder = "ERROR";
        setTimeout(() => input[0].placeholder = "0", 1200);
    }
}

function powerF() {
    if (input[0].value == "") {
        input[0].placeholder = "ENTER ANY NUMBER";
        return;
    }
    else {
        tempData = input[0].value;
        input[0].placeholder = "ENTER SECOND NUMBER";
        input[0].value = "";
        powerFlag = true;
    }
}

function dataOperation(ele) {
    let eleId = ele.attributes.id.value;
    if (eleId == "square") {
        if (changeFlag) input[0].value = Math.pow(eval(input[0].value), 2);
        else input[0].value = Math.pow(eval(input[0].value), 3);
    }
    else if (eleId == "inverse") {
        input[0].value = Math.pow(eval(input[0].value),-1)
    }
    else if (eleId == "mod") {
        let temp = eval(input[0].value).toString().substring(0, 1);
        if (temp == '-' || temp == '+') {
            input[0].value = eval(input[0].value).toString().substring(1);
        }
    }
    else if (eleId == "exp") {
        input[0].value = Math.exp(eval(input[0].value));
    }
    else if (eleId == "squareRoot") {
        if (changeFlag) input[0].value = Math.sqrt(eval(input[0].value));
        else input[0].value = Math.cbrt(eval(input[0].value));
    }
    else if (eleId == "factorial") {
        input[0].value = getFactorial(eval(input[0].value));
    }
    else if (eleId == "power") {
        powerF();
    }
    else if (eleId == "10xp") {
        if (changeFlag) input[0].value = Math.pow(10, eval(input[0].value));
        else input[0].value = Math.pow(eval(input[0].value), 10)

    }
    else if (eleId == "log10") {
        if (changeFlag) input[0].value = Math.log10(eval(input[0].value));
        else input[0].value = Math.log2(eval(input[0].value));
    }
    else if (eleId == "ln") {
        input[0].value = Math.log(eval(input[0].value));
    }
    else if (eleId == "plus_minus") {
        let sign = input[0].value.substring(0, 1);
        if (sign == '+' || sign == '-') input[0].value = input[0].value.substring(1);
        else input[0].value = '-' + input[0].value;
    }
    else if (eleId == "e") {
        input[0].value += Math.E;
    }
}

function memoryOperation(ele) {
    let eleId = ele.attributes.id.value;
    if (eleId == "m+") {
        if (!memoryFlag) {
            memData = "";
            document.getElementById("mc").style.color = "Black";
            document.getElementById("mr").style.color = "Black";
            document.getElementById("ms").style.color = "Black";
            memoryFlag = true;
        }
        (memoryFlag) ? memData += eval(input[0].value) + "+" : NULL;
        input[0].value = "";
    }
    else if (eleId == "m-") {
        if (!memoryFlag) {
            memData = "";
            document.getElementById("mc").style.color = "Black";
            document.getElementById("mr").style.color = "Black";
            document.getElementById("ms").style.color = "Black";
            memoryFlag = true;
        }
        (memoryFlag) ? memData += eval(input[0].value) + "-" : NULL;
        input[0].value = "";
    }
    else if (eleId == "mr" && memoryFlag) {
        (input[0].value == "") ? memData = memData.substring(0, memData.length - 1) : memData += input[0].value;
        input[0].value = eval(memData);
    }
    else if (eleId == "mc" && memoryFlag) {
        memData = "";
        console.log("memory is cleared");
        document.getElementById("mc").style.color = "rgb(163, 163, 163)";
        document.getElementById("mr").style.color = "rgb(163, 163, 163)";
        document.getElementById("ms").style.color = "rgb(163, 163, 163)";
        memoryFlag = false;
    } else if (eleId == "ms" && memoryFlag) {
        memData = eval(memData);
        console.log(`Last calculation ${memData} stored successfully`);
    }
}

function changeDTR() {
    if (degFlag) {
        degBtn.innerHTML = "RAD";
        degFlag = false;
    } else {
        degBtn.innerHTML = "DEG";
        degFlag = true;
    }
}

function getFactorial(val) {
    let tempVal = 1;
    for (val; val >= 1; val--) {
        tempVal *= val;
    }
    return tempVal;
}

function evalData(ele) {
    let eleVal = ele.innerText;
    let eleId = ele.attributes.id.value;
    if (eleId == "2nd") return;
    if (eleId == "clear") {
        input[0].placeholder = "0";
        input[0].value = "";
    }
    else if (eleId == "equal") {
        if (powerFlag) {
            input[0].value = Math.pow(tempData, input[0].value);
            powerFlag = false;
            input[0].placeholder = "0";
            return;
        }
        if (input[0].value == "") return;
        calculatedata();
    }
    else if (eleId == "backspace") {
        let str = input[0].value;
        str = str.substring(0, str.length - 1);
        input[0].value = str;
    }
    else if (ele.attributes.class != undefined) {
        if (ele.attributes.class.value == "memory_function") memoryOperation(ele);
        else if (eleId == "deg") changeDTR();
        else dataOperation(ele);
    }
    else {
        if (eleVal == "mod") input[0].value += "%";
        else if (eleVal == "π") input[0].value += Math.PI;
        else if (eleId == "multiply") input[0].value += "*";
        else if (eleId == "devide") input[0].value += "/";
        else if (eleId == "minus") input[0].value += "-";
        else {
            input[0].value += eleVal
        }
    }
}

function calculateDeg(value) {
    let deg = (Math.PI / 180) * value;
    return deg;
}

trigonometry.addEventListener("change", (event) => {
    let trigoVal = event.target.value;
    if (input[0].value == "") {
        trigonometry.selectedIndex = 0;
        input[0].placeholder = "Enter Any Number"
        setTimeout(() => input[0].placeholder = "0", 1000);
        return;
    }
    if (degFlag) {
        if (trigoVal == "sin") input[0].value = Math.sin(calculateDeg(eval(input[0].value)));
        else if (trigoVal == "cos") input[0].value = Math.cos(calculateDeg(eval(input[0].value)));
        else if (trigoVal == "tan") input[0].value = Math.tan(calculateDeg(eval(input[0].value)));
    }
    else {
        if (trigoVal == "sin") input[0].value = Math.sin(eval(input[0].value));
        else if (trigoVal == "cos") input[0].value = Math.cos(eval(input[0].value));
        else if (trigoVal == "tan") input[0].value = Math.tan(eval(input[0].value));
    }
    trigonometry.selectedIndex = 0;
})

functions.addEventListener("change", (event) => {
    let functionVal = event.target.value;
    if (functionVal == "random") input[0].value = Math.random(eval(input[0].value));
    else if (functionVal == "floor") input[0].value = Math.floor(eval(input[0].value));
    else if (functionVal == "ceil") input[0].value = Math.ceil(eval(input[0].value));
    functions.selectedIndex = 0;
})

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        calculatedata();
    }
    else if (e.key === "Backspace") {
        let str = input[0].value
        input[0].value = str.substring(0, str.length - 1)
    }
});


const changeOp = () => {
    if (changeFlag) {
        document.getElementById("square").innerHTML = "x<sup>3</sup>";
        document.getElementById("squareRoot").innerHTML = "<sup>3</sup>√x";
        document.getElementById("10xp").innerHTML = "x<sup>10</sup>";
        document.getElementById("log10").innerHTML = "log<sub>2</sub>";
        changeFlag = false;
    }
    else {
        document.getElementById("square").innerHTML = "x<sup>2</sup>";
        document.getElementById("squareRoot").innerHTML = "<sup>2</sup>√x";
        document.getElementById("10xp").innerHTML = "10<sup>x</sup>";
        document.getElementById("log10").innerHTML = "log<sub>10</sub>";
        changeFlag = true;
    }
}