
fname.addEventListener("keyup", function () {
    isFnameValid = checkFirstName(fname); // validating first name using regex
    checkInput();
});

lname.addEventListener("keyup", function () {
    isLnameValid = checkLastName(lname); //validating last name using regex
    checkInput();
});

degree.addEventListener("keyup", function () {
    isDegreeValid = checkDegree(degree); //validating degree using regex
    checkInput();
});

subDegree.addEventListener("keyup", function () {
    isSubDegreeValid = checkSubDegree(subDegree); //validating subdegree using regex
    checkInput();
});

DOB.addEventListener("keyup", function () {
    isDobValid = checkDob(DOB); // validating dob using regex
    checkInput();
});

email.addEventListener("keyup", function () {
    isEmailValid = checkEmail(email); //validating email using regex
    checkInput();
});

mobile.addEventListener("keyup", function () {
    isMobileValid = checkMobile(mobile); // validating mobile number using regex
    checkInput();
});


function checkInput() {

    let isFormValid = (isFnameValid && isLnameValid && isDegreeValid && isSubDegreeValid &&
        isDobValid && isEmailValid && isMobileValid);
    // if all form values are true , enable the submit button
    let subBtn = document.getElementById("sub-btn");
    if (isFormValid) {
        subBtn.disabled = false;
    }
    if (!isFormValid && subBtn.disabled == false) {
        subBtn.disabled = true;
    }
}


function setErrorFor(input, message) {
    message.innerText = `enter a vaild ${input.placeholder}`;
    input.classList.add("error");
}

function setSuccessFor(input, message) {
    input.classList.add("success");
    input.classList.remove("error");
    message.innerText = "";
}
// form validation: start //
let regExp = /^[a-zA-Z]{2,10}$/;
let regExp1 = /^[a-zA-Z ]{2,10}$/;
let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let regMobile = /^[0-9]{10}$/;
let regDob =/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((18|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((18|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/ ;


function checkFirstName(fname) {
    message = document.getElementById("fmsg");
    if (!fname.value) {
        setErrorFor(fname, message);
        return false;
    } else if (regExp.test(fname.value)) {
        setSuccessFor(fname, message);
        return true;
    } else {
        setErrorFor(fname, message);
        return false;
    }
}

function checkDob(DOB) {
    message = document.getElementById("dobMsg");
    if (!DOB.value) {
        setErrorFor(DOB, message);
        return false;
    } else if (regDob.test(DOB.value)) {
        setSuccessFor(DOB, message);
        return true;
    } else {
        setErrorFor(DOB, message);
        return false;
    }
}

function checkLastName(lname) {
    message = document.getElementById("lmsg");
    if (!lname.value) {
        setErrorFor(lname, message);
        return false;
    } else if (regExp.test(lname.value)) {
        setSuccessFor(lname, message);
        return true;
    } else {
        setErrorFor(lname, message);
        return false;
    }
}

function checkDegree(degree) {
    message = document.getElementById("dmsg");
    if (!degree.value) {
        setErrorFor(degree, message);
        return false;
    } else if (regExp1.test(degree.value)) {
        setSuccessFor(degree, message);
        return true;
    } else {
        setErrorFor(degree, message);
        return false;
    }
}

function checkSubDegree(subDegree) {
    message = document.getElementById("sdmsg");
    if (!subDegree.value) {
        setErrorFor(subDegree, message);
        return false;
    } else if (regExp1.test(subDegree.value)) {
        setSuccessFor(subDegree, message);
        return true;
    } else {
        setErrorFor(subDegree, message);
        return false;
    }
}

function checkEmail(email) {
    message = document.getElementById("emsg");
    if (!email.value) {
        setErrorFor(email, message);
        return false;
    } else if (regEmail.test(email.value)) {
        setSuccessFor(email, message);
        return true;
    } else {
        setErrorFor(email, message);
        return false;
    }
}

function checkMobile(mobile) {
    message = document.getElementById("mmsg");
    if (!mobile.value) {
        setErrorFor(mobile, message);
        return false;
    } else if (regMobile.test(mobile.value)) {
        setSuccessFor(mobile, message);
        return true;
    } else {
        setErrorFor(mobile, message);
        return false;
    }
}