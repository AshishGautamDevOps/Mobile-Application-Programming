function showSum() {
            var num1 = Number (document.getElementById('num1').value);
            var num2 = Number (document.getElementById('num2').value);
            var sum = num1 + num2;
            document.getElementById('result').textContent = "Sum: " + sum;
        }