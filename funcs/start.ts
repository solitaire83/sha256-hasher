import { createprompt, dialog, prompt } from './prompt';

export function start() {
    const rl = createprompt();

    dialog(rl, 'Enter a salt number (number of bytes): ', (salt) => {
        dialog(rl, 'Enter key number (number of bytes): ', (key) => {
            dialog(rl, 'Enter number of iterations: ', (iter) => {
                const saltsize = parseInt(salt, 10);
                const keysize = parseInt(key, 10);
                const iterations = parseInt(iter, 10);

                if(isNaN(saltsize) || isNaN(keysize) || isNaN(iterations)) {
                    console.error('\x1b[31m%s\x1b[0m', 'All inputs must be valid numbers.');
                    rl.close();
                    start();
                    return;
                }

                console.log(`Ready to hash with ${saltsize} bytes saltsize, ${keysize} bytes keysize and ${iterations} iterations.`);
                rl.close();
                prompt(saltsize, keysize, iterations);
            });
        });
    });
}