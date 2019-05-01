# RESTful Routing

### Introduction
* Define REST and explain why it matter
* List all 7 RESTful routes
* show example of RESTful routing in practing.

### RESTful Routing
* a mapping between HTTP and CRUD
* CRUD == Create Read Update Delete
* 

### 7 Restful routes

| No.   | Name    | Path         | HTTP Verb   | Purpose |
|-------|---------|--------------|-------------|---------|
| 1. | Index | /dogs | GET | List all dogs |
| 2. | New | /dogs/new | GET | Show new dog |
| 3. | Create | /dogs | POST | create a new dog and then redirect somewhere |
| 4. | Show | /dogs/:id | GET | Show info about one specific dog |
| 5. | Edit | /dogs/:id/edit | GET | show edit form for one dog |
| 6. | Update | /dogs/:id | PUT | Update a particular dog, then redirect somewhere |
| 7. | Destroy | /dogs/:id | DELETE | Delete a particular dog, then redirect somewhere |


