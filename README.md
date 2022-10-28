
## Test cases Optional Part 2

Test Scenario :
1. open website "https://fundingsocieties.com/"
2. click on statistics in the top navigation bar
3. verify total funded, no of financing, default rate and financing fulfillment rate
displayed or not.
4. verify General, Repayment, Disbursement tabs displayed or not
5. go to General tab and get the total approved loans, total amount disbursed and
default rate
6. go to Repayment tab and get total repayment amount, principal amount and
interest amount
7. go to Disbursement tab and store all industry names according percentage
(increasing order)


## Tech

Test cases are implemented using:
- [Cypress] - Fast, easy and reliable testing for anything that runs in a browser!
- [node.js] - evented I/O for the backend
- [Javascript] - the programming language of the Web

## Installation
- Test cases requires [Node.js](https://nodejs.org/) v10+ to run.
- Check out the repository `git clone https://github.com/lungovan/fundingsocieties-optional-part2.git`
- `cd fundingsocieties-optional-part2`
- Run `npm install` to install all dependencies 
## Run test cases
- `cd fundingsocieties-optional-part2`
- Run command `npx cypress run` to run tests headless
- Run command `npx cypress open` to run tests on other browsers