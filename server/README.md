# Setting Up a TypeScript Project for 6.102

Follow these steps to set up your Node project with TypeScript, Express, and ESLint.

## Step 1 — Initializing the Project

To get started, create a new folder named `node_project` and move into that directory:

```bash
mkdir node_project
cd node_project
Use code with caution.
Markdown
Next, initialize it as an npm project:

npm init -y
Use code with caution.
Bash
The -y flag tells npm init to automatically say “yes” to the defaults. You can always update this information later in your package.json file.

Step 2 — Configuring the TypeScript Compiler
Now that your npm project is initialized, you are ready to install and set up TypeScript.

Run the following command from inside your project directory to install TypeScript:

npm install --save-dev typescript
Use code with caution.
Bash
You should see output similar to:

added 1 package, and audited 2 packages in 1s

found 0 vulnerabilities
Use code with caution.
Text
TypeScript uses a file called tsconfig.json to configure the compiler options for a project. Create a tsconfig.json file in the root of the project directory:

nano tsconfig.json
Use code with caution.
Bash
Then paste in the following JSON:

tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "lib": ["es2015"]
}
Use code with caution.
Json
Key configurations in tsconfig.json:

module: Specifies the module code generation method. Node uses commonjs.

target: Specifies the output language level.

moduleResolution: This helps the compiler figure out what an import refers to. The value node mimics the Node module resolution mechanism.

outDir: This is the location to output .js files after transpilation. In this tutorial, you will save it as dist.

For more details, refer to the official TypeScript documentation.

Step 3 — Creating a Minimal TypeScript Express Server
Now, it is time to install the Express framework and create a minimal server:

npm install --save express@4.17.1
npm install --save-dev @types/express@4.17.1
Use code with caution.
Bash
The second command installs the Express types for TypeScript support. This is required because TypeScript and Express are independent packages.

Next, create a src folder in the root of your project directory:

mkdir src
Use code with caution.
Bash
Then create a TypeScript file named app.ts within it:

nano src/app.ts
Use code with caution.
Bash
Open up the app.ts file and paste in the following code snippet:

src/app.ts
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
Use code with caution.
TypeScript
To run the app, you first need to compile it to JavaScript using the following command:

npx tsc
Use code with caution.
Bash
This will output the JavaScript to the dist directory.

Run the JavaScript output with node:

node dist/app.js
Use code with caution.
Bash
If it runs successfully, you should see:

Output
Express is listening at http://localhost:3000
Use code with caution.
Text
Now, visit http://localhost:3000 in your browser and you should see the message:

Output
Hello World!
Use code with caution.
Text
You can examine the transpiled JavaScript in dist/app.js:

dist/app.js
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map
Use code with caution.
JavaScript
Step 4 — Configuring Typescript Linting with eslint
Now configure TypeScript linting for the project. First, install eslint using npm:

npm install --save-dev eslint
Use code with caution.
Bash
Then, run eslint’s initialization command to interactively set up the project:

npm init @eslint/config@latest
Use code with caution.
Bash
Answer the following questions during initialization:

How would you like to use ESLint?: To check syntax and find problems

What type of modules does your project use?: JavaScript modules (import/export)

Which framework does your project use?: None of these

Does your project use TypeScript?: Yes

Where does your code run?: Node

What format do you want your config file to be in?: JavaScript

Would you like to install them now with npm?: Yes

This will create a .eslintrc.js configuration file.

Run the linter to check TypeScript files:

npx eslint . --ext .ts
Use code with caution.
Bash
Step 5 — Updating the package.json File
Update package.json to add convenient npm scripts for linting and running your project.

Open package.json and update the scripts section as follows:

package.json
{
  "name": "node_project",
  "version": "1.0.0",
  "description": "",
  "main": "dist/app.js",
  "scripts": {
    "start": "tsc && node dist/app.js",
    "lint": "eslint . --ext .ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
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
Use code with caution.
Json
You have now successfully set up your Node project with TypeScript, Express, and ESLint! You can use npm run start to compile and run your server, and npm run lint to check your code for style and potential errors.

This README.md is now well-structured, formatted with Markdown for readability, and contains all the necessary steps in a clear, easy-to-follow way for your students!
Use code with caution.
```
