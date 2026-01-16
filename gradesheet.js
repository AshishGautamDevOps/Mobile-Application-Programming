function checkGrade() {
    let totalGrade = (
        Number(document.getElementById("grade1").value) +
        Number(document.getElementById("grade2").value) +
        Number(document.getElementById("grade3").value) +
        Number(document.getElementById("grade4").value) +
        Number(document.getElementById("grade5").value) +
        Number(document.getElementById("grade6").value) +
        Number(document.getElementById("grade7").value) +
        Number(document.getElementById("grade8").value)
    )

    document.getElementById("totalGrade").innerHTML = "Total Grade: " + totalGrade;
    
    if(totalGrade >= 700){
        document.getElementById("result").innerHTML = "Distinction";
        document.getElementById("result").style.color = "green";
    }
    else if (totalGrade >= 600){
        document.getElementById("result").innerHTML = "First Class";
    }
    else if (totalGrade >= 500){
        document.getElementById("result").innerHTML = "Second Class";
    }
    else if (totalGrade >= 400){
        document.getElementById("result").innerHTML = "Third Class";
    }
    else {
        document.getElementById("result").innerHTML = "Fail";
        document.getElementById("result").style.color = "red";
    }
}