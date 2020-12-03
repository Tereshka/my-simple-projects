const URL = 'https://raw.githubusercontent.com/Tereshka/my-simple-projects/master/29-user-table/js/data.json'
let tableBody = null;
let buttonAddUser = null;

/**
 * Main method. Init all functionality
 */
function init() {
  tableBody = document.querySelector('#table-body');
  buttonAddUser = document.querySelector('#button-add-user');

  buttonAddUser.addEventListener('click', (e) => addUser(e));

  let users = getResource(URL);

  fillTable(users);
}

async function getResource(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error from ${url} with status ${res.status}`);
  }
  return await res.json();
}

/**
 * Load data from the file to the table
 */
function fillTable(users) {
  for (let i = 0; i < users.length; i++) {
    const row = createNewRow(users[i]);
    tableBody.appendChild(row);
  }
}

/**
 * Create new row for a user
 * @param {User} user 
 */
function createNewRow(user) {
  const row = document.createElement('tr');
  row.setAttribute('id', `row-user-${user.id}`);

  const tdName = document.createElement('td');
  tdName.textContent = user.name;
  const tdPhone = document.createElement('td');
  tdPhone.textContent = user.phone;
  const tdButtonEdit = document.createElement('td');
  tdButtonEdit.appendChild(createEditButton(user.id));
  const tdButtonDelete = document.createElement('td');
  tdButtonDelete.appendChild(createDeleteButton(user.id));

  row.appendChild(tdName);
  row.appendChild(tdPhone);
  row.appendChild(tdButtonEdit);
  row.appendChild(tdButtonDelete);

  return row;
}

/**
 * Create Edit button for the row
 * @param {number} id 
 */
function createEditButton(id) {
  const button = document.createElement('button');
  button.textContent = 'Edit';
  button.setAttribute('class', 'btn btn-primary');

  button.addEventListener('click', (e) => {
    const currentRow = document.querySelector(`#row-user-${id}`);

    
  });

  return button;
}

/**
 * Create Delete button for the row
 * @param {number} id 
 */
function createDeleteButton(id) {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.setAttribute('class', 'btn btn-danger');

  button.addEventListener('click', (e) => {
    const currentRow = document.querySelector(`#row-user-${id}`);
    tableBody.removeChild(currentRow);
  });

  return button;
}

/**
 * get max id value from the user lists
 */
function getMaxId() {
  return Math.max(...users.map(el => el.id));
}

/**
 * Add new user to the table
 * @param {Event} e 
 */
function addUser(e) {
  e.preventDefault();
  let error = '';
  showError(error);

  const fieldName = document.querySelector('#field-name');
  const name = fieldName.value;
  if (name === '') {
    error = 'Name is empty. ';
  }

  const fieldPhone = document.querySelector('#field-phone');
  const phone = fieldPhone.value;
  if (phone === '' || !/\+?\d+/gm.test(phone)){
    error += 'Phone is empty OR is not correct.';
  }

  if (error !== '') {
    showError(error);
    return;
  }

  const row = createNewRow({
    id: getMaxId() + 1,
    name,
    phone,
  });
  tableBody.appendChild(row);

  fieldName.value = '';
  fieldPhone.value = '';
}

/**
 * Show error message 
 * @param {string} text 
 */
function showError(text) {
  const errorSpan = document.querySelector('.error');
  errorSpan.textContent = text;
  console.log(text)
}

init();
