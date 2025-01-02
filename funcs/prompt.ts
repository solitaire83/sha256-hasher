import * as readline from 'readline';

export function createprompt(): readline.Interface {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}

export function dialog(rl: readline.Interface, query: string, callback: (answer: string) => void): void {
    rl.question(query, (answer) => {
        if(answer.trim().toLowerCase() === 'exit') {
            rl.close();
        } else {
            callback(answer);
        }
    });
}

export function prompt(rl: readline.Interface, saltsize: number, keysize: number, iterations: number): void {
    rl.question('Enter something to be hashed: ', (input) => {
        if(input.trim().toLowerCase() === 'exit') return rl.close();
        const { hash } = require('./hash');
        hash(input, saltsize, keysize, iterations);
        prompt(rl, saltsize, keysize, iterations);
    });
}
