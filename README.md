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

## Additional Tools Used
- Postbird
- Postman
- React Dev Tools
- Git

## Getting Started
To use this application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project and run 'npm install' to install dependencies.
3. Navigate to the server.
4. Copy the database.sql file and run it in psql to set up the Postgres DB.
5. Run the command 'node index' to start the server.
6. Navigate to the client folder.
7. Run the command 'npm start' to start the React client.
8. Navigate to `http://localhost:3000` to use the application.

## Bugs
1. The same exercise can appear twice. Currently planning changes to the exercise schema which will help fix this issue before making front-end changes.

## Future Features
1. The 'Legs' part of the database is currently filled with mock data.
2. Some exercises still yet to be included.
3. Rework exercise schema.
4. Currently makes 5 seperate API calls. This was initially to provide maximum flexibility for exercise selection. This will be reviewed after the exercise schema is updated.
5. The exercise ID's are displayed in the journal to save space. Change this to allow the full name to show.
6. Add support for Abs?

## Developer Note
This is my first full-stack PERN app. I will be coming back to add on to this project as I develop my skills and a deeper understanding of app development. Anybody please feel free to reach out to me with any comments, criticisms, or just to connect!

## Author
- John Crow (https://github.com/johncrow86)