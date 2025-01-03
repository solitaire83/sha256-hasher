"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = compare;
const colors_1 = require("../utils/colors");
const hash_1 = require("./hash");
const prompt_1 = require("./prompt");
function compare() {
    const rl = (0, prompt_1.createprompt)();
    (0, prompt_1.dialog)(rl, '\nEnter the input to compare: ', (input) => {
        (0, prompt_1.dialog)(rl, '\nEnter the hash to compare: ', (hash) => {
            const separator = hash.split(':');
            if (!separator || separator.length !== 2) {
                console.error(`${colors_1.colors.red}Invalid hash format!${colors_1.colors.reset} The format of a full hash is: ${colors_1.colors.yellow}<salt>${colors_1.colors.reset}:${colors_1.colors.green}<hash>${colors_1.colors.reset}`);
                rl.close();
                compare();
                return;
            }
            console.log(`\n${colors_1.colors.yellow}Now I need the ${colors_1.colors.cyan}iterations${colors_1.colors.yellow} and ${colors_1.colors.cyan}keysize${colors_1.colors.yellow} to compare the hash with the input.${colors_1.colors.reset}\n ${colors_1.colors.red}[WARN]${colors_1.colors.reset} ${colors_1.colors.gray}The iterations and the keysize should be the same as the ones used to generate the hash.${colors_1.colors.reset}`);
            (0, prompt_1.dialog)(rl, '\nLet\'s start with the number of the iterations: ', (iter) => {
                const iterations = parseInt(iter, 10);
                if (isNaN(iterations)) {
                    console.error(`${colors_1.colors.red}The iterations should be a number.${colors_1.colors.reset}`);
                    rl.close();
                    compare();
                    return;
                }
                (0, prompt_1.dialog)(rl, '\nNow with the key size (number of bytes): ', (key) => {
                    const keysize = parseInt(key, 10);
                    if (isNaN(keysize)) {
                        console.error(`${colors_1.colors.red}The key size should be a number.${colors_1.colors.reset}`);
                        rl.close();
                        compare();
                        return;
                    }
                    if ((0, hash_1.verify)(input, hash, iterations, keysize)) {
                        console.log(`${colors_1.colors.green}The input matches the hash.${colors_1.colors.reset}`);
                    }
                    else {
                        console.error(`${colors_1.colors.red}The input doesn't match the hash.${colors_1.colors.reset}`);
                    }
                    rl.close();
                    compare();
                });
            });
        });
    });
}
