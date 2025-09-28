const readline = require('readline');

// In-memory employee list
let employees = [];

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Display main menu
function showMenu() {
  console.log('\n=== Employee Management System ===');
  console.log('1. Add Employee');
  console.log('2. List Employees');
  console.log('3. Remove Employee');
  console.log('4. Exit');
  rl.question('Choose an option (1-4): ', handleMenuSelection);
}

// Handle user input
function handleMenuSelection(choice) {
  switch (choice.trim()) {
    case '1':
      addEmployee();
      break;
    case '2':
      listEmployees();
      break;
    case '3':
      removeEmployee();
      break;
    case '4':
      console.log('Exiting... Goodbye!');
      rl.close();
      break;
    default:
      console.log('Invalid choice. Please select 1, 2, 3, or 4.');
      showMenu();
  }
}

// Add a new employee
function addEmployee() {
  rl.question('Enter employee name: ', name => {
    rl.question('Enter employee ID: ', id => {
      if (employees.find(emp => emp.id === id.trim())) {
        console.log('❌ Employee ID already exists. Try again.');
      } else {
        employees.push({ name: name.trim(), id: id.trim() });
        console.log(`✅ Employee ${name} added.`);
      }
      showMenu();
    });
  });
}

// List all employees
function listEmployees() {
  console.log('\n📋 Employee List:');
  if (employees.length === 0) {
    console.log('No employees found.');
  } else {
    employees.forEach((emp, index) => {
      console.log(`${index + 1}. ${emp.name} (ID: ${emp.id})`);
    });
  }
  showMenu();
}

// Remove an employee by ID
function removeEmployee() {
  rl.question('Enter employee ID to remove: ', id => {
    const index = employees.findIndex(emp => emp.id === id.trim());
    if (index !== -1) {
      const removed = employees.splice(index, 1);
      console.log(`🗑️ Employee ${removed[0].name} removed.`);
    } else {
      console.log('❌ No employee found with that ID.');
    }
    showMenu();
  });
}

// Start the app
showMenu();
