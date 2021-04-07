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

    if (selectedRow !== null) {
        updateRecord(getRowData()); // update values in table   
    }

    if (studentArray.length > 2) {
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
        if (selectedRow == null) {
            insertNewRecord(formData); // insert values to table
        }
    }

    resetForm(); // reset form for new value insertion
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





function paginator(items, page, per_page) {

    var page = page || 1,
        per_page = per_page || 2,
        offset = (page - 1) * per_page,

        paginatedItems = items.slice(offset).slice(0, per_page)
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

    // for(let i =0; i < student.length; ++i)
    // {
    //     if(student[i] === formData.id)
    //     {

    //     }
    // }
    let parent = document.getElementById("studentList");
    let tr = document.getElementById(formData.Id);
    while (tr.firstChild) {
        tr.removeChild(tr.lastChild);
    }
    parent.appendChild(tr);

    let x = getIndex(studentArray);
    console.log(x);

    // console.log(tr);

    //check index of the student by check studentID
    function getIndex(studentArray) {
        return index = studentArray.findIndex(x => x.Id == formData.Id);
    }

    //get object by using the index
    for (i = 0; i < studentArray.length; ++i) {
        if (studentArray[i] == x) {
            let y = getValues(studentArray);
            console.log(y);
        }
    }

    function getValues(Students) {
        Students.forEach(function (Student) {
            return Student = formData.data;
            //   Student.firstName = formData.firstName;
            //   Student.lastName = formData.lastName;
            //   Student.Degree = formData.Degree;
            //   Student.SubDegree = formData.SubDegree;
            //   Student.DOB = formData.DOB;
            //   Student.email = formData.email;
            //   Student.mobile = formData.mobile;
        })
    }
    // update the object


    //place the updated object to index





    //     let row = document.createElement('tr');
    //     for (const item in formData) {

    //         let td = document.createElement('TD');
    //         td.appendChild(document.createTextNode(formData[item]));
    //         row.appendChild(td);
    //     }
    //     let TD = document.createElement('TD');
    //     TD.innerHTML = `<a onClick="onEdit(this)">Edit</a>
    //                     <a onClick ="onDelete(this)">Delete</a>`;
    //    row.appendChild(TD);
    //   parent.appendChild(row);

    // selectedRow.cells[1].innerHTML = formData.firstName;   
    // selectedRow.cells[2].innerHTML = formData.lastName;
    // selectedRow.cells[3].innerHTML =  formData.Degree;   
    // selectedRow.cells[4].innerHTML =  formData.SubDegree;
    // selectedRow.cells[5].innerHTML = formData.DOB; 
    // selectedRow.cells[6].innerHTML = formData.email;
    // selectedRow.cells[7].innerHTML = formData.mobile;

    // parent.appendChild(td);

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