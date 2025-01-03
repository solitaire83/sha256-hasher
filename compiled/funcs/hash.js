"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = hash;
exports.verify = verify;
const crypto = __importStar(require("crypto"));
const colors_1 = require("../utils/colors");
function hash(input, saltsize, keysize, iterations) {
    const salt = crypto.randomBytes(saltsize).toString('hex');
    const hashed = crypto.pbkdf2Sync(input, salt, iterations, keysize, 'sha256').toString('hex');
    console.log('=====================================');
    console.log(`${colors_1.colors.yellow}${salt}${colors_1.colors.reset}:${colors_1.colors.green}${hashed}${colors_1.colors.reset}`);
    console.log(`${colors_1.colors.yellow}salt - yellow${colors_1.colors.reset}, ${colors_1.colors.green}hash - green${colors_1.colors.reset}`);
    console.log(`salt length: ${salt.length} characters / hash length: ${hashed.length} characters / total length: ${salt.length + hashed.length + 1} characters`); // that 1 is for ":" separator :)
    console.log(`input: ${input} | salt: ${saltsize} bytes, key: ${keysize} bytes, iterations: ${iterations}`);
    console.log('=====================================');
    return `${salt}:${hashed}`; // the actual format
}
function verify(input, hash, iterations, keysize) {
    try {
        const separator = hash.split(':');
        const [salt, halfhash] = separator;
        const iter = iterations;
        const key = keysize;
        const derive = crypto.pbkdf2Sync(input, salt, iter, key, 'sha256');
        return derive.toString('hex') === halfhash;
    }
    catch (e) {
        console.error(`${colors_1.colors.red}Something went wrong:\n${e}${colors_1.colors.reset}`);
        return false;
    }
}
