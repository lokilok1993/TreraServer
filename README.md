# Server

## "start": "node index.js",
## "dev": "nodemon index.js"


## api documentation

#### Auth

* POST `http://localhost:3001/auth/login`
* POST `http://localhost:3001/auth/singUp`

#### Project

* GET `http://localhost:3001/projects/get-all`
* POST `http://localhost:3001/projects/create-project`
    - `name`
    
* DELETE `http://localhost:3001/projects/delete-project`
    - `project_id`


#### Column

* GET `http://localhost:3001/columns/get-project-columns/:projectId`
* POST `http://localhost:3001/columns/create-column`
    - `name`
    - `position`
    - `project_id`


#### Card
* GET `http://localhost:3001/get-column-cards/:columnId`
* POST `http://localhost:3001/card/create-card`
  - `name`
  - `summery`
  - `description`
  - `column_id`

* POST `http://localhost:3001/card/update-card`
    - `name`
    - `summery`
    - `description`
    - `column_id`

* DELETE `http://localhost:3001/card/delete-card/:cardId`
