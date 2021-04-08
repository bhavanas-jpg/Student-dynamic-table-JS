//selected form elements by id
let fname = document.getElementById("fname"),
    lname = document.getElementById("lname"),
    degree = document.getElementById("degree"),
    subDegree = document.getElementById("sub-degree"),
    DOB = document.getElementById("dob"),
    email = document.getElementById("email"),
    mobile = document.getElementById("mobile"),

    isFnameValid,
    isLnameValid,
    isDegreeValid,
    isSubDegreeValid,
    isDobValid,
    isEmailValid,
    isMobileValid,
    studentArray = [];
var selectedRow = null;
var count = 0; // used for generating student ID


function onFormSubmit() {

    var formData = readFormData();

    if (selectedRow !== null) { // update values in table   
        updateRecord(getRowData());
    } else {
        storeValue(formData); //data will be stored in local storage

        if (studentArray.length > 4) {
            let pageData = paginator(studentArray);
            let div = document.getElementById("pagination");
            let list = document.getElementById("paginationList");
            list.remove();
            let ul = document.createElement('ul');
            ul.setAttribute('id', 'paginationList')
            div.appendChild(ul);
            for (i = 1; i <= pageData.total_pages; i++) {
                let li = document.createElement('LI');
                li.innerHTML = `<a href="#" onclick=getPageData(studentArray,${i}) >${i}</a>`;
                ul.appendChild(li);
            }
        } else {
            insertNewRecord(formData);
        }
    }
    resetForm(); //reset form for new value insertion
}

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

//read data from input while updating
function getRowData() {
    var formData = {
        Id: studentID.value,
        firstName: fname.value,
        lastName: lname.value,
        Degree: degree.value,
        SubDegree: subDegree.value,
        DOB: DOB.value,
        email: email.value,
        mobile: mobile.value
    }
    console.log(formData);
    return formData;
}

// generate serial id for student ID
function rand() {
    return (count = count + 1);
}

// inserting values to table
function insertNewRecord(data) {

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
    tr.setAttribute('id', data.Id)
}


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

    var mi = document.createElement('div');
    mi.setAttribute('id', 'student');
    mi.innerHTML = `<label> Student ID </label>`;
    let input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', 'studentID');
    input.setAttribute('value', selectedRow.cells[0].innerHTML);
    mi.appendChild(input);

    let form = document.getElementById('formControl');
    form.insertBefore(mi, first);

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

    let parent = document.getElementById("studentList");
    let tr = document.getElementById(formData.Id);
    while (tr.firstChild) {
        tr.removeChild(tr.lastChild);
    }
 
    for (const item in formData) {
        let td = document.createElement('TD');
        td.appendChild(document.createTextNode(formData[item]));
        tr.appendChild(td);
    }
    let TD = document.createElement('TD');
    TD.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                    <a onClick ="onDelete(this)">Delete</a>`;
    tr.appendChild(TD);

    let div = document.getElementById('student').remove();
    let index = studentArray.findIndex(x => x.Id == formData.Id);   //check index of the student by check studentID
    studentArray[index] = formData;
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
    localStorage.getItem("allStudents");
}

