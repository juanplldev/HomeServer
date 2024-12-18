# Home Server

This is a home cloud project designed to run on a separate PC and be accessed over a local Wi-Fi network.

> [!IMPORTANT]
> This project is intended to run on a 64-bit Windows system.  
> Its behavior on other operating systems has not been tested.

## Features

- User authentication system.
- Browse folders and files.
- Upload/Download files.
- Edit folders and files.
- Android app for backing up your phone.


## Main Technologies

**Server:**
- [Node](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)

**Client:**
- [React](https://react.dev/)
- [Redux](https://redux.js.org/)
- [Bootstrap](https://getbootstrap.com/)
- [React Native](https://reactnative.dev/)

---

## Before You Start

To ensure the project runs properly, you need to install the following software on your PC beforehand. Otherwise, the project will fail to run.

- **[PostgreSQL](https://www.postgresql.org/)** (Database)  
  Download version **14.15** for your Operating System [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).

- **[Node.js](https://www.postgresql.org/)** (Runtime environment)  
  Download version **20.xx** for your Operating System [here](https://nodejs.org/en/download/prebuilt-installer).

- **[FFMPEG](https://www.ffmpeg.org/)** (Audio and video managment tool)  
  Download the [source code](https://www.ffmpeg.org/download.html), extract it to your preferred location, and create an environment variable pointing to the ffmpeg `bin` folder.  
  ***Example:*** `C:\your-ffmpeg-path\bin`.

- **[Canvas](https://github.com/Automattic/node-canvas/)** (Server-side implementation of the HTML5 Canvas API)  
  Canvas can be tricky to install, depending on your [Operating System](https://github.com/Automattic/node-canvas#installation).  
  For **[Windows](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)**, you need to install the following dependencies:
  
  1. **[Visual Studio 2019 Build Tools](https://learn.microsoft.com/en-us/visualstudio/releases/2019/history#release-dates-and-build-numbers):**  
    Search for version **16.11.42** and select **Build Tools**.  
    During installation, make sure to select the **Desktop development with C++** workload.
  2. **[Python 3.10.11](https://www.python.org/downloads/release/python-31011/):**  
    Scroll to the end and choose the **Windows Installer**.  
    During installation, select "Add python.exe to PATH".  
    Go to "Customize installation" and choose "Install Python 3.10 for all users".
  3. **[GTK2](https://download.gnome.org/binaries/win64/gtk+/2.22/):**  
     Download the `gtk+-bundle` version **2.22.1**.  
     Extract it and create an environment variable pointing to the `bin` folder.  
     ***Example:*** `C:\your-gtk-path\bin`.
  4. **[node-gyp](https://github.com/nodejs/node-gyp/#on-windows):**  
     Install it globally using your package manager:  
     ```bash
     npm i -g node-gyp@11.0.0
     ```

### IP Adress

You will need to know your PC's IP address to access the server from your local Wi-Fi network.

### Environment Variables

Create a `.env` file in each project folder (`/api`, `/client/web`, `/client/mobile`) and add the following environment variables:

#### Server

- `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_URL`: Your PostgreSQL credentials.
- `EXCLUDED_DIRENTS`: Directory entries you want to exclude, separated by commas. ***Example:*** `$RECYCLE.BIN, System Volume Information, .thumbnails`.
- `HOST`: The host where the server will listen (default: `localhost`).
- `PORT`: The port where the server will listen (default: `3000`).
- `API_KEY`: A custom API key for authentication.
- `JWT_SECRET`: The secret key for JWT-based authentication.

#### Web Client

- `REACT_APP_API`: The server's URL and port. ***Example:*** `http://localhost:3000`.
- `REACT_APP_HOST`: The client's URL (IP) and port. ***Example:*** `http://192.168.0.1:4000`.
- `REACT_APP_API_KEY`: The same `API_KEY` used by the server.

#### Mobile Client

- `API`: The server's URL (IP) and port. ***Example:*** `http://192.168.0.1:3000`.
- `API_KEY`: The same `API_KEY` used by the server.
- `API_TOKEN`: A signed token for the authenticated user.
- `WIFI_IP`: The Wi-Fi IP address assigned to your phone. ***Example:*** `192.168.0.10`.
- `DEST_FOLDER`: The folder name on the server where backups will be stored. ***Example:*** `phone`.

> [!IMPORTANT]  
> On the server, `DEST_FOLDER` must be relative to the `filesPath` attribute in the **User model**.  
> ***Example***: If `filesPath` is `C:\foo\backup` and `DEST_FOLDER` is `phone`, the full path will be `C:\foo\backup\phone`.

---

## Run the Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/juanplldev/HomeServer.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd HomeServer
   ```

### Start the Server

1. Navigate to the `api` directory:
   ```bash
   cd api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Start the Web Client

1. Navigate to the `client/web` directory:
   ```bash
   cd client/web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the client:
   ```bash
   npm start
   ```

### Start the Mobile Client

1. Navigate to the `client/mobile` directory:
   ```bash
   cd client/mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the mobile client:
   ```bash
   npm start
   ```

## Create a User

The register route is protected and only accessible to admin users.

To create the first user, you need to **bypass the protection**:

1. Navigate to `/api/src/routes/register.js` and **delete** the `isAdmin` middleware.
2. Go to `/api/src/controllers/userController.js` and set `isAdmin: true` at line 76.

> [!NOTE]  
> When creating a user, you must provide a `filesPath`.  
> `filesPath` will be the root path for the created user's files.  
> *Example:* `C:\foo\backup`.

---

## To-Do List

- [X] Add mobile support.
- [X] Automate file uploads (e.g., phone backups).
- [X] Implement a user authentication system.

---

## Contact

If you have any feedback or suggestions, feel free to contact me at:  
📧 **juanpablollorentej@gmail.com**