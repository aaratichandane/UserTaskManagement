# User Task Management with Node.js-Express-MongoDB-Angular Application

This is a user task management Node.js CRUD application.

This Node.js CRUD code use:

+ Express.js framework
+ mongoose ORM
+ AngularJS for frontend

### Configuration

**Start MongoDB server**

```
sudo service mongod start
```

**Check MongoDB server status**

```
sudo service mongod status
```

**Go to MongoDB shell**

```
mongod
```

**Show databases**

```
show dbs
```

**Create database named "UserDB"**

```
use test
```

### How to run

	npm install
	node server.js -e dev
Note: -e dev arguments are optional

### Operation Supported
+ Create User
+ Get user by user id
+ Create Task for a user
+ Fetch all task of a user
+ Add new task for a User
+ Update task added by a user
+ Delete task added by a user

Todo all above task we will need a token. At the time of application booting we have added default admin user in the system.
Using that default user which is already present in the system will get the token for the first time. Once we get that we can then create our own user and using that created user we can log into the system and will perform all the operations.

### Get access token
#### Request:

	`POST /api/auth/login HTTP/1.1
     Host: localhost:3000
     Content-Type: application/json
     Cache-Control: no-cache
     Postman-Token: ef43d369-dae8-88c3-6b61-78892183a349
     
     {
     	"email":"admin@testdomain.com",
     	"password":"admin"
     }`
     
#### Reponse:
    `{
     "auth": true,
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODMwODQwNDB9.0jtsoCfyji6XlxOGsd9w5XPB2wzOEqgBVDshVutmnzg"
    }`
 
### Create user
#### Request:

	`POST /api/users HTTP/1.1
     Host: localhost:3000
     Content-Type: application/json
     x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMSwiaWF0IjoxNTgzMDY4MjYxfQ.HJXzvdwNZ9KOcQQ-u_ApFsw1lPbpkg7ud8UO2MjK1eM
     Cache-Control: no-cache
     Postman-Token: 9d9e8e13-d7a6-2f52-b3d0-3c940bbb055f
     
     {
     	"firstName":"Arti",
     	"userId":102,
     	"lastName":"Candane",
     	"password":"test",
     	"email":"arti@testdomain.com",
     	"tasks":[
     		{
     			"name":"Task1",
     			"startDate":"2020-03-02",
     			"endDate":"2020-03-07",
     			"description":"Should have milk, banana, almonds ect in the breakfast"
     		},
     			{
     			"name":"Task2",
     			"startDate":"2020-03-07",
     			"endDate":"2020-03-09",
     			"description":"Vist sinhagad fort"
     		}
     		]
     }`
     
#### Reponse:
    `{
         "data": {
             "_id": "5e5bfa46381f5defa4f477ca",
             "tasks": [
                 {
                     "_id": "5e5bfa46381f5defa4f477cb",
                     "name": "Task1",
                     "startDate": "2020-03-02T00:00:00.000Z",
                     "endDate": "2020-03-07T00:00:00.000Z",
                     "description": "Should have milk, banana, almonds ect in the breakfast"
                 },
                 {
                     "_id": "5e5bfa46381f5defa4f477cc",
                     "name": "Task2",
                     "startDate": "2020-03-07T00:00:00.000Z",
                     "endDate": "2020-03-09T00:00:00.000Z",
                     "description": "Vist sinhagad fort"
                 }
             ],
             "userId": 102,
             "firstName": "Arti",
             "email": "arti@testdomain.com",
             "lastName": "Candane",
             "__v": 0
         },
         "message": "User created successfully"
     }`

### Add task to the user
       #### Request:
       
       	`POST /api/users/102/tasks HTTP/1.1
            Host: localhost:3000
            Content-Type: application/json
            x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMSwiaWF0IjoxNTgzMDY4MjYxfQ.HJXzvdwNZ9KOcQQ-u_ApFsw1lPbpkg7ud8UO2MjK1eM
            Cache-Control: no-cache
            Postman-Token: c857bfa9-0b92-17ff-d9ec-c6b470f7ef10
            
            {
            	"tasks":[
            		{
            			"name":"Test3",
            			"startDate":"2020-02-29",
            			"endDate":"2020-01-12",
            			"description":"Sample test task created"
            		}
            		]
            }`
            
       #### Reponse:
           `{
                "message": "Task added for the user successfully"
            }`

### Get all tasks of a user
#### Request:

	`GET /api/users/102/tasks HTTP/1.1
     Host: localhost:3000
     x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODMwNzA3NjF9.OhDkV4orYj18K_VsUJGc27m2eseiqyKo6FlHbzTvPkY
     Cache-Control: no-cache
     Postman-Token: bedd7619-8fc3-cd08-8128-c6cba461f94c
`
     
#### Reponse:
    `{
         "data": {
             "_id": "5e5bfa46381f5defa4f477ca",
             "tasks": [
                 {
                     "_id": "5e5bfa46381f5defa4f477cb",
                     "name": "Task1",
                     "startDate": "2020-03-02T00:00:00.000Z",
                     "endDate": "2020-03-07T00:00:00.000Z",
                     "description": "Should have milk, banana, almonds ect in the breakfast"
                 },
                 {
                     "_id": "5e5bfa46381f5defa4f477cc",
                     "name": "Task2",
                     "startDate": "2020-03-07T00:00:00.000Z",
                     "endDate": "2020-03-09T00:00:00.000Z",
                     "description": "Vist sinhagad fort"
                 },
                 {
                     "_id": "5e5bfaad381f5defa4f477cf",
                     "name": "Test3",
                     "startDate": "2020-02-29T00:00:00.000Z",
                     "endDate": "2020-01-12T00:00:00.000Z",
                     "description": "Sample test task created"
                 }
             ],
             "userId": 102,
             "firstName": "Arti",
             "email": "arti@testdomain.com",
             "lastName": "Candane",
             "__v": 1
         },
         "message": "User tasks fetched successfully"
     }`


### Get user's task by task name 
       #### Request:
       
       	`GET /api/users/102/tasks?name=Task1 HTTP/1.1
         Host: localhost:3000
         x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODMwNzA3NjF9.OhDkV4orYj18K_VsUJGc27m2eseiqyKo6FlHbzTvPkY
         Cache-Control: no-cache
         Postman-Token: 1436def5-553b-aec4-e6fc-c77f609d0b93`
            
       #### Reponse:
           `{
                "data": {
                    "_id": "5e5bfa46381f5defa4f477cb",
                    "name": "Task1",
                    "startDate": "2020-03-02T00:00:00.000Z",
                    "endDate": "2020-03-07T00:00:00.000Z",
                    "description": "Should have milk, banana, almonds ect in the breakfast"
                },
                "message": "User tasks fetched successfully"
            }`

### Update task
       #### Request:
       
       	`PATCH /api/users/102/tasks?name=Task1 HTTP/1.1
         Host: localhost:3000
         Content-Type: application/json
         x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMSwiaWF0IjoxNTgzMDY4MjYxfQ.HJXzvdwNZ9KOcQQ-u_ApFsw1lPbpkg7ud8UO2MjK1eM
         Cache-Control: no-cache
         Postman-Token: 77ebeedb-9564-8dcd-0a3e-d747abd83176
         
         {
         	"description":"Update Task1 description "
         }`
            
       #### Reponse:
           `{
                "data": {
                    "_id": "5e5bfa46381f5defa4f477cb",
                    "name": "Task1",
                    "startDate": "2020-03-02T00:00:00.000Z",
                    "endDate": "2020-03-07T00:00:00.000Z",
                    "description": "Update Task1 description "
                },
                "message": "Task updated successfully"
            }`


### Delete task
       #### Request:
       
       	`DELETE /api/users/102/tasks?name=Task1 HTTP/1.1
         Host: localhost:3000
         x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODMwNzA3NjF9.OhDkV4orYj18K_VsUJGc27m2eseiqyKo6FlHbzTvPkY
         Cache-Control: no-cache
         Postman-Token: 50e49502-23ef-acec-9fef-d82ea49b3aad
         Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
         `
            
       #### Reponse:
           `{
                "data": null,
                "message": "Task deleted "
            }`
