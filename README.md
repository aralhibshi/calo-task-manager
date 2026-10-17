# Calo Task Manager

A full-stack task manager where users sign up, create teams, add other users to them, and create and track tasks
for each team. I built it on my own in July 2023, as a training project during my software engineering internship
at [Calo](https://calo.app).

It's an Express and MongoDB API in TypeScript, with a React and TypeScript frontend. More
about my work is on my [portfolio](https://ahmedalhibshi.dev).

## What it does

- **Accounts.** Sign up and sign in, with passwords hashed using bcrypt and a signed JWT returned on sign-in. The
  frontend stores the token and uses it to show the right navigation and pages.
- **Teams.** Create, edit and delete teams. The creator is recorded as the team's owner, and other users can be added as members.
- **Tasks.** Create tasks for one of your teams, then update their status or delete them.
- **Profile.** A page with the signed-in user's details and how many teams and tasks they have.

Lists refetch after every create, edit and delete, and the UI confirms each action with a toast.

## Data model

Three Mongoose models with references between them:

- **User**: name, email (unique) and hashed password, plus the user's teams and tasks.
- **Team**: name and description, and its members, each flagged as owner or not.
- **Task**: title, description and status (`Pending` by default), the team it belongs to, and its users.

Each model has length validation and timestamps.

## Project structure

```
task-manager-backend/src/
├── server.ts        Express setup, sessions and the MongoDB connection
├── routes/          auth, user, team and task routes
├── controllers/     the logic behind each route
├── models/          Mongoose schemas and their TypeScript interfaces
└── lib/             Passport setup and JWT verification middleware

task-manager-frontend/src/
├── components/      user, team and task pages (create, edit, list)
├── customHooks/     data fetching: the user's details, teams and tasks, and other users
├── contexts/        the signed-in user, shared through React context
└── interfaces/      shared types
```

## Stack

**Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, bcrypt, JSON Web Tokens.
**Frontend:** React 18, TypeScript, React Router, Axios, React Bootstrap, MDB React UI Kit, Tailwind CSS, React Toastify.

## Known limitations

It was a quick training project, and there are things I'd do differently now:

- **The API doesn't check the token.** The JWT middleware ([`isLoggedIn.ts`](task-manager-backend/src/lib/isLoggedIn.ts))
  is written but never applied to the routes, and requests identify the user by an id in the query string. Protecting
  the routes with the middleware and reading the user from the verified token would fix both.
- **Team ownership isn't enforced.** Owners are recorded, but any user can edit or delete a team.
- **No tests**, and unused leftovers such as the Passport local strategy.

## Running it locally

You'll need Node.js and a MongoDB database (local or Atlas).

**Backend.** Create `task-manager-backend/.env`:

```bash
PORT=4000
SECRET=any-long-random-string
MONGOLOCAL=mongodb://localhost:27017/task-manager
```

Then:

```bash
cd task-manager-backend
npm install
npm start
```

**Frontend.** It proxies API requests to `http://localhost:4000`:

```bash
cd task-manager-frontend
npm install
npm start
```
