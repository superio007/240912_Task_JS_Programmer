const dataJson = [
  {
    id: 1,
    chemical_name: "Sodium Hydroxide",
    vendor: "ChemCorp",
    density: "2.13",
    viscosity: "78",
    packaging: "Plastic Drum",
    pack_size: "25",
    unit: "kg",
    quantity: 100,
  },
  {
    id: 2,
    chemical_name: "Hydrochloric Acid",
    vendor: "LabChem",
    density: "1.18",
    viscosity: "1.6",
    packaging: "Glass Bottle",
    pack_size: "1",
    unit: "L",
    quantity: 50,
  },
  {
    id: 3,
    chemical_name: "Sulfuric Acid",
    vendor: "ChemSupplier",
    density: "1.84",
    viscosity: "26.7",
    packaging: "Steel Drum",
    pack_size: "200",
    unit: "L",
    quantity: 30,
  },
  {
    id: 4,
    chemical_name: "Acetone",
    vendor: "Chemical Solutions",
    density: "0.79",
    viscosity: "0.32",
    packaging: "Plastic Jerrycan",
    pack_size: "5",
    unit: "L",
    quantity: 200,
  },
  {
    id: 5,
    chemical_name: "Ethanol",
    vendor: "PureChem",
    density: "0.789",
    viscosity: "1.2",
    packaging: "Glass Bottle",
    pack_size: "2",
    unit: "L",
    quantity: 80,
  },
  {
    id: 6,
    chemical_name: "Benzene",
    vendor: "EcoChem",
    density: "0.876",
    viscosity: "0.65",
    packaging: "Steel Barrel",
    pack_size: "150",
    unit: "L",
    quantity: 120,
  },
  {
    id: 7,
    chemical_name: "Methanol",
    vendor: "CleanChem",
    density: "0.792",
    viscosity: "0.59",
    packaging: "Plastic Canister",
    pack_size: "10",
    unit: "L",
    quantity: 60,
  },
  {
    id: 8,
    chemical_name: "Toluene",
    vendor: "ChemSolutions",
    density: "0.87",
    viscosity: "0.59",
    packaging: "Plastic Drum",
    pack_size: "50",
    unit: "L",
    quantity: 40,
  }
];
let selectedRowId = null;
// localStorage.setItem('dataJson', JSON.stringify(dataJson));
// Check if localstage doesn't exist's then set table data from my dataJson array.
if (!localStorage.getItem("dataJson")) {
  localStorage.setItem("dataJson", JSON.stringify(dataJson));
}
// To load table intially from local storage when page loads.
document.addEventListener("DOMContentLoaded", function () {
  let ss = JSON.parse(localStorage.getItem("dataJson"));
  // console.log(ss.length);
  appendData(ss);
  let previousClick = null;
  let previousRow = null;
  const tbody_row = document.querySelectorAll("tbody tr");
  tbody_row.forEach((row_tr) => {
    row_tr.addEventListener("dblclick", function () {
      logRowData(this);  // Log the row data on double-click
    });
    row_tr.addEventListener("click", function () {
      // Reset the background color of the previously clicked row
      if (previousRow && previousRow !== row_tr) {
        previousRow.style.backgroundColor = ""; // Reset to default background color
      }
      selectedRowId = this.id;
      document.querySelector(".fa-trash").addEventListener("click", () => {
        if (selectedRowId) {
          deleteData(selectedRowId); // Call deleteData with the selected row id
        }
      });
      row_tr.style.backgroundColor = "#e6e8ff"; // Set the desired color
      document.querySelector(".fa-arrow-down").addEventListener("click",(event)=>{
        rowDown(event,ss,selectedRowId);
      }) 
      document.querySelector(".fa-arrow-up").addEventListener("click",(event)=>{
        rowUp(event,ss,selectedRowId);
      }) 
      // Update the previousRow to the current one
      previousRow = row_tr;

      // Handle the color of the check icon
      const checkIcon = this.querySelector("td i.fa-check");
      if (previousClick && previousClick !== checkIcon) {
        previousClick.style.color = "#939495"; // Reset color of the previous check icon
      }
      if (checkIcon) {
        checkIcon.style.color = "#0e3ccb"; // Change the color of the current check icon
        previousClick = checkIcon;
      }
      console.log("Clicked row ID:", this.id); // Log the row ID
    });
  });
});
// This function is used append data from localstorage into Dom element tbody.
function appendData(dataJson) {
  const tableBody = document.querySelector("tbody");
  const currentRowCount = tableBody.rows.length;
  dataJson.forEach((data, index) => {
    // Create a new row element
    const row = document.createElement("tr");
    row.id = `row_${currentRowCount + index + 1}`;
    // row.id = `row_${index + 1}`;
    // Construct the inner HTML of the row with the data
    row.innerHTML = `
      <td id="check">
        <i class="fa-solid fa-check" style="color: #939495"></i>
      </td>
      <td id="table_id">${currentRowCount + index + 1}</td> 
      <td class="chemicalName">${data.chemical_name}</td>
      <td>${data.vendor}</td>
      <td><span class="table_border">${data.density}</span></td>
      <td style="width: 100px">
        <input
          type="text"
          name=""
          class="table_border"
          id=""
          style="width: 90px"
          value="${data.viscosity}"
        />
      </td>
      <td>${data.packaging}</td>
      <td>${data.pack_size}</td>
      <td>${data.unit}</td>
      <td><span class="table_border">${data.quantity}</span></td>
    `;

    // Append the new row to the table body
    tableBody.appendChild(row);
  });
}
// To save data when changes has been done in Viscosity.
function saveData() {
  const row_saveData = document.querySelectorAll("tbody tr"); // Get all the rows

  // Loop through each row and either update or add the corresponding object in dataJson
  row_saveData.forEach((row) => {
    const rowId = row.id.replace("row_", ""); // Extract the numeric part of the row ID

    // Find the corresponding object in the dataJson array by ID
    let updatedObject = dataJson.find((item) => item.id == rowId);

    if (updatedObject) {
      // Update the object with the current table values if it exists in dataJson
      updatedObject.chemical_name = row
        .querySelector("td:nth-child(3)")
        .textContent.trim();
      updatedObject.vendor = row
        .querySelector("td:nth-child(4)")
        .textContent.trim();
      updatedObject.density = row
        .querySelector("td:nth-child(5)")
        .textContent.trim();
      updatedObject.viscosity = row
        .querySelector("td:nth-child(6) input")
        .value.trim(); // Assuming viscosity is in an input field
      updatedObject.packaging = row
        .querySelector("td:nth-child(7)")
        .textContent.trim();
      updatedObject.pack_size = row
        .querySelector("td:nth-child(8)")
        .textContent.trim();
      updatedObject.unit = row
        .querySelector("td:nth-child(9)")
        .textContent.trim();
      updatedObject.quantity = row
        .querySelector("td:nth-child(10)")
        .textContent.trim();
    } else {
      // If the object is not found in dataJson, it's a new entry, so add it to dataJson
      const newObject = {
        id: parseInt(rowId), // Convert the rowId to a number
        chemical_name: row.querySelector("td:nth-child(3)").textContent.trim(),
        vendor: row.querySelector("td:nth-child(4)").textContent.trim(),
        density: row.querySelector("td:nth-child(5)").textContent.trim(),
        viscosity: row.querySelector("td:nth-child(6) input").value.trim(),
        packaging: row.querySelector("td:nth-child(7)").textContent.trim(),
        pack_size: row.querySelector("td:nth-child(8)").textContent.trim(),
        unit: row.querySelector("td:nth-child(9)").textContent.trim(),
        quantity: row.querySelector("td:nth-child(10)").textContent.trim(),
      };
      dataJson.push(newObject); // Add the new object to the array
    }
  });
  localStorage.setItem("dataJson", JSON.stringify(dataJson));
}
// Delete row when click on fa-trash only if row is selected. 
function deleteData(id) {
  const rowId = id.replace("row_", ""); // Get the numeric part of the row ID

  // Find the index of the item in the dataJson array
  const index = dataJson.findIndex((item) => item.id == rowId);

  if (index !== -1) {
    // Remove the item from the dataJson array
    dataJson.splice(index, 1);

    // Update localStorage with the new dataJson array
    localStorage.setItem("dataJson", JSON.stringify(dataJson));

    console.log("Deleted item with id:", rowId);
  }

  // Remove the row from the DOM regardless of whether it's in dataJson or not
  const rowElement = document.getElementById(id);
  if (rowElement) {
    rowElement.remove();
    // Update localStorage with the new dataJson array
    localStorage.setItem("dataJson", JSON.stringify(dataJson));
  }
}
// This function is usefull when new data is added when i clicked on fa-plus.
// function saveformData(event) {
//   event.preventDefault();
//   const Chemical = document.getElementById("Chemical").value;
//   const Vender = document.getElementById("Vender").value;
//   const Density = document.getElementById("Density").value;
//   const Viscosity = document.getElementById("Viscosity").value;
//   const Packaging = document.getElementById("Packaging").value;
//   const Pack = document.getElementById("Pack").value;
//   const Unit = document.getElementById("Unit").value;
//   const Quantity = document.getElementById("Quantity").value;

//   let ss = JSON.parse(localStorage.getItem("dataJson")) || [];

//   const addData = {
//     id: ss.length + 1, // This increments the ID for new entries
//     chemical_name: Chemical,
//     vendor: Vender,
//     density: Density,
//     viscosity: Viscosity,
//     packaging: Packaging,
//     pack_size: Pack,
//     unit: Unit,
//     quantity: Quantity,
//   };

//   ss.push(addData); // Push the new entry into the array

//   appendData([addData]); // Append the new row visually

//   localStorage.setItem("dataJson", JSON.stringify(ss)); // Save the updated data to localStorage
//   document.querySelector(".form").reset(); // Clear form inputs
//   document.querySelector(".form_div").classList.add("d-none"); // Hide the form
//   window.location.reload();
// }
function saveformData(event) {
  event.preventDefault();

  const rowId = document.getElementById('rowId').value;  // Get the rowId from the hidden field
  const Chemical = document.getElementById("Chemical").value;
  const Vender = document.getElementById("Vender").value;
  const Density = document.getElementById("Density").value;
  const Viscosity = document.getElementById("Viscosity").value;
  const Packaging = document.getElementById("Packaging").value;
  const Pack = document.getElementById("Pack").value;
  const Unit = document.getElementById("Unit").value;
  const Quantity = document.getElementById("Quantity").value;

  let ss = JSON.parse(localStorage.getItem("dataJson")) || [];

  if (rowId) {
    // If rowId exists, update the existing row
    const numericRowId = parseInt(rowId.replace('row_', '')); // Convert rowId to a number
    ss = ss.map(item => {
      if (item.id === numericRowId) {
        return {
          id: numericRowId,
          chemical_name: Chemical,
          vendor: Vender,
          density: Density,
          viscosity: Viscosity,
          packaging: Packaging,
          pack_size: Pack,
          unit: Unit,
          quantity: Quantity
        };
      }
      return item;
    });
  } else {
    // If rowId doesn't exist, add a new row
    const addData = {
      id: ss.length + 1, // Increment the ID for new entries
      chemical_name: Chemical,
      vendor: Vender,
      density: Density,
      viscosity: Viscosity,
      packaging: Packaging,
      pack_size: Pack,
      unit: Unit,
      quantity: Quantity,
    };
    ss.push(addData); // Add new entry to the array
  }

  localStorage.setItem("dataJson", JSON.stringify(ss)); // Save updated data to localStorage
  window.location.reload(); // Refresh the page to reload the table with new data
}

// This function reattaches all the event listners back after we shift rows.
function attachRowClickListeners() {
  let previousClick = null;
  let previousRow = null;

  // Remove any previous event listeners for all rows
  const tbody_row = document.querySelectorAll("tbody tr");
  tbody_row.forEach((row_tr) => {
    row_tr.replaceWith(row_tr.cloneNode(true)); // This clears existing event listeners
  });

  // Re-attach event listeners to the new rows
  const newRows = document.querySelectorAll("tbody tr"); // Get the updated rows after clone

  newRows.forEach((row_tr) => {
    row_tr.addEventListener("click", function () {
      // Reset the background color of the previously clicked row
      if (previousRow && previousRow !== row_tr) {
        previousRow.style.backgroundColor = "";  // Reset background color
      }

      selectedRowId = this.id;  // Set the clicked row ID

      // Add event listeners for the trash and arrow buttons
      document.querySelector(".fa-trash").removeEventListener("click", trashEvent);  // Remove existing listeners
      document.querySelector(".fa-trash").addEventListener("click", trashEvent);  // Reattach the listener

      document.querySelector(".fa-arrow-down").removeEventListener("click", arrowDownEvent);  // Remove existing listener
      document.querySelector(".fa-arrow-down").addEventListener("click", arrowDownEvent);  // Reattach the listener

      document.querySelector(".fa-arrow-up").removeEventListener("click", arrowUpEvent);  // Remove existing listener
      document.querySelector(".fa-arrow-up").addEventListener("click", arrowUpEvent);  // Reattach the listener

      // Set the background color for the clicked row
      row_tr.style.backgroundColor = "#e6e8ff"; 

      // Handle the check icon color
      const checkIcon = this.querySelector("td i.fa-check");
      if (previousClick && previousClick !== checkIcon) {
        previousClick.style.color = "#939495"; // Reset color of previous check icon
      }
      if (checkIcon) {
        checkIcon.style.color = "#4568d8";  // Highlight current check icon
        previousClick = checkIcon;
      }

      previousRow = row_tr;  // Update the previous row reference
    });
  });
}
// supporting function for deleteData function
function trashEvent() {
  if (selectedRowId) {
    deleteData(selectedRowId);  // Call deleteData with the selected row id
  }
}
// this function is used to trigger arrowDown event.
function arrowDownEvent(event) {
  rowDown(event, dataJson, selectedRowId);
}
// this function is used to trigger arrowUp event. 
function arrowUpEvent(event) {
  rowUp(event, dataJson, selectedRowId);
}
// this function shifts selected row down by 1 position.
function rowDown(event, dataJson, row_index) {
  event.preventDefault();

  const index = parseInt(row_index.replace("row_", "")) - 1;

  if (index < 0 || index >= dataJson.length - 1) {
    console.log("Invalid index");
    return;
  }

  // If it's the last item, move it to the first position
  if (index === dataJson.length - 1) {
    const lastElement = dataJson.pop(); // Remove the last element
    dataJson.unshift(lastElement); // Add it to the start
  } else {
    // Swap with the next element
    const temp = dataJson[index];
    dataJson[index] = dataJson[index + 1];
    dataJson[index + 1] = temp;
  }

  rearrangeData(dataJson);
}
// this function shifts selected row up by 1 position.
function rowUp(event, dataJson, row_index) {
  event.preventDefault();

  const index = parseInt(row_index.replace("row_", "")) - 1;

  if (index <= 0 || index >= dataJson.length) {
    console.log("Invalid index");
    return;
  }

  // If it's the first item, move it to the last position
  if (index === 0) {
    const firstElement = dataJson.shift(); // Remove the first element
    dataJson.push(firstElement); // Add it to the end
  } else {
    // Swap with the previous element
    const temp = dataJson[index];
    dataJson[index] = dataJson[index - 1];
    dataJson[index - 1] = temp;
  }

  rearrangeData(dataJson);
}
// This function help dom to reload after shift row down or up.
function rearrangeData(dataJson) {
  const tableBody = document.querySelector("tbody");

  // Clear the existing rows
  tableBody.innerHTML = "";

  // Loop through the data and append new rows
  dataJson.forEach((data, index) => {
    const row = document.createElement("tr");
    row.id = `row_${index + 1}`;

    row.innerHTML = `
      <td>
        <i class="fa-solid fa-check" style="color: #939495"></i>
      </td>
      <td>${index + 1}</td>
      <td class="chemicalName">${data.chemical_name}</td>
      <td>${data.vendor}</td>
      <td><span class="table_border">${data.density}</span></td>
      <td style="width: 100px">
        <input type="text" class="table_border" style="width: 90px" value="${data.viscosity}">
      </td>
      <td>${data.packaging}</td>
      <td>${data.pack_size}</td>
      <td>${data.unit}</td>
      <td><span class="table_border">${data.quantity}</span></td>
    `;

    tableBody.appendChild(row);
  });

  // Reattach event listeners after rearranging data
  attachRowClickListeners();
}
// function for toogle between asscending or dcending to  all colums consist of text formats.
let isAscending = true; // Global toggle for sorting direction
function sortData(column, headerElement) {
  let ss = JSON.parse(localStorage.getItem("dataJson")) || [];

  // Sort based on the column and toggle the sorting order
  ss.sort((a, b) => {
    if (isAscending) {
      return a[column] > b[column] ? 1 : -1; // Ascending order
    } else {
      return a[column] < b[column] ? 1 : -1; // Descending order
    }
  });

  // Toggle the sorting direction for next time
  isAscending = !isAscending;

  // Update localStorage with the sorted data
  localStorage.setItem("dataJson", JSON.stringify(ss));

  // Re-render the sorted data in the table
  rearrangeData(ss);

  // Reset sorting arrows for all headers
  document.querySelectorAll("th").forEach(th => {
    th.classList.remove("ascending", "descending");
  });

  // Add the appropriate class (ascending or descending) to the clicked header
  if (isAscending) {
    headerElement.classList.add("ascending");
    headerElement.classList.remove("descending");
  } else {
    headerElement.classList.add("descending");
    headerElement.classList.remove("ascending");
  }
}
// function for toogle between asscending or dcending to  all colums consist of numbers formats.
let isfloatAscending = {
  density: true,
  viscosity: true,
  quantity: true
};
function sortFloatData(column, headerElement) {
  let ss = JSON.parse(localStorage.getItem("dataJson")) || [];

  // Sort based on the column and toggle the sorting order
  ss.sort((a, b) => {
    let aVal = parseFloat(a[column]);
    let bVal = parseFloat(b[column]);

    if (isfloatAscending[column]) {
      return aVal - bVal; // Ascending order for float
    } else {
      return bVal - aVal; // Descending order for float
    }
  });

  // Toggle the sorting direction for next time
  isfloatAscending[column] = !isfloatAscending[column];

  // Update localStorage with the sorted data
  localStorage.setItem("dataJson", JSON.stringify(ss));

  // Re-render the sorted data in the table
  rearrangeData(ss);

  // Reset sorting arrows for all headers
  document.querySelectorAll("th").forEach(th => {
    th.classList.remove("ascending", "descending");
  });

  // Add the appropriate class (ascending or descending) to the clicked header
  if (isfloatAscending[column]) {
    headerElement.classList.add("ascending");
  } else {
    headerElement.classList.add("descending");
  }
}
// Add this function to log the row data
function logRowData(row) {
  const rowData = Array.from(row.children).map(td => td.textContent.trim());
  const rownumberId = rowData[1];
  // console.log(rowId);
  editcompleteRow(rownumberId);
}

function editcompleteRow(rowId) {
  const numericRowId = parseInt(rowId.replace('row_', ''));
  const dataformlocalStorage = JSON.parse(localStorage.getItem("dataJson"));
  let rowData = null;

  // Find the row data by rowId
  dataformlocalStorage.forEach((item) => {
    if (item.id === numericRowId) {
      rowData = item;
    }
  });

  // Display the form and populate the fields with the row's data
  document.querySelector('.form_div').classList.remove('d-none');
  document.getElementById('rowId').value = rowId; // Set the rowId in the hidden field
  document.getElementById('Chemical').value = rowData.chemical_name;
  document.getElementById('Vender').value = rowData.vendor;
  document.getElementById('Density').value = rowData.density;
  document.getElementById('Viscosity').value = rowData.viscosity;
  document.getElementById('Packaging').value = rowData.packaging;
  document.getElementById('Pack').value = rowData.pack_size;
  document.getElementById('Unit').value = rowData.unit;
  document.getElementById('Quantity').value = rowData.quantity;
}

