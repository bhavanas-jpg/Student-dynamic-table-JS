//selected form elements by id
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let degree = document.getElementById("degree");
let subDegree = document.getElementById("sub-degree");
let DOB = document.getElementById("dob");
let email = document.getElementById("email");
let mobile = document.getElementById("mobile");

let isFnameValid;
let isLnameValid;
let isDegreeValid;
let isSubDegreeValid;
let isDobValid;
let isEmailValid;
let isMobileValid;

let studentArray = [];

var selectedRow = null;
var count = 0; // used for generating student ID

function onFormSubmit() {
    var formData = readFormData();

    storeValue(formData); //data will be stored in local storage

    if (selectedRow == null) {
        insertNewRecord(formData); // insert values to table
    } else {
        updateRecord(formData); // update values in table 
    }

    resetForm(); // reset form for new value insertion
}


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
let regDob = /^[0-9]+\-[0-9]+\-[0-9]+$/;

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

// form-validation :ends //

// reading form values
function readFormData() {
    var formData = {
        Id: rand(),
        firstName: fname.value,
        lastName: lname.value,
        Degree: degree.value,
        SubDegree: subDegree.value,
        DOB: DOB.value,
        email: email.value,
        mobile: mobile.value
    }
    return formData;
}

// generate serial id for student ID
function rand() {
    return (count = count + 1);
}

// inserting values to table
function insertNewRecord(data, isPaginatorenabled) {

    let parent = document.getElementById("table");
    let tr = document.createElement('TR');
    parent.appendChild(tr);
    for (const item in data) {
        let td = document.createElement('TD');
        td.appendChild(document.createTextNode(data[item]));
        tr.appendChild(td);
    }
    let TD = document.createElement('TD');
    TD.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                    <a onClick ="onDelete(this)">Delete</a>`;
    tr.appendChild(TD);

    // pagination part   
    if (studentArray.length % 2 === 0) {
        let pageData = paginator(studentArray);
        console.log(pageData);

        let list = document.getElementById("paginationList");
        for (i = 1; i <= pageData.total_pages; i++) {
            let li = document.createElement('LI');
            li.innerHTML = `<a href="#" onclick=getPageData(studentArray,${i}) >${i}</a>`;
            list.appendChild(li);
        }
    }

}

function paginator(items, page, per_page) {

    var page = page || 1,
        per_page = per_page || 2,
        offset = (page - 1) * per_page,

        paginatedItems = items.slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);

    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}

let getPageData = (data, pageNumber) => {
    let pageData = paginator(data, pageNumber);
    let table = document.getElementById('studentList')

    let parent = document.getElementById("table");
    parent.remove();
    parent = document.createElement('tbody');
    parent.setAttribute('id', 'table')
    table.appendChild(parent);
    pageData.data.forEach((student) => {
        insertNewRecord(student)
    });

}

//studentID other way of inserting values
// cell0 = row.insertCell(0).innerHTML = data.Id;
// cell1 = row.insertCell(1).innerHTML = data.firstName;
// cell2 = row.insertCell(2).innerHTML = data.lastName;
// cell3 = row.insertCell(3).innerHTML = data.Degree;
// cell4 = row.insertCell(4).innerHTML = data.SubDegree;
// cell5 = row.insertCell(5).innerHTML = data.DOB;
// cell6 = row.insertCell(6).innerHTML = data.email;
// cell7 = row.insertCell(7).innerHTML = data.mobile;
// cell8 = row.insertCell(8).innerHTML = `<a onClick="onEdit(this)">Edit</a>
// <a onClick ="onDelete(this)">Delete</a>`;


//reset form values : start //

function resetForm() {
    fname.value = "";
    fname.classList.remove("success");
    isFnameValid = false;

    lname.value = "";
    lname.classList.remove("success");
    isLnameValid = false;

    degree.value = "";
    degree.classList.remove("success");
    isDegreeValid = false;

    subDegree.value = "";
    subDegree.classList.remove("success");
    isSubDegreeValid = false;

    DOB.value = "";
    DOB.classList.remove("success");
    isDobValid = false;

    email.value = "";
    email.classList.remove("success");
    isEmailValid = false;

    mobile.value = "";
    mobile.classList.remove("success");
    isMobileValid = false;

    let subBtn = document.getElementById("sub-btn");
    subBtn.disabled = true;

    selectedRow = null;
}

//reset form values : end //

// editing the table values: start//
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    fname.value = selectedRow.cells[1].innerHTML;
    lname.value = selectedRow.cells[2].innerHTML;
    degree.value = selectedRow.cells[3].innerHTML;
    subDegree.value = selectedRow.cells[4].innerHTML;
    DOB.value = selectedRow.cells[5].innerHTML;
    email.value = selectedRow.cells[6].innerHTML;
    mobile.value = selectedRow.cells[7].innerHTML;

    isFnameValid = true;
    isLnameValid = true;
    isDegreeValid = true;
    isSubDegreeValid = true;
    isDobValid = true;
    isEmailValid = true;
    isMobileValid = true;
}

// editing the table values: end//

//updating the edited values: start//
function updateRecord(formData) {
    selectedRow.cells[1].innerHTML = formData.firstName;
    selectedRow.cells[2].innerHTML = formData.lastName;
    selectedRow.cells[3].innerHTML = formData.Degree;
    selectedRow.cells[4].innerHTML = formData.SubDegree;
    selectedRow.cells[5].innerHTML = formData.DOB;
    selectedRow.cells[6].innerHTML = formData.email;
    selectedRow.cells[7].innerHTML = formData.mobile;
    let subBtn = document.getElementById("sub-btn");
    subBtn.disabled = false;
}
//updating the edited values: end//

//delete the values in table: start//
function onDelete(td) {
    if (confirm("Are you sure to delete this record?")) {
        row = td.parentElement.parentElement;
        document.getElementById("studentList").deleteRow(row.rowIndex);
        resetForm();
    }
}
//delete the values in table:end//

//set and get values in local Storage
function storeValue(student) {
    studentArray.push(student);
    localStorage.setItem("allStudents", JSON.stringify(studentArray));
    // console.log(localStorage.getItem("allStudents"));

}

// function for sorting table values: start//
function sortTable() {
    let parent = document.getElementById("table");

    while (parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild);
    }

    studentArray.sort(byName);
    studentArray.forEach((student) => {
        let tr = document.createElement('TR');
        parent.appendChild(tr);
        for (const item in student) {
            let td = document.createElement('TD');
            td.appendChild(document.createTextNode(student[item]));
            tr.appendChild(td);
        }
        let TD = document.createElement('TD');
        TD.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                            <a onClick ="onDelete(this)">Delete</a>`;
        tr.appendChild(TD);
    });
    console.log(JSON.stringify(studentArray));
}

function byName(a, b) {
    if (a.firstName > b.firstName) {
        return 1;
    } else if (b.firstName > a.firstName) {
        return -1;
    } else {
        return 0;
    }
}
// function for sorting table values: end//