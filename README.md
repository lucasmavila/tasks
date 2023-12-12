# Project

This project is my first API using Node.js :)

- It does not use any libray or framework like Express.
- It only uses basic HTTP methods from Node
- It is an API to manage daily tasks like
  - Google tasks
  - Microsoft To-Do
  - To-do List

It is part of the first challenge of Rocketseat programming course.

# Routes and business rules

```
POST /tasks
```

- It should create a task with a title and a description

```
GET /tasks
```

- It should get all tasks created
- It should filter by title or description

```
GET /task/:id
```

- It should get a tasks by ID

```
PUT /tasks/:id
```

- It should update a taks by ID
- It should be possible to update title or description
- It should update only the field sent
- It should validate the ID

```
DELETE /tasks/:id
```

- It should delete a task by ID
- It should validate the ID

```
PATCH /tasks/:id/complete
```

- It should mark as complete the task by ID
- It should validate the ID

```
Import tasks by a CSV file
```

- It should read each line of a CSV file and for each line create a taks using POST /task

# Points of improvement

- Create a Tasks Service to handle database methods
- Use dependecy injection to connect taks Controller and Tasks Service
- Implement tests using a libray like Jest
