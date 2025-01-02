import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

import { start } from '../funcs/start';
import { colors } from './colors';
import { compare } from '../funcs/comparator';


export function cmds(cmd: string, rl: readline.Interface): boolean {
    if(cmd === 'exit') {
        rl.close();
        return true;
    }

    if(cmd === 'restart') {
        rl.close();
        console.clear();
        console.log(`${colors.green}The application had been restarted! :*${colors.reset}`);
        start();
        return true;
    }

    if(cmd === 'compare') {
        rl.close();
        compare();
        return true;
    }

    if(cmd === 'start' || cmd === 'hub' || cmd === 'back') {
        rl.close();
        console.log(`${colors.green}You had been teleported back to the start of the application! ${colors.magenta}:-)${colors.reset}`);
        start();
        return true;
    }

    if(cmd === 'help') {
        console.log(`\n${colors.cyan}Here are the available commands:${colors.reset}`);
        console.log(`${colors.yellow}exit${colors.reset} - to exit the application.`);
        console.log(`${colors.yellow}restart${colors.reset} - to restart the application. (and clears the console)`);
        console.log(`${colors.yellow}compare${colors.reset} - to compare an input with a hash.`);
        console.log(`${colors.yellow}start/hub/back${colors.reset} - will turn you back to hashing your input.`);
        console.log(`${colors.yellow}delcompiled${colors.reset} - will delete the 'compiled' folder.`);
        console.log(`${colors.yellow}help${colors.reset} - to show this message.\n`);
        rl.close();
        start();
        return true;
    }

    if(cmd === 'delcompiled') { // useful if you compile and recompile a lot :D
        const dir = path.join(__dirname, '../../compiled');
        if(fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
            console.log(`${colors.green}The 'compiled' folder has been deleted successfully.${colors.reset}`);
        } else {
            console.log(`${colors.red}The 'compiled' folder doesnt exist.${colors.reset}`);
        }
    
        rl.close();
        start();
        return true;
    }
    
    return false;
}