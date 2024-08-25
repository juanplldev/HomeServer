# Home Server

This is a simple home cloud project designed to run on a PC and access over a local Wi-Fi network.

## Features

- Browse folders and files
- Search directory by path
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
You will need to know your PC IP adress to access from your local Wi-Fi network.

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

`API_KEY`: Your custom api key.

`JWT_SECRET`: Your custom secret for JWT.

**Client**

`REACT_APP_URL`: Your server url and port (Ex. "http://localhost:3000").

`REACT_APP_HOST`: Your client url (IP) and port (Ex. "http://192.168.x.xx:4000/").

`REACT_APP_API_KEY`: Your same custom api key.
## Run Project

Clone the project

```bash
  git clone https://github.com/juanplldev/HomeServer.git
```

Go to the project directory

```bash
  cd HomeServer
```

**Start server**

Go to the server directory

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

Go to the client directory

```bash
  cd client/web
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## To Do

- [X] Add mobile support.

- [X] Add automatized upload (like a security copy).

## Contact

If you have any feedback, please contact me at juanpablollorentej@gmail.com.