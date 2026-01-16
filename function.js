function add() {
            let num1 = Number (document.getElementById('num1').value);
            let num2 = Number (document.getElementById('num2').value);
            let sum = num1 + num2;
            document.getElementById('Sum').innerText = "Result: " + sum;
}
function subtract() {
            let num1 = Number (document.getElementById('num1').value);
            let num2 = Number (document.getElementById('num2').value);
            let difference = num1 - num2;
            document.getElementById('Difference').innerText = "Result: " + difference;
}   
function product() {
            let num1 = Number (document.getElementById('num1').value);
            let num2 = Number (document.getElementById('num2').value);
            let product = num1 * num2;
            document.getElementById('Multiplication').innerText = "Result: " + product;
}
function quotient() {
            let num1 = Number (document.getElementById('num1').value);
            let num2 = Number (document.getElementById('num2').value);
            let quotient = num1 / num2;
            document.getElementById('Quotient').innerText = "Result: " + quotient;
}