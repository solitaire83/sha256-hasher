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
exports.createprompt = createprompt;
exports.dialog = dialog;
exports.prompt = prompt;
const readline = __importStar(require("readline"));
const cmdhandler_1 = require("../utils/cmdhandler");
function createprompt() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}
function dialog(rl, query, callback) {
    rl.question(query, (answer) => {
        if (!(0, cmdhandler_1.cmds)(answer.trim().toLowerCase(), rl)) {
            callback(answer);
        }
    });
}
function prompt(saltsize, keysize, iterations) {
    const rl = createprompt();
    rl.question('Enter something to be hashed: ', (input) => {
        const cmd = input.trim().toLowerCase();
        if (!(0, cmdhandler_1.cmds)(cmd, rl)) {
            const { hash } = require('./hash');
            hash(input, saltsize, keysize, iterations);
            rl.close();
            prompt(saltsize, keysize, iterations);
        }
    });
}
