let xField = document.forms["my_form"]["X"];
let yField = document.forms["my_form"]["Y"];
let rField = document.forms["my_form"]["R"];
let offsetField = document.forms["my_form"]["offset"];

let warn_x = document.getElementsByClassName("warn-checkbox")[0];
let warn_y_nan = document.getElementsByClassName("warn-checkbox")[1];
let warn_y_int = document.getElementsByClassName("warn-checkbox")[2];
let warn_r_nan = document.getElementsByClassName("warn-checkbox")[3];
let warn_r_int = document.getElementsByClassName("warn-checkbox")[4];

let submitButton = document.getElementsByClassName("submit-button")[0];
let clearButton = document.getElementsByClassName("submit-button")[1];
let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext('2d');

let xChecked = false;
let yChecked = false;
let rChecked = false;
let i = canvas.width / 10 - 2;

submitButton.addEventListener("click", check);
clearButton.addEventListener("click", clear);
xField.addEventListener("click", checkX);
yField.addEventListener("keyup", checkY);
rField.addEventListener("keyup", rOnClick);
canvas.addEventListener("click", handleCanvasClick);

blockButton();
offsetField.value = new Date().getTimezoneOffset();
drawAxis();

if (rField.value !== "" || rField.value !== null) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    drawArea(Number(rField.value));
    drawAxis();
    drawPointsFromTable();
}

function rOnClick(event) {
    checkR(event);
    if (rChecked) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        drawArea(Number(rField.value));
        drawAxis();
    }
    drawPointsFromTable();
}

function blockButton() {
    if (!(xChecked && yChecked && rChecked)) {
        submitButton.setAttribute("disabled", "disable");
    } else {
        submitButton.removeAttribute("disabled")
    }
}

function clear() {
    xField.value = "";
    yField.value = "";
    rField.value = "";

    xField.classList.remove("warn-text");
    yField.classList.remove("warn-text");
    rField.classList.remove("warn-text");
    submitButton.setAttribute("disabled", "disable");

    xChecked = false;
    yChecked = false;
    rChecked = false;

    warn_x.hidden = true;
    warn_y_nan.hidden = true;
    warn_y_int.hidden = true;
    warn_r_nan.hidden = true;
    warn_r_int.hidden = true;

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    drawAxis();
}

function checkY(event) {
    yField.value = yField.value.replace(",", ".");
    if (!isFinite(Number(yField.value)) || !(/0*/).test(yField.value) && Number(yField.value) === 0 || (/^ *$/).test(yField.value)) {
        event.preventDefault();
        yField.classList.add("warn-text");
        yChecked = false;
        warn_y_nan.hidden = false;
        warn_y_int.hidden = true;
    } else if (Number(yField.value) < -3 || Number(yField.value) > 5) {
        event.preventDefault();
        yField.classList.add("warn-text");
        yChecked = false;
        warn_y_int.hidden = false;
        warn_y_nan.hidden = true;
    } else {
        yField.classList.remove("warn-text");
        yChecked = true;
        warn_y_nan.hidden = true;
        warn_y_int.hidden = true;
    }
    blockButton();
}

function checkR(event) {
    rField.value = rField.value.replace(",", ".");
    if (!isFinite(Number(rField.value)) || !(/0*/).test(rField.value) && Number(rField.value) === 0 || (/^ *$/).test(rField.value)) {
        event.preventDefault();
        rField.classList.add("warn-text");
        rChecked = false;
        warn_r_nan.hidden = false;
        warn_r_int.hidden = true;
    } else if (Number(rField.value) < 2 || Number(rField.value) > 5) {
        event.preventDefault();
        rField.classList.add("warn-text");
        rChecked = false;
        warn_r_int.hidden = false;
        warn_r_nan.hidden = true;
    } else {
        rField.classList.remove("warn-text");
        rChecked = true;
        warn_r_nan.hidden = true;
        warn_r_int.hidden = true;
    }
    blockButton();
}

function checkX(event) {
    if (!(xField.value === "-4" || xField.value === "-3" || xField.value === "-2" || xField.value === "-1" || xField.value === "0" || xField.value === "1" || xField.value === "2" || xField.value === "3" || xField.value === "4")) {
        xChecked = false;
        warn_x.hidden = false;
        event.preventDefault();
    } else {
        xChecked = true;
        warn_x.hidden = true;
    }
    blockButton();
}

function check(event) {
    checkR(event);
    checkY(event);
    checkX(event);
    event.preventDefault();
    doAjax(xField.value, yField.value, rField.value, true)
}

function handleCanvasClick(event) {
    checkR(event);
    if (rChecked) {
        let obj = event.target;
        let x = Number(((event.pageX - window.pageXOffset - obj.getBoundingClientRect().x - obj.width / 2) / i).toFixed(2));
        let y = Number((-(event.pageY - window.pageYOffset - obj.getBoundingClientRect().y - obj.height / 2) / i).toFixed(2));
        if (x >= -4 && x <= 4 && y >= -3 && y <= 5) {
            doAjax(x, y, rField.value, true)
        }
    }
}