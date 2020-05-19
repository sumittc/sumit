var flag, flag2;

function start() {
    var html = `<center>  
 <form>
  <input type="radio"  onclick="checkk1()" name="select" id="r1"/>Using Table
  <input type="radio" onclick="checkk2()" name="select" id="r2"/>Using Div
  </form>              
</center> 

<div id="start2">
<center>   
<form onsubmit="event.preventDefault(); onFormSubmit();" >                
    <input type="text" name="fullName" id="fullName" placeholder="First Name...">                                  
    <input type="text" name="empCode" id="empCode" placeholder="Last Name...">
    <input type="submit" value="Submit" >
</form>  

<div class="column" id="id">     

</div>
</center>

<div class="middle" >
   <button  onclick="genJSON()">Generate JSON >></button><br><br><br>
   <button  onclick="genUI()"> << Generate UI</button>
</div>

<div class="column" contenteditable="true" id="json">  
</div>

</div>`;
    addElement('body', 'div', 'start', html);

}


function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    if (flag != html) {
        var p = document.getElementById(parentId);
        var newElement = document.createElement(elementTag);
        newElement.setAttribute('id', elementId);
        newElement.innerHTML = html;
        if (html == flag2) { newElement.className = "rTable"; };
        p.appendChild(newElement);
    }
    flag = html;
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}


function checkk1() {
    document.getElementById("id").innerHTML = `
                  <table class="list" id="employeeList" >
                       <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Delete</th>
                       </tr>
                     </table>`;
    n = 1;
    dDelRows();

}

function checkk2() {
    document.getElementById("id").innerHTML = ` 
    <div class="rTable" id="Table">
      <div class="rTableRow" >
          <div class="rTableHead">First Name</div>
          <div class="rTableHead">Last Name</div>
          <div class="rTableHead">Delete</div>
      </div>
   </div>
`;
    n = 2;
    tDelRows();

}

function onFormSubmit() {
    if (n == 1) { onFormSubmit1(); }
    if (n == 2) { onFormSubmit2(); }
}

function genJSON() {
    if (n == 1) { genJSON1() }
    if (n == 2) { genJSON2() }
}

function genUI() {
    if (n == 1) { genUI1() }
    if (n == 2) { genUI2() }
}

//...........................................................................Using Table ............................................................................

function onFormSubmit1() {
    text = document.getElementById("fullName").value;
    text2 = document.getElementById("empCode").value;
    if (text == "" || text2 == "") { return alert("You need to fill inputs"); }

    var formData = {};
    formData['fullName'] = text;
    formData['empCode'] = text2;
    document.getElementById("fullName").value = " ";
    document.getElementById("empCode").value = "  ";
    insertNewRecord(formData);

}


function insertNewRecord(data) {
    var table = document.getElementById("employeeList");
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = '<a onClick="onDelete(this);myFunction();">&#10006</a>';
    msgerChat.scrollTop = msgerChat.scrollHeight;
    myFunction();

}

function onDelete(td) {
    if (confirm('Are you sure to delete this row ? ')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
    }
}

myFunction();

function myFunction() {
    var table = document.getElementById("employeeList")
    var Nrow = table.rows.length;
    i = Nrow - 1;
    var m = "";
    while (i != 0) {
        add(i);
        i--;
    }

}

function genJSON1() {
    var x = "";
    var table = document.getElementById("employeeList")
    var Nrow = table.rows.length;
    for (var i = 2; i <= Nrow; i++) {
        x = x + '{' + '"name"' + ':"' + table.rows[i - 1].cells[0].innerHTML + '",' + '"sname"' + ':"' + table.rows[i - 1].cells[1].innerHTML + '"' +
            '},';
    }
    x = x.slice(0, -1);
    x = "[" + x + "]";
    document.getElementById("json").innerHTML = x;

}

function tDelRows() {
    var table = document.getElementById("employeeList")
    var Nrow = table.rows.length;
    i = Nrow - 1;
    var m = "";
    while (i != 0) {
        table.deleteRow(i);
        i--;
    }

}

function genUI1() {
    var table = document.getElementById("employeeList");
    var i;
    var m = document.getElementById("json").innerHTML;
    var mm = JSON.parse(m);
    tDelRows();
    for (i = 0; i < mm.length; i++) {
        var obj = mm[i];
        var newRow = table.insertRow((i + 1));
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = obj.name
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = obj.sname
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = '<a onClick="onDelete(this);myFunction();">&#10006</a>';
        myFunction();
    }

}

function add(i) {

    var table = document.getElementById("employeeList");
    table.rows[i].cells[0].onclick = function() {
        alert(table.rows[i].cells[0].innerHTML + " " + table.rows[i].cells[1].innerHTML);
    };
    table.rows[i].cells[1].onclick = function() {
        alert(table.rows[i].cells[0].innerHTML + " " + table.rows[i].cells[1].innerHTML);
    };
}




//.................................................................................Using DIV............................................................

function onFormSubmit2() {
    var table = document.getElementById("Table");
    var text = document.getElementById("fullName").value;
    var text2 = document.getElementById("empCode").value;
    if (text == "" || text2 == "") { return alert("You need to fill inputs"); }
    document.getElementById("fullName").value = " ";
    document.getElementById("empCode").value = "  ";

    const div = document.createElement('div');
    div.className = 'rTableRow';
    div.innerHTML = `     
                    
                     <div class="rTableCell" onClick="cclick1(this)" >${text}</div>
                     <div class="rTableCell" onClick="cclick2(this)">${text2}</div>
                     <div class="rTableCell"><a onClick="onDelete2(this);">&#10006</a></div>
     `
    table.appendChild(div);
    msgerChat.scrollTop = msgerChat.scrollHeight;
};

function onDelete2(td) {
    if (confirm('Are you sure to delete this row ? ')) {
        var table = document.getElementById("Table");
        var row = td.parentNode.parentNode;
        table.removeChild(row);
    }
}

function cclick1(node) {

    var firstText = "";
    var curNode = node.childNodes[0];
    firstText = curNode.nodeValue;

    var node2 = node.nextSibling.nextSibling;
    var firstText2 = "";
    var curNode2 = node2.childNodes[0];
    firstText2 = curNode2.nodeValue;
    alert(firstText + " " + firstText2);
}

function cclick2(node) {

    var firstText = "";
    var curNode = node.childNodes[0];
    firstText = curNode.nodeValue;

    var node2 = node.previousSibling.previousSibling;
    var firstText2 = "";
    var curNode2 = node2.childNodes[0];
    firstText2 = curNode2.nodeValue;
    alert(firstText2 + " " + firstText);
}

function genJSON2() {

    var x = "";
    var text1 = "";
    var text2 = "";
    var table = document.getElementById("Table");

    for (var i = 3; i < table.childNodes.length; i++) {
        var curNode = table.childNodes[i];
        var curNode2 = curNode.childNodes[1];
        var m = curNode2.childNodes[0];
        text1 = m.nodeValue;

        curNode2 = curNode.childNodes[3];
        m = curNode2.childNodes[0];
        text2 = m.nodeValue;

        x = x + '{' + '"name"' + ':"' + text1 + '",' + '"sname"' + ':"' + text2 + '"' + '},';
    }
    x = x.slice(0, -1);
    x = "[" + x + "]";
    document.getElementById("json").innerHTML = x;
}

function dDelRows() {
    var table = document.getElementById("Table");
    var m = table.childNodes.length;
    for (var i = 3; i < m; i++) {
        table.removeChild(table.lastChild);
    }

}

function genUI2() {
    var table = document.getElementById("Table");
    dDelRows()
    var i;
    var m = document.getElementById("json").innerHTML;
    var mm = JSON.parse(m);
    for (i = 0; i < mm.length; i++) {
        var obj = mm[i];

        const div = document.createElement('div');
        div.className = 'rTableRow';
        div.innerHTML = `     
                    
                     <div class="rTableCell" onClick="cclick1(this)" >${obj.name}</div>
                     <div class="rTableCell" onClick="cclick2(this)">${obj.sname}</div>
                     <div class="rTableCell"><a onClick="onDelete2(this);">&#10006</a></div>
     `
        table.appendChild(div);
    }

}