## 


| Route                    | HTTP   | Descriptions             |
|--------------------------|--------|--------------------------|
| /api/todos               | GET    | Get all the todos info   |
| /api/todos/              | POST   | Create a todo            |
| /api/todos/:id           | PUT    | update a book            |
| /api/todos/:id           | DELETE | delete a book            |
| /api/users/signin/google | POST   | signin with google login |
| /api/users/signin/       | POST   | signin with database     |
| /api/users/signup/       | POST   | register new user        |


 ##/api/todos/
data.todos
{
  title: 'input data task',
  task: 'input data task',
  date: input Date,
  iduser: input iduser,
  completed: true/false
}
## /api/users/signup/ 
data.users
{
  name:'input data name',
  email:'input data email' ,
  password: 'input data password'
}