// Initialize data array
let data = [];

// Load data from JSON file or local storage (if available)
loadUserData();

// Function to load data from JSON file or local storage
function loadUserData() {
    // Check if data exists in local storage
    if (localStorage.getItem('userData')) {
        try {
            data = JSON.parse(localStorage.getItem('userData'));
        } catch (error) {
            console.error('Error parsing user data from local storage:', error);
            localStorage.removeItem('userData');
            data = [];
        }
    }

    // Display data in the table
    displayData();
}

// Function to display data in the table
function displayData() {
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Add rows to the table for each data item
    data.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = item.nombre;
        row.insertCell().textContent = item.fechaNacimiento;
        row.insertCell().textContent = item.sexo;
        row.insertCell().textContent = item.direccion;
        row.insertCell().textContent = item.telefono;
        row.insertCell().textContent = item.email;

        // Add actions cell with buttons
        const actionsCell = row.insertCell();
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('action-buttons');

        const viewButton = document.createElement('button');
        viewButton.textContent = 'Consultar';
        viewButton.classList.add('action-button');
        viewButton.addEventListener('click', () => viewUser(index));
        actionsDiv.appendChild(viewButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Modificar';
        editButton.classList.add('action-button');
        editButton.addEventListener('click', () => editUser(index));
        actionsDiv.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.classList.add('action-button');
        deleteButton.addEventListener('click', () => deleteUser(index));
        actionsDiv.appendChild(deleteButton);

        actionsCell.appendChild(actionsDiv);
    });
}

// Function to view a user
function viewUser(index) {
    // TODO: Implement viewing functionality (e.g., modal window)
    console.log('View user:', data[index]);
}

// Function to edit a user
function editUser(index) {
    // TODO: Implement editing functionality (e.g., pre-populate form)
    console.log('Edit user:', data[index]);
}

// Function to delete a user
function deleteUser(index) {
    // Remove the user from the data array
    data.splice(index, 1);

    // Update local storage
    try {
        localStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
        console.error('Error saving user data to local storage:', error);
    }

    // Redisplay the table
    displayData();
}

// Function to add a new user
function addNewUser() {

    event.preventDefault();
    // Get form data
     const formData = new FormData(this);
    const nombre = formData.get('nombre');
    const fechaNacimiento = formData.get('fechaNacimiento');
    const sexo = formData.get('sexo');
    const direccion = formData.get('direccion');
    const telefono = formData.get('telefono');
    const email = formData.get('email');
  
    // Validate user input 
    if (!nombre) {
      alert('Por favor, ingrese el nombre completo.');
      return;
    }
  
    // Create a new user object
    const newUser = {
      nombre: nombre,
      fechaNacimiento: fechaNacimiento,
      sexo: sexo,
      direccion: direccion,
      telefono: telefono,
      email: email
    };
  
    // Add the new user to the data array
    data.push(newUser);
  
    // Update local storage
    localStorage.setItem('userData', JSON.stringify(data));
  
    // Show success message
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = 'Nuevo usuario agregado exitosamente.';
    messageContainer.style.color = 'green';
    messageContainer.style.display = 'block';
  
    // Clear message after a few seconds (optional)
    setTimeout(() => {
      messageContainer.textContent = '';
      messageContainer.style.display = 'none';
    }, 3000); 
  
    // Redirigir a index.html (ahora al final)
    window.location.href = 'index.html';  
  }

//add event listener to the "Agregar" button
const enviar= document.getElementById('Enviar');
enviar.addEventListener('click', (event) => { // Pasa el evento
  addNewUser(event, event.target.form); // Pasa el formulario como argumento
});

// Add event listener to the "Nuevo" button
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', () => {
  window.location.href = 'registrar.html';
});

// Add event listener to the search button
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', searchUsers);

// Function to search users
function searchUsers() {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];

  // Clear existing table rows
  tableBody.innerHTML = '';

  // Filter data based on search term
  const filteredData = data.filter(user => {
    return (
      user.nombre.toLowerCase().includes(searchTerm) ||
      user.fechaNacimiento.toLowerCase().includes(searchTerm) ||
      user.sexo.toLowerCase().includes(searchTerm) ||
      user.direccion.toLowerCase().includes(searchTerm) ||
      user.telefono.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  });

  // Display filtered data in the table
  filteredData.forEach((item, index) => {
    const row = tableBody.insertRow();
    row.insertCell().textContent = item.nombre;
    row.insertCell().textContent = item.fechaNacimiento;
    row.insertCell().textContent = item.sexo;
    row.insertCell().textContent = item.direccion;
    row.insertCell().textContent = item.telefono;
    row.insertCell().textContent = item.email;

    // Add actions cell with buttons
    const actionsCell = row.insertCell();
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('action-buttons');

    const viewButton = document.createElement('button');
    viewButton.textContent = 'Consultar';
    viewButton.classList.add('action-button');
    viewButton.addEventListener('click', () => viewUser(index));
    actionsDiv.appendChild(viewButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Modificar';
    editButton.classList.add('action-button');
    editButton.addEventListener('click', () => editUser(index));
    actionsDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.classList.add('action-button');
    deleteButton.addEventListener('click', () => deleteUser(index));
    actionsDiv.appendChild(deleteButton);

    actionsCell.appendChild(actionsDiv);
  });

}
