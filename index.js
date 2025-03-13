import inquirer from 'inquirer';
import pg from 'pg';

const {Client} = pg;

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'Asdf8124$',
    database: 'employeerecord',
    port: 5432
});

async function connectdb(){
    try{
        await db.connect();
        console.log("Connected to database");
        promptQuestions();
    }catch(err){
        console.log("Error connecting to database");
    }
};

connectdb();

async function promptQuestions(){
  try{
    const questions = [{
        type: 'list',
        name: 'actions',
        message: 'What would you like to do?',
        choices: ['View Departments', 'Add Department', 'View Roles', 'Add Role', 'View Employees', 'Add Employee', 'Update Employee Role', 'Exit']
  }];
  const choicemade = await inquirer.prompt(questions);
  switch(choicemade.actions){
    case "View Departments":
        selectTable('department');
        promptQuestions();
        break;
    case "Add Department":
        addDepartment();
        promptQuestions();
        break;
    case "View Roles":
        selectTable('roles');
        promptQuestions();
        break;
    case "Add Role":
        addRole();
        promptQuestions();
        break;
    case "View Employees":
        selectTable('employee');
        promptQuestions();
        break;
    case "Add Employee":
        addEmployee();
        promptQuestions();
        break;
    case "Update Employee Role":
        updateRole();
        promptQuestions();
        break;
    case "Exit":
        console.log('Exiting program. Bye bye');
        process.exit(0);
    default:
        console.log("Mistake was made");
  }
  } catch(error){
    console.error('Error', error);
  }
};

async function selectTable(tableName){
    try{
        let query = '';
        if(tableName === 'department'){
            query = 'SELECT * FROM "department"';
        }
        else if(tableName === 'roles'){
            query = 'SELECT * FROM "roles"';
        }
        else if(tableName === 'employee'){
            query = 'SELECT * FROM "employee"'
        }

        const results = await db.query(query);
        console.log(`\nData from ${tableName}:`);
        console.table(results.rows);
    }catch(error){
        console.error('Error', error);
    }
};

async function addDepartment(){
    try{
        const answers = await inquirer.prompt({
            type: 'input',
            name: 'department',
            message: 'What department would you like to add?'
        });
        const name = answers.department;
        const query = 'INSERT INTO "department" (name) VALUES($1)';
        await db.query(query, [name]);
        console.log('Department added');
    }catch(error){
        console.error('Error',error);
    }
};

async function addRole(){
    try{
        const answers = await inquirer.prompt([
            {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?'
            },
            {
            type:'input',
            name: 'salary',
            message: 'What is the salary for this role?'
            },
            {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id for this role?'
            }
        ]);
        const title = answers.title;
        const salary = parseFloat(answers.salary);
        const department = parseInt(answers.department_id);
        const query = 'INSERT INTO "roles" (title,salary,department_id) VALUES($1,$2,$3)';
        await db.query(query, [title, salary,department]);
        console.log('Role added');
    }catch(error){
        console.error('Error',error);
    }
};

async function addEmployee(){
    try{
        const answers = await inquirer.prompt([
            {
            type: 'input',
            name: 'firstname',
            message: 'What is the first name?'
            },
            {
            type:'input',
            name: 'lastname',
            message: 'What is the last name?'
            },
            {
            type: 'input',
            name: 'roleid',
            message: 'What is the role id?'
            }
        ]);
        const firstname = answers.firstname;
        const lastname = answers.lastname;
        const roleid = parseInt(answers.roleid);
        const query = 'INSERT INTO "employee" (firstname,lastname,roleid) VALUES($1,$2,$3)';
        await db.query(query,[firstname,lastname,roleid]);
        console.log('Employee added');
    }catch(error){
        console.error('Error', error);
    }
};

async function updateRole(){
    try{
        const answers = await inquirer.prompt([
            {
            type: 'input',
            name: 'firstname',
            message: 'What is the employees first name?'
            },
            {
                type: 'input',
                name: 'lastname',
                message: 'What is the employees last name?'
            },
            {
            type:'list',
            name: 'title',
            message: 'What role for the employee?',
            choices: ['Civil Engineer','Software Engineer','Sales Representative','Sales Manager','Marketing Manager','Marketing Agent']
            }
        ]);
        const firstname = answers.firstname;
        const lastname = answers.lastname;
        const title = answers.title;
        const query = 'UPDATE "employee" SET roleid = (SELECT id FROM "roles" WHERE title = $1) WHERE firstname = $2 and lastname = $3';
        await db.query(query,[title,firstname,lastname]);
        console.log('Employee role updated');
    }catch(error){
        console.error('Error', error);
    }
};