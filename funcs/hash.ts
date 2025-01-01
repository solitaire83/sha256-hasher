import * as crypto from 'crypto';

export function hash(input: string, saltsize: number, keysize: number, iterations: number): string {
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
