import * as crypto from 'crypto';
import { colors } from '../utils/colors';

export function hash(input: string, saltsize: number, keysize: number, iterations: number): string {
    const salt = crypto.randomBytes(saltsize).toString('hex');
    const hashed = crypto.pbkdf2Sync(input, salt, iterations, keysize, 'sha256').toString('hex');
    console.log('=====================================');
    console.log(`${colors.yellow}${salt}${colors.reset}:${colors.green}${hashed}${colors.reset}`);
    console.log(`${colors.yellow}salt - yellow${colors.reset}, ${colors.green}hash - green${colors.reset}`);
    console.log(`salt length: ${salt.length} characters / hash length: ${hashed.length} characters / total length: ${salt.length + hashed.length + 1} characters`); // that 1 is for ":" separator :)
    console.log(`input: ${input} | salt: ${saltsize} bytes, key: ${keysize} bytes, iterations: ${iterations}`);
    console.log('=====================================');
    return `${salt}:${hashed}`; // the actual format
}


export function verify(input: string, hash: string, iterations: number, keysize: number): boolean {
    try {
        const separator = hash.split(':');
        const [salt, halfhash] = separator;
        
        const iter = iterations;
        const key = keysize;  

        const derive = crypto.pbkdf2Sync(input, salt, iter, key, 'sha256');
        return derive.toString('hex') === halfhash;
    } catch(e) {
        console.error(`${colors.red}Something went wrong:\n${e}${colors.reset}`);
        return false;
    }
}