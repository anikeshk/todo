# todo

A simple todo application built using Node.js and TypeScript.

This project has been developed to act as a **reference** for the CS 4530 "husksheets" project. It provided a basic structure for the code, and has the following features which are part of the "husksheets" project specification:

1. xxx

The following features are required by the "husksheets" project specification, but are not implemented in this project:

1. xxx

If you have questions about this project, contact Anikesh G Kamath (email: kamath.ani@northeastern.edu or on Teams).

---

**Pending Features**

1. Projects: bucketing tasks under projects or folders
2. Due Dates: assigning due dates (and start dates/end dates) to tasks
3. Today and upcoming views: views to show the tasks due today and upcoming tasks
4. Task Assignment: assigning tasks to different users
5. Email reminders: reminders for tasks via email
6. Stats: statistics or dashboard for completed tasks and productivity

**Technical Debt**

1. Handling database errors
2. Custom Express.Request interface to handle auth more cleanly
3. Logging system using winston or similar library
4. User auth sessions using JWT
5. Guarded routes

**Limiting Design Choices**

1. API routes have only one version (as compared to a /v1, /v2 etc.)