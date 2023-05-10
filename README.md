# Exercise Shuffler

## Introduction
This is a web application where users can shuffle a random workout based on some chosen criteria. The exercises in the database were chosen because they provide the most effective hypertrophy with the least downside for their designated area. The shuffle protocol then selects an appropriate mixture of exercises in a specific order for an optimal and fun workout.

The application also provides a workout log which allows users to log the currently selected workout excercise routine. The journal allows the user to enter or modify a note for any given workout to keep track of additional details. Journal entries may also be deleted.

## Technologies Used
- PostgreSQL
- Express
- React
- Node.js
- Bootstrap
- React Router

## Additional Tools Used
- Postbird
- Postman
- React Dev Tools
- Git
- dbdiagram.io

## Getting Started
To use this application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project and run 'npm install' to install dependencies.
3. Copy the database.sql file and run it in psql to set up the Postgres DB.
4. Navigate to the server.
5. Run the command 'node index' to start the server. Script set will also allow 'npm start'.
6. Navigate to the client folder.
7. Run the command 'npm start' to start the React client.
8. Navigate to `http://localhost:3000` to use the application.

## Future Features
1. The 'Legs' part of the database is currently filled with mock data.
2. Some exercises still yet to be included.
3. Rework exercise schema.

## Developer Note
This is my first full-stack PERN app. I will be coming back to add on to this project as I develop my skills and a deeper understanding of app development. Anybody please feel free to reach out to me with any comments, criticisms, or just to connect!

## Author
- John Crow (https://github.com/johncrow86)

## ChangeLog
v1.3
- added background image
- split and rep range buttons will now visibly show the active state

v1.2
- refactored alot of the front end code
- added React Router
- added Context for the journal
- created a routes folder with a new root, home, and journal entry page on client side
- created a routes folder with exercises and journal on server side
- added a new route to /journal/:id to view an entry and add a note
- added (test) validation for updating a note on client and server side
- removed the add note button with view journal
- changed all the api calls to try/catch from .then chains

- added a new server route to retrieve a single journal entry

bug fixes
- delete journal properly removes it from the list (bug introduced in 1.1)
- can no longer save to journal until a workout is populated

v1.1
- added additional constraints to the data tables
- added a role to the database
- renamed database.sql to db.sql and moved to new folder db
- renamed db.js to index.js and moved to new folder db

- renamed index.js to server.js
- in server.js renamed pool to db
- added /api/v1 to endpoints and status codes
- updated responses to a more proper form
- added response on failure
- added dotenv environment variables to server
- added start script

- added enpoint to retrieve by split only

bug fixes
- same exercise will no longer appear twice