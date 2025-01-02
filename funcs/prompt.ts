import * as readline from 'readline';
import { cmds } from '../utils/cmdhandler';

export function createprompt(): readline.Interface {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}

export function dialog(rl: readline.Interface, query: string, callback: (answer: string) => void): void {
    rl.question(query, (answer) => {
        if(!cmds(answer.trim().toLowerCase(), rl)) {
            callback(answer);
        }
    });
}

export function prompt(saltsize: number, keysize: number, iterations: number): void {
    const rl = createprompt();
    rl.question('Enter something to be hashed: ', (input) => {
        const cmd = input.trim().toLowerCase();
        if(!cmds(cmd, rl)) {
            const { hash } = require('./hash');
            hash(input, saltsize, keysize, iterations);
            rl.close();
            prompt(saltsize, keysize, iterations);
        }
    });
}
