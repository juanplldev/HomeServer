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
- [React Native](https://reactnative.dev/)
## Getting Started

### IP Adress
You will need to know your PC IP address to access from your local Wi-Fi network.

### Environment Variables
Add the following environment variables to your `.env` file on each folder (`/api`, `/client/web`, `/client/mobile`).

#### Server

- `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_URL`: Your PostgreSQL credentials.
- `ROOT_PATH`: The file path you choose as the root. (*E.g., `C:\foo\backup`*).
- `PORT`: The port your server will listen on (default: 3000).
- `API_KEY`: Your custom API key for authentication.
- `JWT_SECRET`: Your secret key for JWT authentication.

#### Web Client

- `REACT_APP_API`: The URL and port of your server. (*E.g., `http://localhost:3000`*).
- `REACT_APP_HOST`: The URL (IP) and port of your client. (*E.g., `http://192.168.x.xx:4000`*).
- `REACT_APP_API_KEY`: The same custom `API_KEY` used by the server.

#### Mobile Client

- `API`: The server URL (IP) and port. (*E.g., `http://192.168.x.xx:3000`*).
- `API_KEY`: The same custom `API_KEY` used by the server.
- `API_TOKEN`: The signed token for the authenticated user.
- `WIFI_IP`: The same Wi-Fi IP address your server is connected to. (*E.g., `192.168.0.00`*)
- `DEST_FOLDER`: The folder name on your server where the backup will be stored. (*E.g., `phone`*).

> [!IMPORTANT]
> On the server, the `DEST_FOLDER` must be relative to the `ROOT_PATH`.  
> For example, if your `ROOT_PATH` is *`C:\foo\backup`* and your `DEST_FOLDER` is *`phone`*, then the full path would be *`C:\foo\backup\phone`*.

## Run Project

Clone the project

```bash
  git clone https://github.com/juanplldev/HomeServer.git
```

Navigate to the project directory

```bash
  cd HomeServer
```

#### Start server

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

#### Start web client

Navigate to the web client directory

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

#### Start mobile client

Navigate to the mobile client directory

```bash
  cd client/mobile
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

> [!WARNING]
> The cloud does not distinguish between users; all users created will have access to the same folders.  
> So, remember to re-comment the register route on `api/src/routes/index.js` to prevent an unexpected access.

## To Do

- [X] Add mobile support.

- [X] Add automatized upload (like a security copy).

## Contact

If you have any feedback, please contact me at juanpablollorentej@gmail.com.