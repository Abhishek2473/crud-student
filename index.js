function fetchDataAndDisplay() {
    axios.get("http://localhost:3000/dataa")
      .then(response => {
        displayDataInTable(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data');
      });
  }
  
  function deleteDataAndDisplay() {
    const id = prompt('Enter the ID of the data to delete:');
    
    if (!id) {
      return; 
    }
  
    axios.delete(`http://localhost:3000/dataa/${id}`)
      .then(() => {
        fetchDataAndDisplay();
        console.log('Data deleted successfully');
        alert('Data deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting data:', error);
        alert('Failed to delete data');
      });
  }
  
  function createDataAndDisplay() {
    const createForm = document.createElement('div'); // Create a div to contain the form
    createForm.innerHTML = `
        <textarea id="create-textarea" placeholder="Enter ID, Department, Name, and Email"></textarea>
        <button onclick="submitCreateData()">OK</button>
    `;
    const container = document.querySelector('.container');
    container.appendChild(createForm);
}

function submitCreateData() {
    const createTextarea = document.getElementById('create-textarea');
    const inputData = createTextarea.value.trim().split('\n'); // Split the input into lines
    if (inputData.length !== 4) {
        alert('Please enter ID, Department, Name, and Email on separate lines.');
        return;
    }
    const [id, dept, name, email] = inputData;
    if (!id || !dept || !name || !email) {
        alert('Please fill in all fields.');
        return;
    }

    axios.post("http://localhost:3000/dataa", {
            "id": id,
            "dept": dept,
            "name": name,
            "email": email
        })
        .then(() => {
            fetchDataAndDisplay();
            console.log('Data created successfully');
            alert('Data created successfully');
            const createForm = document.querySelector('.container > div');
            createForm.parentNode.removeChild(createForm); // Remove the form after successful creation
        })
        .catch(error => {
            console.error('Error creating data:', error);
            alert('Failed to create data');
        });
}

  
  function updateDataAndDisplay() {
    const id = prompt('Enter the ID of the data to update:');
    if (!id) {
      return; // User cancelled
    }
    const dept = prompt('Enter the dept:');
    const name = prompt('Enter the updated name:');
    const email = prompt('Enter the updated email:');
    if (!name || !email) {
      return; // User cancelled
    }
  
    axios.patch(`http://localhost:3000/dataa/${id}`, {
        "name": name,
        "dept": dept,
        "email": email
      })
      .then(() => {
        fetchDataAndDisplay();
        console.log('Data updated successfully');
        alert('Data updated successfully');
      })
      .catch(error => {
        console.error('Error updating data:', error);
        alert('Failed to update data');
      });
  }
  
  function displayDataInTable(data) {
    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = '';
  
    data.forEach(user => {
      const row = tableBody.insertRow();
      row.insertCell().textContent = user.id;
      row.insertCell().textContent = user.dept;
      row.insertCell().textContent = user.name;
      row.insertCell().textContent = user.email;
    });
  }
  