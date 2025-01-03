"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = start;
const prompt_1 = require("./prompt");
function start() {
    const rl = (0, prompt_1.createprompt)();
    (0, prompt_1.dialog)(rl, 'Enter a salt number (number of bytes): ', (salt) => {
        (0, prompt_1.dialog)(rl, 'Enter key number (number of bytes): ', (key) => {
            (0, prompt_1.dialog)(rl, 'Enter number of iterations: ', (iter) => {
                const saltsize = parseInt(salt, 10);
                const keysize = parseInt(key, 10);
                const iterations = parseInt(iter, 10);
                if (isNaN(saltsize) || isNaN(keysize) || isNaN(iterations)) {
                    console.error('\x1b[31m%s\x1b[0m', 'All inputs must be valid numbers.');
                    rl.close();
                    start();
                    return;
                }
                console.log(`Ready to hash with ${saltsize} bytes saltsize, ${keysize} bytes keysize and ${iterations} iterations.`);
                rl.close();
                (0, prompt_1.prompt)(saltsize, keysize, iterations);
            });
        });
    });
}
