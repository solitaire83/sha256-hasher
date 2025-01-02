import * as readline from 'readline';
import { start } from '../funcs/start';

export function cmds(cmd: string, rl: readline.Interface): boolean {
    if(cmd === 'exit') {
        rl.close();
        return true;
    }

    if(cmd === 'restart') {
        rl.close();
        console.clear();
        console.log('\x1b[32m%s\x1b[0m', 'The application had been restarted! :*');
        start();
        return true;
    }

    return false;
}