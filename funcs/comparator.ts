import { colors } from '../utils/colors';
import { verify } from './hash';
import { createprompt, dialog } from './prompt';

export function compare() {
    const rl = createprompt();

    dialog(rl, '\nEnter the input to compare: ', (input) => {
        dialog(rl, '\nEnter the hash to compare: ', (hash) => {
            const separator = hash.split(':');
            if(!separator || separator.length !== 2) {
                console.error(`${colors.red}Invalid hash format!${colors.reset} The format of a full hash is: ${colors.yellow}<salt>${colors.reset}:${colors.green}<hash>${colors.reset}`);
                rl.close();
                compare();
                return;
            }

            console.log(`\n${colors.yellow}Now I need the ${colors.cyan}iterations${colors.yellow} and ${colors.cyan}keysize${colors.yellow} to compare the hash with the input.${colors.reset}\n ${colors.red}[WARN]${colors.reset} ${colors.gray}The iterations and the keysize should be the same as the ones used to generate the hash.${colors.reset}`);
            dialog(rl, '\nLet\'s start with the number of the iterations: ', (iter) => {
                const iterations = parseInt(iter, 10);
                if(isNaN(iterations)) {
                    console.error(`${colors.red}The iterations should be a number.${colors.reset}`);
                    rl.close();
                    compare();
                    return;
                }

                dialog(rl, '\nNow with the key size (number of bytes): ', (key) => {
                    const keysize = parseInt(key, 10);
                    if(isNaN(keysize)) {
                        console.error(`${colors.red}The key size should be a number.${colors.reset}`);
                        rl.close();
                        compare();
                        return;
                    }

                    if(verify(input, hash, iterations, keysize)) {
                        console.log(`${colors.green}The input matches the hash.${colors.reset}`);
                    } else {
                        console.error(`${colors.red}The input doesn't match the hash.${colors.reset}`);
                    }

                    rl.close();
                    compare();
                });
            });
        });
    });
}