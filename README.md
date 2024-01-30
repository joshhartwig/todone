# Todone

![example image](https://github.com/joshhartwig/todone/blob/84292a96197a891a34062fddfea128d760b14d85/images/todone.png)
This project started as a super simple barebones todo app. The bones of which you build in [Scott Hendrix's FrontEndMaster's Course](https://frontendmasters.com/courses/next-js-v3/). I took those bones and found a design inspiration on [dribbble.com](https://dribbble.com/search/todo-website). I took those bones and tacked on features like animation, database storage, server actions, data validation, tailwind, filtering. I am happy with the result and have a few more features to add before I wrap things up.

## Getting Started

Run the dev server

```bash
npm run dev
```

## Features

- Server actions for handling form input
- Zod for type safety and form verification
- Tailwind for styling
- Prisma & SQLlite for ORM and database
- Download of todos via JSON from /api/todos (need to add csv option)
- Filter by tag

## Todo (no pun intended)

- Add priority & due date
- Add sorting (name, completed, date)
- Light and Dark mode toggle
- Loading animation
- UI for when data does not exist

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app. The app will initialize an empty sqlite database. 

## Dependencies

I used the following tools, packages, etc.. to build this app

- [Next.js](https://nextjs.org/) - The core framework
- [Typescript](https://typescript.org) - The language
- [Prisma](https://nextjs.org/learn) - ORM and database tooling
- [Shadcn UI](https://nextjs.org/learn) - Amazing lightweight UI components
- [Zod](https://nextjs.org/learn) - Data validation and much more