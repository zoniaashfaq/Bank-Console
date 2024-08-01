import inquirer from "inquirer"

import chalk from "chalk"

// Bank account interface

interface Account{
    accountNumber: number;
    Balance: number;
    withdrawAmount(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

// Bank account class

class Account implements Account{
    accountNumber: number;
    Balance: number;

    constructor(accountNumber: number , Balance: number){
        this.accountNumber = accountNumber;
        this.Balance = Balance;
    }
// Debit money
withdrawAmount(amount: number): void {
    if(this.Balance >= amount){
        this.Balance -= amount;
        console.log(chalk.green(`Withdrawn 💲${amount}.Remaining Balance: 💲${this.Balance}`)); 
    } else {
        console.log(chalk.red(`Insufficient balance💵`));
    }
}
// Credit money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // If more than $100 is deposited $1 fee is charged
    } this.Balance += amount
    console.log(chalk.green(`Amount deposited 💲${amount}.Remaining balance: 💲${this.Balance}`));
}
// Check balance
checkBalance(): void {
    console.log(chalk.green(`Current Balance: 💲${this.Balance}`));
}
}

// Customer Class
class Customer{
    firstName: string;
    lastName: string;
    Gender: string;
    Age: number;
    MobileNumber: number;
    Account: Account

    constructor(firstName: string, lastName: string, Gender: string, Age: number, MobileNumber: number,Account: Account){
        this.firstName = firstName;
        this.lastName = lastName;
        this.Gender = Gender;
        this.Age = Age;
        this.MobileNumber = MobileNumber;
        this.Account = Account;
    }
}

// Create Bank accounts

const accounts: Account[] = [
    new Account (100, 5000),
    new Account (101, 2000),
    new Account (102, 10000)
]
// Create Customers 
const Customers: Customer[] = [
    new Customer ("Alice", "Quan", "Female", 30, 12345, accounts[0]),
    new Customer ("Fred", "Sam", "Male", 27, 54321, accounts[1]),
    new Customer ("Aleen", "Max", "Female", 34, 98765, accounts[2]),
]

// Function to interact with Bank Account

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt([
            {
                name:"answer",
                type:"input",
                message:"Enter your account number:"
            }
        ])
        const accountNumber = Number(accountNumberInput.answer);
        const customer = Customers.find(customer => customer.Account.accountNumber === accountNumber)
        if(customer){
            console.log(chalk.blue(`Welcome ${customer.firstName} ${customer.lastName}!\n`));

            const ans = await inquirer.prompt([
                {
                    name:"answer",
                    message:"Select and proceed:",
                    type:"list",
                    choices:["Withdraw", "Deposit", "Check balance", "Exit"],
                }
            ]);
            switch(ans.answer){
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name:"amount",
                            type:"number",
                            message:"Enter the amount you want to deposit:"
                        }
                    ]);
                    customer.Account.deposit(depositAmount.amount) 
                    break;
                case "Withdraw":
                    const withdraw = await inquirer.prompt([
                        {
                            name:"amount",
                            type:"number",
                            message:"Enter the amount you want to withdraw:"
                        }
                    ]);
                    customer.Account.withdrawAmount(withdraw.amount) 
                    break; 
                case "Check balance":
                    customer.Account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.red(`Exiting🔸🔸🔸`));    
                    console.log(chalk.gray(`Thank You for using our Bank services❕❕`));
                    return;
            }
        } else {
            console.log(chalk.red(`Invalid Account number⁉`))
        }
    } while(true)
}

service()