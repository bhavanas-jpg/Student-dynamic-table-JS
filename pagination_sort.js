

function paginator(items, page, per_page) {
   
    var page = page || 1,
        per_page = per_page || 4,
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