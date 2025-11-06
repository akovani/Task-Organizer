# TaskOrganizer

## Requirements

- [nodejs](https://nodejs.org/en/download) v20.10.0

## Setup

1. clone the repository

    ```bash
    git clone https://github.com/PascaII/task-organizer.git
    ```

2. replace the firebaseConfig in src/database/firebase-config.js with your own secrets.

3. install the dependencies

    ```bash
    npm i
    ```

4. start the project

    ```bash
    npm start
    ```

## Gitlab Variables

The project is currently based on Gitlab CI/CD, but I might migrate it to Github Actions in the future.

| Variable | Description                |
|----------|----------------------------|
| $FIREBASE_TOKEN | [Firebase](https://firebase.google.com/) to deploy from console|
| $REACT_APP_ENV | either "preprod" or "prod" defines deployment environment |
| $SNYK_TOKEN | [Snyk](https://vercel.com/) token to analyze for vulnerabilites |
| $VERCEL_TOKEN | vercel token if you want to deploy to [Vercel](https://vercel.com/) |
| all $REACT_APP_FIREBASE... variables | either replace them in the code or add them as variables too|