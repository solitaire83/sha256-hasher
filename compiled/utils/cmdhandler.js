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
exports.cmds = cmds;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const start_1 = require("../funcs/start");
const colors_1 = require("./colors");
const comparator_1 = require("../funcs/comparator");
function cmds(cmd, rl) {
    if (cmd === 'exit') {
        rl.close();
        return true;
    }
    if (cmd === 'restart') {
        rl.close();
        console.clear();
        console.log(`${colors_1.colors.green}The application had been restarted! :*${colors_1.colors.reset}`);
        (0, start_1.start)();
        return true;
    }
    if (cmd === 'compare') {
        rl.close();
        (0, comparator_1.compare)();
        return true;
    }
    if (cmd === 'start' || cmd === 'hub' || cmd === 'back') {
        rl.close();
        console.log(`${colors_1.colors.green}You had been teleported back to the start of the application! ${colors_1.colors.magenta}:-)${colors_1.colors.reset}`);
        (0, start_1.start)();
        return true;
    }
    if (cmd === 'help') {
        console.log(`\n${colors_1.colors.cyan}Here are the available commands:${colors_1.colors.reset}`);
        console.log(`${colors_1.colors.yellow}exit${colors_1.colors.reset} - to exit the application.`);
        console.log(`${colors_1.colors.yellow}restart${colors_1.colors.reset} - to restart the application. (and clears the console)`);
        console.log(`${colors_1.colors.yellow}compare${colors_1.colors.reset} - to compare an input with a hash.`);
        console.log(`${colors_1.colors.yellow}start/hub/back${colors_1.colors.reset} - will turn you back to hashing your input.`);
        console.log(`${colors_1.colors.yellow}delcompiled${colors_1.colors.reset} - will delete the 'compiled' folder.`);
        console.log(`${colors_1.colors.yellow}help${colors_1.colors.reset} - to show this message.\n`);
        rl.close();
        (0, start_1.start)();
        return true;
    }
    if (cmd === 'delcompiled') { // useful if you compile and recompile a lot :D
        const dir = path.join(__dirname, '../../compiled');
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
            console.log(`${colors_1.colors.green}The 'compiled' folder has been deleted successfully.${colors_1.colors.reset}`);
        }
        else {
            console.log(`${colors_1.colors.red}The 'compiled' folder doesnt exist.${colors_1.colors.reset}`);
        }
        rl.close();
        (0, start_1.start)();
        return true;
    }
    return false;
}
