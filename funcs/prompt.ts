import * as readline from 'readline';
import { start } from './start';

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
        } else if(answer.trim().toLowerCase() === 'restart') {
            rl.close();
            console.log('\x1b[32m%s\x1b[0m', 'The application had been restarted! :*');
            start();
        } else {
            callback(answer);
        }
    });
}

export function prompt(saltsize: number, keysize: number, iterations: number): void {
    const rl = createprompt();
    rl.question('Enter something to be hashed: ', (input) => {
        const cmd = input.trim().toLowerCase();
        if(cmd === 'exit') return rl.close();
        if(cmd === 'restart') {
            rl.close();
            console.log('\x1b[32m%s\x1b[0m', 'The application had been restarted! :*');
            start();
            return;
        }

        const { hash } = require('./hash');
        hash(input, saltsize, keysize, iterations);
        rl.close();
        prompt(saltsize, keysize, iterations);
    });
}
