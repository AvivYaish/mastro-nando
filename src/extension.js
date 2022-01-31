// @ts-check 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const commands = require("./commands");
const commandsInstance = new commands.Commands();

/**
 * @param {{ subscriptions: (commands.Commands | vscode.Disposable)[]; }} context
 */
function activate(context) {
    const run = vscode.commands.registerCommand("nand2tetris.run",
        (fileUri) => {
            commandsInstance.executeCommand(fileUri);
        }
    );

    const stop = vscode.commands.registerCommand("nand2tetris.stop", () => {
        commandsInstance.stopCommand();
    });

    const translate = vscode.commands.registerCommand("nand2tetris.translate",
        (fileUri) => {
            commandsInstance.translateCommand(fileUri);
        }
    );

    const hardware = vscode.commands.registerCommand("nand2tetris.hardware", 
        (fileUri) => {
            commandsInstance.executeHardwareCommand();
        }
    );

    const cpu = vscode.commands.registerCommand("nand2tetris.cpu", (fileUri) => {
        commandsInstance.executeCPUCommand();
    });

    const vm = vscode.commands.registerCommand("nand2tetris.vm", (fileUri) => {
        commandsInstance.executeVMCommand();
    });

    const assembler = vscode.commands.registerCommand("nand2tetris.assembler", 
        (fileUri) => {
            commandsInstance.executeAssemblerCommand();
        }
    );

    const zip = vscode.commands.registerCommand("nand2tetris.zip", () => {
        commandsInstance.zipCommand();
    });

    const compile = vscode.commands.registerCommand("nand2tetris.compiler", 
        () => {
            commandsInstance.compilerDirectoryCommand();
        }
    );

    context.subscriptions.push(run);
    context.subscriptions.push(translate);
    context.subscriptions.push(commandsInstance);
}

function deactivate() {
    commandsInstance.stopCommand();
}

exports.activate = activate;
exports.deactivate = deactivate;