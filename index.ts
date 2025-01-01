import { createprompt, questionuser, prompt } from './funcs/prompt';

function start() {
    const rl = createprompt();

    questionuser(rl, 'Enter a salt number (number of bytes): ', (salt) => {
        questionuser(rl, 'Enter key number (number of bytes): ', (key) => {
            questionuser(rl, 'Enter number of iterations: ', (iter) => {
                const saltsize = parseInt(salt, 10);
                const keysize = parseInt(key, 10);
                const iterations = parseInt(iter, 10);

                if (isNaN(saltsize) || isNaN(keysize) || isNaN(iterations)) {
                    console.error('\x1b[31m%s\x1b[0m', 'All inputs must be valid numbers.');
                    return start();
                }

                console.log(`Ready to hash with ${saltsize} bytes saltsize, ${keysize} bytes keysize and ${iterations} iterations.`);
                prompt(rl, saltsize, keysize, iterations);
            });
        });
    });
}

console.log('\x1b[32m%s\x1b[0m', 'Example: 8 bytes salt, 32 bytes key, 10000 iterations');
start();
