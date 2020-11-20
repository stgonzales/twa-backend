## Ticket Web App API

Created By: Stephen Goncalves

Status: In Progress 🙌

# Overview

This API has been created to serve as back-end to the [TWA](https://github.com/stgonzales/twa) app.

### Technologies used

- NodeJs
- Docker
- TypeScript
- Postgres

### Purpose

With my past professional experiences, I notice gaps regarding internal and external tickets. So I decided to conciliate my studies with web development and created the Ticket Web App. I intend to apply all my knowledge acquired over time and solve these gaps with my personal opinion.🚀

# How to use

1. Clone this repo:

`git clone git@github.com:stgonzales/twa-backend.git`

2. Go to **twa-backend** folder and install all dependecies just executing `yarn`.  

3. Make sure you have ***Postgres*** pre-installed locally with all the credentials bellow:

```
"username": "postgres",
"password": "docker",
"database": "twa",
```

> *If you want to use your own Postgres instance just change the **ormconfig.json** with details*
>
> *I used a docker ***Postgres*** image, feel free to use the way you want*


4. Execute the migrations command:

`yarn typeorm migration:run`

5. Import the Insomnia Workspace JSON file into Insomnia. 

> *Make sure to install [Insomnia Core](https://insomnia.rest/) first.*

6. Run the server:

`yarn run dev:server`

7. Play around with the requests!

>*Remember that this is a Work in Progress so bugs/no working feature is expected*