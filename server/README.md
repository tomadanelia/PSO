# Node.js TypeScript Express Setup

## Step 1 — Initializing the Project

Create a new folder and move into the directory:

```bat
mkdir server
cd server
```

Initialize it as an npm project:

```bat
npm init -y
```

## Step 2 — Configuring the TypeScript Compiler

Create a `tsconfig.json` file in the project root:

Paste the following configuration:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "out",
    "rootDir": "src",
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Step 3 — Creating a Minimal TypeScript Express Server

Install Express, nodemon and TypeScript types:

```bash
npm install express
npm install --save-dev typescript nodemon ts-node @types/express @types/node
```

Create a `src` folder and a `app.ts` TypeScript file and add the following code:

```typescript
import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
```

## Step 4 — Updating the package.json File

Edit package.json to add npm start script:

```json
{
  "name": "minimal-express-server",
  "version": "1.0.0",
  "description": "Minimal Express TypeScript Server",
  "main": "app.ts",
  "scripts": {
    "start": "nodemon src/app.ts", // only this is added
    "build": "tsc"
  },
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.11.17",
    "nodemon": "^3.1.9",
    "typescript": "^5.3.3"
  }
}
```

start project using:

```bat
npm start
```

You should see:

```
Express is listening at http://localhost:8000
```

Visiting http://localhost:8000 in a browser should display "Hello World!".
You now have a Node.js project set up with TypeScript. Enjoy developing!
