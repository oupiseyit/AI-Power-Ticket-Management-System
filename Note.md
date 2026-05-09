Code with Mosh - Claude Code for Professional Developers
AI Powered Ticket Management System "Build from scratch"

## The Framework ***
 - Define the scope( Title,what's are we building and WHY).
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

## set up prisa to postgresql
```
set up prisa with postgres. connect the app to helpdesk database.
```

## install claude-notifications-go
go to https://github.com/777genius/claude-notifications-go
```
curl -fsSL https://raw.githubusercontent.com/777genius/claude-notifications-go/main/bin/bootstrap.sh | bash

```
Then restart Claude Code and optionally run /claude-notifications-go:settings to configure sounds.

## Choosing an Authentication Strategy (Auth0)

  # How to build Auth
   1 - Managed Server
   2 - 

  # Managed Server
    1 - Auth0       => The problem is cost, lack of control.

  # Build your own
    2 - better-auth => own data cost and control.

  ## Software Engineering DO :
    - What to build
    - How to build it
    - Why that works long term

  + What problem are we solving ?
  + how will this behave at scale ?
  + What happens when it break ?
  + Can others maintain it in 6 months ?

  *** Decision-making is still on us

  ## Build your own (better-auth)
  - How auth works
  - Sessions
  - Tokens
  - Password hashing
  - Role-bashed access


## Choosing a Session Strategy 
  - There 2 approaches of Session: DATABASE, JSON-WEB-TOKEN
# DATABASE Session
   + CLIENT (Cookie k6vx1M)<=> SERVER  Find session (k6vx1M)<=> DATABASE
# JSON-WEB-TOKEN Session
   + CLIENT (Token eyJhbg) <=> SERVER


```
set up better auth with email/password and use database sessions. bare minimum. no ui. aks me any clarifying questions.
```

build the login page. when the user logs in, redirec them to the home page and show the user's name in nav bar along with a sing out button.