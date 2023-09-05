# Task Summary

## Description
Build a full-stack restaurant application that allows a manager to view the schedule of cooks and waiters working at the restaurant for each day of the week (Monday to Friday). The application consists of a backend, frontend, and uses a MongoDB database.

## Database
- MongoDB is used as the database.
- The database has one table named "staff."
- Two records, "cooks" and "waiters," are available with relevant weekly worker data.

## Backend
- The backend is built using Fastify, a NodeJS framework.
- On startup, the backend loads the attached JSON files into the MongoDB database.
- Provides two REST APIs: `/GetCooks` and `/GetWaiters`.
- Each API returns JSON data, and the data structure for these APIs is provided in separate files.

## Frontend
- The frontend is built using React.
- The frontend has two pages: `/Waiters` and `/Cooks`.

## Pages
Each page (Waiters and Cooks) contains the following elements:
- Page title: "Cooks" or "Waiters."
- Day title: Displays the currently selected day (e.g., Monday, Tuesday).
- Staff list: Displays the relevant staff (cooks or waiters) for the selected day (e.g., Monday or Tuesday).
- Navigation buttons: Two buttons labeled "Next" and "Prev" for switching between days.
  - The "Prev" button is disabled when on the "Monday" page.
  - The "Next" button is disabled when on the "Friday" page.

## Page Navigation
- The Waiters page has a button labeled "Cooks," which navigates to the `/Cooks` page.
- The Cooks page has a button labeled "Waiters," which navigates to the `/Waiters` page.
- When navigating between pages, the displayed day remains the same (e.g., if viewing Tuesday cooks and navigating to waiters, the waiters page will display the waiters for Tuesday without resetting to Monday).
