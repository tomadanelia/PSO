# Node.js TypeScript Express Setup

## Step 1 — Initializing the Project

Create a new folder and move into the directory:

```bash
mkdir server
cd server
```

Initialize it as an npm project:

```bash
npm init
```

## Step 2 — Configuring the TypeScript Compiler

Install TypeScript as a development dependency:

```bash
npm install --save-dev typescript
```

Create a tsconfig.json file in the project root:

Paste the following configuration:

```bash
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmit": true,
    "types": ["node"],
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "incremental": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Key Configurations:

- allowImportingTsExtensions: Ensures .ts extensions are required in imports.
- verbatimModuleSyntax: This avoids altering your import/export syntax. By using --experimental-strip-types, you can bypass tools like Babel, SWC, Webpack, or TSX, streamlining your toolchain significantly.

## Step 3 — Creating a Minimal TypeScript Express Server

Install Express and its TypeScript types:

```bash
npm install --save express
npm install --save-dev @types/express
```

Create a `src` folder and a TypeScript file and add the following code:

```bash
import express from 'express';
const app = express();
const port = 3001;

app.get('/', (req, res) => {
res.send('Hello World!');
});

app.listen(port, () => {
console.log(`Express is listening at http://localhost:${port}`);
});
```

Compile the TypeScript to JavaScript:

```
npx tsc
```

Run the compiled JavaScript:

```
node dist/app.js
```

You should see:

```
Express is listening at http://localhost:3001
```

Visiting http://localhost:3001 in a browser should display "Hello World!".

## Step 4 — Updating the package.json File

Edit package.json to add npm scripts:

```bash
{
"name": "node_project",
"version": "1.0.0",
"main": "dist/app.js",
"scripts": {
"start": "tsc && node dist/app.js",
"start:dev": "node --watch index.ts",
"test": "echo \"Error: no test specified\" && exit 1"
},
"devDependencies": {
"@types/express": "^4.17.1",
"@typescript-eslint/eslint-plugin": "^5.4.0",
"@typescript-eslint/parser": "^5.4.0",
"eslint": "^8.3.0",
"typescript": "^4.5.2"
},
"dependencies": {
"express": "^4.17.1"
}
}
```

start: Compiles TypeScript and runs the app using Node.js

You can run these commands using:

```
npm run start
```

You now have a Node.js project set up with TypeScript. Enjoy developing!
