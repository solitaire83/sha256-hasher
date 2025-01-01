import * as crypto from 'crypto';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function hash(input: string, saltsize: number, keysize: number, iterations: number): string {
    const salt = crypto.randomBytes(saltsize).toString('hex');
    const hashed = crypto.pbkdf2Sync(input, salt, iterations, keysize, 'sha256').toString('hex');
    console.log('=====================================');
    console.log(`\x1b[33m%s\x1b[0m:\x1b[32m%s\x1b[0m`, salt, hashed);
    console.log('salt - yellow, hash - green');
    console.log(`salt length: ${salt.length} characters / hash length: ${hashed.length} characters / total length: ${salt.length + hashed.length + 1} characters`); // that 1 is for ":" separator :)
    console.log(`input: ${input} | salt: ${saltsize} bytes, key: ${keysize} bytes, iterations: ${iterations}`);
    console.log('=====================================');
    return `${salt}:${hashed}`; // the actual format
}

function prompt(saltsize: number, keysize: number, iterations: number): void {
    rl.question('Enter something to be hashed: ', (input) => {
        if(input.trim().toLowerCase() === 'exit')
        {
            rl.close();
            return;
        }
        hash(input, saltsize, keysize, iterations);
        prompt(saltsize, keysize, iterations);
    });
}

rl.question('Enter a salt number (number of bytes): ', (salt) => {
    rl.question('Enter key number (number of bytes): ', (key) => {
        rl.question('Enter number of iterations: ', (iter) => {
            const saltsize = parseInt(salt, 10);
            const keysize = parseInt(key, 10);
            const iterations = parseInt(iter, 10);

            if(isNaN(saltsize) || isNaN(keysize) || isNaN(iterations))
            {
                console.error('All inputs must be valid numbers.');
                rl.close();
                return;
            }

            console.log(`Ready to hash with ${saltsize} bytes saltsize, ${keysize} bytes keysize and ${iterations} iterations.`);
            prompt(saltsize, keysize, iterations);
        });
    });
});