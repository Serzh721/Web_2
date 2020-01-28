function drawAxis() {
    let h = canvas.height;
    let w = canvas.width;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2, h);
    ctx.lineTo(w / 2, 0);
    ctx.lineTo(w / 2 + 3, 7);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 - 3, 7);
    drawDigitsX(ctx, i, w, h);

    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.lineTo(w - 7, h / 2 + 3);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 7, h / 2 - 3);
    drawDigitsY(ctx, i, w, h);
    ctx.stroke();
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;

    ctx.moveTo(w / 2 - 4 * i, h / 2 - 5 * i);
    ctx.lineTo(w / 2 + 4 * i, h / 2 - 5 * i);
    ctx.lineTo(w / 2 + 4 * i, h / 2 + 3 * i);
    ctx.lineTo(w / 2 - 4 * i, h / 2 + 3 * i);
    ctx.lineTo(w / 2 - 4 * i, h / 2 - 5 * i);
    ctx.stroke();
    drawTextX(ctx, i, w, h);
    drawTextY(ctx, i, w, h);
}

function drawDigitsX(ctx, i, w, h) {
    let t = w / 2;
    for (let j = 0; j < 5; j++) {
        t += i;
        ctx.moveTo(t, h / 2 + 3);
        ctx.lineTo(t, h / 2 - 3)
    }
    t = w / 2;
    for (let j = 0; j < 5; j++) {
        t -= i;
        ctx.moveTo(t, h / 2 + 3);
        ctx.lineTo(t, h / 2 - 3)
    }
}

function drawTextX(ctx, i, w, h) {
    ctx.font = "9px Verdana";
    ctx.strokeStyle = "black";
    let t = w / 2;
    let r = parseFloat(document.getElementById("R").value);
    t += i;
    for (let j = 1; j < 6; j++) {
        ctx.strokeText((j).toString(), t, h / 2 + 10);
        t += i;
    }
    t = w / 2;
    for (let j = 0; j < 6; j++) {
        ctx.strokeText((-j).toString(), t, h / 2 + 10);
        t -= i;
    }
}

function drawTextY(ctx, i, w, h) {
    ctx.font = "9px Verdana";
    ctx.strokeStyle = "black";
    let t = h / 2;
    let r = parseFloat(document.getElementById("R").value);
    t += i;
    for (let j = 1; j < 6; j++) {
        ctx.strokeText((-j).toString(), w / 2, t + 10);
        t += i;
    }
    t = h / 2;
    for (let j = 0; j < 6; j++) {
        ctx.strokeText((j).toString(), w / 2, t + 10);
        t -= i;
    }
}

function drawDigitsY(ctx, i, w, h) {
    let t = h / 2;
    for (let j = 0; j < 5; j++) {
        t += i;
        ctx.moveTo(w / 2 + 3, t);
        ctx.lineTo(w / 2 - 3, t);
    }
    t = h / 2;
    for (let j = 0; j < 5; j++) {
        t -= i;
        ctx.moveTo(w / 2 + 3, t);
        ctx.lineTo(w / 2 - 3, t);
    }
}

function drawArea(r) {
    let h = canvas.height;
    let w = canvas.width;
    ctx.strokeStyle = "#24502D";
    ctx.fillStyle = "#24502D";
    ctx.beginPath();
    ctx.moveTo(w / 2, h / 2);
    ctx.arc(w / 2, h / 2, r * i, 0, Math.PI / 2, false);
    ctx.moveTo(w / 2, h / 2);
    ctx.lineTo(w / 2 - r * i, h / 2);
    ctx.lineTo(w / 2 - r * i, h / 2 - r / 2 * i);
    ctx.lineTo(w / 2, h / 2 - r / 2 * i);
    ctx.lineTo(w / 2, h / 2 - r * i);
    ctx.lineTo(w / 2 + r * i, h / 2);
    ctx.fill();
}

function drawPoint(x, y, color) {
    ctx.fillStyle = (color === "Yes" ? "#008000" : "#FF0000");
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + x * i, canvas.height / 2 - y * i, 2, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawPointsFromTable() {
    let table = document.getElementById("result-table");
    if (document.getElementsByTagName("tbody")[0]) {
        table = document.getElementsByTagName("tbody")[0]
    }
    if (table) {
        for (let i = 0; i < table.children.length; i++) {
            let row = table.children[i];
            if (row.id !== "table-headers" && Number(row.children[2].innerText) !== Number(rField.value)) {
                doAjax(row.children[0].innerText, row.children[1].innerText, rField.value, false)
            } else if (row.id !== "table-headers") {
                drawPoint(Number(row.children[0].innerText), Number(row.children[1].innerText), (row.children[3].innerText));
            }
        }
    }
}
