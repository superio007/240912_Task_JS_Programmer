const dataJson = [
  {
    "id": 1,
    "chemical_name": "Sodium Hydroxide",
    "vendor": "ChemCorp",
    "density": "2.13 g/cm³",
    "viscosity": "78 cP",
    "packaging": "Plastic Drum",
    "pack_size": "25",
    "unit": "kg",
    "quantity": 100
  },
  {
    "id": 2,
    "chemical_name": "Hydrochloric Acid",
    "vendor": "LabChem",
    "density": "1.18 g/cm³",
    "viscosity": "1.6 cP",
    "packaging": "Glass Bottle",
    "pack_size": "1",
    "unit": "L",
    "quantity": 50
  },
  {
    "id": 3,
    "chemical_name": "Sulfuric Acid",
    "vendor": "ChemSupplier",
    "density": "1.84 g/cm³",
    "viscosity": "26.7 cP",
    "packaging": "Steel Drum",
    "pack_size": "200",
    "unit": "L",
    "quantity": 30
  },
  {
    "id": 4,
    "chemical_name": "Acetone",
    "vendor": "Chemical Solutions",
    "density": "0.79 g/cm³",
    "viscosity": "0.32 cP",
    "packaging": "Plastic Jerrycan",
    "pack_size": "5",
    "unit": "L",
    "quantity": 200
  },
  {
    "id": 5,
    "chemical_name": "Ethanol",
    "vendor": "PureChem",
    "density": "0.789 g/cm³",
    "viscosity": "1.2 cP",
    "packaging": "Glass Bottle",
    "pack_size": "2",
    "unit": "L",
    "quantity": 80
  },
  {
    "id": 6,
    "chemical_name": "Benzene",
    "vendor": "EcoChem",
    "density": "0.876 g/cm³",
    "viscosity": "0.65 cP",
    "packaging": "Steel Barrel",
    "pack_size": "150",
    "unit": "L",
    "quantity": 120
  },
  {
    "id": 7,
    "chemical_name": "Methanol",
    "vendor": "CleanChem",
    "density": "0.792 g/cm³",
    "viscosity": "0.59 cP",
    "packaging": "Plastic Canister",
    "pack_size": "10",
    "unit": "L",
    "quantity": 60
  },
  {
    "id": 8,
    "chemical_name": "Toluene",
    "vendor": "ChemSolutions",
    "density": "0.87 g/cm³",
    "viscosity": "0.59 cP",
    "packaging": "Plastic Drum",
    "pack_size": "50",
    "unit": "L",
    "quantity": 40
  },
  {
    "id": 9,
    "chemical_name": "Phosphoric Acid",
    "vendor": "LabChem",
    "density": "1.88 g/cm³",
    "viscosity": "3.3 cP",
    "packaging": "Glass Bottle",
    "pack_size": "1",
    "unit": "L",
    "quantity": 100
  },
  {
    "id": 10,
    "chemical_name": "Ammonium Hydroxide",
    "vendor": "ChemCorp",
    "density": "0.91 g/cm³",
    "viscosity": "0.56 cP",
    "packaging": "Plastic Drum",
    "pack_size": "25",
    "unit": "kg",
    "quantity": 150
  },
  {
    "id": 11,
    "chemical_name": "Formic Acid",
    "vendor": "GreenChem",
    "density": "1.22 g/cm³",
    "viscosity": "1.57 cP",
    "packaging": "Glass Bottle",
    "pack_size": "1",
    "unit": "L",
    "quantity": 70
  },
  {
    "id": 12,
    "chemical_name": "Potassium Hydroxide",
    "vendor": "ChemMasters",
    "density": "2.04 g/cm³",
    "viscosity": "70 cP",
    "packaging": "Steel Drum",
    "pack_size": "30",
    "unit": "kg",
    "quantity": 90
  },
  {
    "id": 13,
    "chemical_name": "Nitric Acid",
    "vendor": "EcoChem",
    "density": "1.51 g/cm³",
    "viscosity": "1.2 cP",
    "packaging": "Plastic Canister",
    "pack_size": "5",
    "unit": "L",
    "quantity": 110
  },
  {
    "id": 14,
    "chemical_name": "Chloroform",
    "vendor": "Chemical Solutions",
    "density": "1.49 g/cm³",
    "viscosity": "0.56 cP",
    "packaging": "Glass Bottle",
    "pack_size": "1",
    "unit": "L",
    "quantity": 50
  },
  {
    "id": 15,
    "chemical_name": "Glycerol",
    "vendor": "BioChem",
    "density": "1.50 g/cm³",
    "viscosity": "0.59 cP",
    "packaging": "Glass Bottle",
    "pack_size": "1",
    "unit": "L",
    "quantity": 50
  }
]
let selectedRowId = null;
localStorage.setItem('dataJson', JSON.stringify(dataJson));
// After updating the dataJson array
if(!localStorage.getItem('dataJson')){
  localStorage.setItem('dataJson', JSON.stringify(dataJson));
}
document.addEventListener("DOMContentLoaded", function () {
  let ss = JSON.parse(localStorage.getItem(('dataJson')));
  // console.log(ss.length);
  appendData(ss)
  let previousClick = null;
  let previousRow = null;
  const tbody_row = document.querySelectorAll("tbody tr");
  tbody_row.forEach((row_tr) => {
    row_tr.addEventListener("click", function () {
      // Reset the background color of the previously clicked row
      if (previousRow && previousRow !== row_tr) {
        previousRow.style.backgroundColor = ""; // Reset to default background color
      }
      selectedRowId = this.id;
      document.querySelector('.fa-trash').addEventListener('click', () => {
        if (selectedRowId) {
          deleteData(selectedRowId); // Call deleteData with the selected row id
        }
      });
      // document.querySelector('.fa-arrow-down').addEventListener('click', () => {
      //   if (selectedRowId) {
      //     rowDown(selectedRowId);
      //   } else {
      //     alert('Please select a row first.');
      //   }
      // });
      // Change the background color of the current row
      row_tr.style.backgroundColor = "#e6e8ff"; // Set the desired color

      // Update the previousRow to the current one
      previousRow = row_tr;

      // Handle the color of the check icon
      const checkIcon = this.querySelector("td i.fa-check");
      if (previousClick && previousClick !== checkIcon) {
        previousClick.style.color = "#939495"; // Reset color of the previous check icon
      }
      if (checkIcon) {
        checkIcon.style.color = "#4568d8"; // Change the color of the current check icon
        previousClick = checkIcon;
      }
      console.log("Clicked row ID:", this.id); // Log the row ID
    });
  });
});
function appendData(dataJson) {
  const tableBody = document.querySelector('tbody');
  const currentRowCount = tableBody.rows.length; 
  dataJson.forEach((data, index) => {
    // Create a new row element
    const row = document.createElement('tr');
    row.id = `row_${currentRowCount + index + 1}`; 
    // row.id = `row_${index + 1}`;
    // Construct the inner HTML of the row with the data
    row.innerHTML = `
      <td>
        <i class="fa-solid fa-check" style="color: #939495"></i>
      </td>
      <td>${currentRowCount + index + 1}</td> <!-- Assuming you want to display row numbers -->
      <td>${data.chemical_name}</td>
      <td>${data.vendor}</td>
      <td>${data.density}</td>
      <td style="width: 100px">
        <input
          type="text"
          name=""
          id=""
          style="width: 115px"
          value="${data.viscosity}"
        />
      </td>
      <td>${data.packaging}</td>
      <td>${data.pack_size}</td>
      <td>${data.unit}</td>
      <td>${data.quantity}</td>
    `;

    // Append the new row to the table body
    tableBody.appendChild(row);
  });
}
function saveData() {
  const row_saveData = document.querySelectorAll('tbody tr');
  
  // Loop through each row and update the corresponding object in dataJson
  row_saveData.forEach((row) => {
    const rowId = row.id.replace('row_', ''); // Extract just the numeric part of the row ID
    
    // Find the corresponding object in the dataJson array by id
    const updatedObject = dataJson.find(item => item.id == rowId);
    
    if (updatedObject) {
      updatedObject.chemical_name = row.querySelector('td:nth-child(3)').textContent.trim();
      updatedObject.vendor = row.querySelector('td:nth-child(4)').textContent.trim();
      updatedObject.density = row.querySelector('td:nth-child(5)').textContent.trim();
      updatedObject.viscosity = row.querySelector('td:nth-child(6) input').value.trim(); // Assuming viscosity is in an input field
      updatedObject.packaging = row.querySelector('td:nth-child(7)').textContent.trim();
      updatedObject.pack_size = row.querySelector('td:nth-child(8)').textContent.trim();
      updatedObject.unit = row.querySelector('td:nth-child(9)').textContent.trim();
      updatedObject.quantity = row.querySelector('td:nth-child(10)').textContent.trim();
    }
  });
  
  // Save the updated dataJson array to localStorage
  localStorage.setItem('dataJson', JSON.stringify(updatedObject));
  
  console.log('Data saved to localStorage:', dataJson);
}

function deleteData(id) {
  const rowId = id.replace('row_', ''); // Get the numeric part of the row ID
  const index = dataJson.findIndex(item => item.id == rowId); // Find the index of the item
  
  if (index !== -1) {
    // Remove the item from the dataJson array
    dataJson.splice(index, 1);
    
    // Update the table in the DOM
    document.getElementById(id).remove(); // Remove the row from the DOM
    
    // Update localStorage with the new dataJson array
    localStorage.setItem('dataJson', JSON.stringify(dataJson));
    
    console.log('Deleted item with id:', rowId);
  }
}
function saveformData(event) {
  // Prevent the form from submitting to the server
  event.preventDefault();

  // Get the input values
  const Chemical = document.getElementById('Chemical').value;
  const Vender = document.getElementById('Vender').value;
  const Density = document.getElementById('Density').value;
  const Viscosity = document.getElementById('Viscosity').value;
  const Packaging = document.getElementById('Packaging').value;
  const Pack = document.getElementById('Pack').value;
  const Unit = document.getElementById('Unit').value;
  const Quantity = document.getElementById('Quantity').value;
  let ss = JSON.parse(localStorage.getItem(('dataJson')));
  // Create a new data entry
  const addData = 
    {
      "id": ss.length + 1,
      "chemical_name": Chemical,
      "vendor": Vender,
      "density": Density,
      "viscosity": Viscosity,
      "packaging": Packaging,
      "pack_size": Pack,
      "unit": Unit,
      "quantity": Quantity
    };
  ss.push(addData);
  // Append the new data to the table
  appendData([addData]);
  console.log(addData);
  localStorage.setItem('dataJson', JSON.stringify(ss));

  // Optionally, you can hide the form or reset the inputs after submission
  document.querySelector('.form').reset(); // Clears the form inputs
  document.querySelector('.form_div').classList.add('d-none'); // Hide the form
}