Code with Mosh - Claude Code for Professional Developers
AI Powered Ticket Management System "Build from scatch"

## The Framework ***
 - Define the scope(title,what's are we building and WHY).
 - Clarify the requirement ( What Is exactly the project do)
 - Define the MVP (Minimum Viable Product in business, which is a version of a new product with just enough features to satisfy early adopters and  provide feedback for future development).
 - Choose the tech stack (tool and technology)
 - Create the implementation plan (what's do we build first,second,third).

##  PROBLEMS **
 - Humans don's like canned answers
 - This process is slow

## Quick Thinking solution ***
 - AI classified the ticket
 - Can this be auto-resolved?
 - Yes -> Human-friendly response
 - No  -> Assign to an agent

+ Clarifying the Requirements
```
Read @project-scope.md. Review it and ask me clarifying questions. Help me find gaps or thinks I haven't through through.

tickets can have a few statues: open, resolved and closed.

tickets can belong to a single category: general question, technical question, refund request.

the system should be deployed with an admin. the admin can create additional agents.

update the project scope document with these changes.

```

## Defining the MVP
What goes in version 1.0 ?
MVP (Minimum Viable product) is the simplest version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least effort.

+ FACTORS
  - Timeline
  - Budget
  - Team structure
  - Constraints

## Choosing the Tech stack
```
suggest a tech stack for this projects.

- Fontend use: react with Typescript 
- backend use: Notes.js with Express and Typescript 
- add docker.

use database sessions for authentication. 
and store this in tech-stack.md
```

## Creating an Implementation Plan
```
create an implementation plan. break the project into small tasks and group them into phases.
```

## Setting up the project
```
Create a full-stack project with express, react, typescript and bun. use context7 for up-to-date docs.

run both app

in client app http://localhost:5173, in app component, write code to call healthcheck api and display a message.
```

## set up database
go to https://www.postgresql.org/download/