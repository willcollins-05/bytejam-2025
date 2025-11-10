# GlobeTrotters

## Festival Builder
The festival builder lets users create customizable festivals using props that represent a variety of cultures.

Currently included:
- Chinese New Year
- Day of the Dead
- Oktoberfest

## How to set up
### Pull the repo 
Pull the repo to your local machine using:

`git clone https://github.com/willcollins-05/bytejam-2025.git`

### Install dependencies 
Run the following command to install dependencies: `npm install`

### Set up local env file
Create a local env file called `.env.local` and use `.env.example` as an example of fields to add. 

`NEXT_PUBLIC_SUPABASE_URL` should be the Supabase database 

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` should be the perishable key shown on Supabase

`SUPABASE_AUTH_EMAIL` should be the email of an authorized user's account

`SUPABASE_AUTH_PASSWORD` should be the password matching the email of the user's authorized account

### Run the app
Run the following command and connect to `localhost:3000` to view the application: `npm run dev`

## What we used
### Front end
![Front end skills](https://skillicons.dev/icons?i=typescript,nextjs,tailwind)

Typescript, NextJS, TailwindCSS

### Back end
![Back end skills](https://skillicons.dev/icons?i=typescript,nextjs,supabase,postgres)

Typescript, NextJS, Supabase, Postgres

### Other
![Other skills](https://skillicons.dev/icons?i=git,github,vercel,vscode)

Git, GitHub, Vercel, VSCode