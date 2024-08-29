# Home Server

This is a home cloud project designed to run on a separate PC and access over a local Wi-Fi network.

## Features

- Browse folders and files
- Simple login system
- Upload/Download files
- Edit/delete file names
- Create/Edit/Delete folder names


## Main Technologies

**Server:** 
- [Node](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)

**Client:**
- [React](https://react.dev/)
- [Redux](https://redux.js.org/)
- [Bootstrap](https://getbootstrap.com/)
## Getting Started

### IP Adress
You will need to know your PC IP address to access from your local Wi-Fi network.

### Environment Variables
Add the following environment variables to your .env file.

**Server**

`DB_USER`
`DB_PASSWORD`
`DB_HOST`
`DB_URL`
: Your PostgreSQL credentials.

`ROOT_PATH`: The file path you choose for root (Ex. "C:\Users\foo").

`PORT`: Your localhost port (default: 3000).

`API_KEY`: Your custom API key.

`JWT_SECRET`: Your custom secret for JWT.

**Client**

`REACT_APP_URL`: Your server url and port (Ex. "http://localhost:3000").

`REACT_APP_HOST`: Your client url (IP) and port (Ex. "http://192.168.x.xx:4000/").

`REACT_APP_API_KEY`: Your same custom API key.

## Run Project

Clone the project

```bash
  git clone https://github.com/juanplldev/HomeServer.git
```

Navigate to the project directory

```bash
  cd HomeServer
```

**Start server**

Navigate to the server directory

```bash
  cd api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

**Start client**

Navigate to the client directory

```bash
  cd client/web
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm start
```

## Create user

Navigate to `api/src/routes/index.js` and uncomment the register route (L14).

With this route enabled you will have access to `your_client_url/register`.

> **_NOTE:_** The cloud does not distinguish between users; all users created will have access to the same folders.
> So, remember to re-comment the register route on `api/src/routes/index.js` to prevent unexpected access.

## To Do

- [X] Add mobile support.

- [X] Add automatized upload (like a security copy).

## Contact

If you have any feedback, please contact me at juanpablollorentej@gmail.com.