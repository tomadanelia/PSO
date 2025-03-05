Welcome to Problem Set 1!

Here's your starting project structure and code. Follow these steps to get set up and begin working on the problem set:

* Run npm install: Open a terminal, navigate to your ps1-flashcards directory, and run npm install. This will install all the necessary packages for the project.

* Open in VS Code: Open the ps1-yourusername folder in VS Code.

* Explore the Files: Take a look at the generated files:

* src/algorithm.ts: This is where you will implement the flashcard algorithm functions. Read the TypeDoc comments for each function to understand their specifications.

* test/algorithmTest.ts: This is where you will write your Mocha tests for the functions in algorithm.ts.

* src/utils.ts & test/utilsTest.ts: These are for optional utility functions and their tests. You likely won't need them for PS1 initially, but they are there for good practice.

* flashcards.ts: DO NOT MODIFY THIS FILE. It defines the Flashcard, AnswerDifficulty, and BucketMap types that you will use throughout the problem set.


Start with algorithm.ts and test/algorithmTest.ts:

* Read the Specifications: Carefully read the TypeDoc comments in src/algorithm.ts to understand the specifications of each function.

* Write Tests First: Open test/algorithmTest.ts and start writing your Mocha tests before implementing any of the functions. Use the provided describe and it blocks as a starting point. Remember to write your testing strategy as a comment at the top of the file.

* Implement Iteratively: Implement the functions one by one, starting with toBucketSets and getBucketRange. Follow the test-first programming workflow: Spec -> Test -> Implement -> Commit.

* Run Tests Frequently: Use npm test in the terminal to run your tests and see your progress.

* Commit and Push Regularly: Use git add, git commit, and git push to save your work frequently to Git.