<h1 align="center">
  <img width="280px" alt="LetMeAsk" title="LetMeAsk" src=".github/logo.png" />
</h1>


# :computer: About

LetMeAsk is a realtime Q&A application developed as the project for the React path during Rocketseat's Next Level Week 6th edition. 

## :wrench: Tech stack

![Badge](https://img.shields.io/badge/-Typescript-efefef?style=for-the-badge&logo=typescript&logoColor=3178C6")
![Badge](https://img.shields.io/badge/-firebase-efefef?style=for-the-badge&logo=firebase&logoColor=FFCA28)
![Badge](https://img.shields.io/badge/-chakraUI-efefef?style=for-the-badge&logo=chakraui&logoColor=319795)
![Badge](https://img.shields.io/badge/-nextjs-f3f3f3?style=for-the-badge&logo=next.js&logoColor=000)

# :rocket: Running the app

Clone the repo by running on your terminal

```bash
$ git clone git@github.com:aadelgrossi/nlw6-react.git
```

Install dependencies running:
```bash
$ yarn install
```

Configure the following environment variables (use .env.example for reference). You must create a Firebase account along with a new project, enabling Authentication and Realtime Database services

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

Start the server by running:

    yarn dev

Point your browser to [`localhost:3000`](http://localhost:3000).

## :heavy_check_mark: TODO

- [] Create 404 (not found) and 403 (forbidden) pages
- [] Configure and restrict permissions on /admin page (allow access only if author is currently authenticated)
- [] Dark theme + toggle
- [] Deploy + live demo


[MIT License](https://github.com/aadelgrossi/nlw6-react/LICENSE) ® [Andre Grossi](https://github.com/aadelgrossi)

