// @ts-check 
"use strict";
const exec = require("child_process").exec;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

Object.defineProperty(exports, "__esModule", {value: true});
exports.Commands = void 0;

var _awaiter = (
    (this && this._awaiter) || 
    function (
        /** @type {any} */ thisArg, /** @type {any} */ _arguments, 
        /** @type {PromiseConstructor} */ promise, 
        /** @type {{ [x: string]: (arg0: any) => any; next: (arg0: any) => any; apply: (arg0: any, arg1: any) => any; }} */ generator
    ) {
        /**
         * @param {any} value
         */
        function adopt(value) {
            return value instanceof promise ? value : new promise(
                function (/** @type {(arg0: any) => void} */ resolve) {
                    resolve(value);
                }
            );
        };
        return new (promise || (promise = Promise))(
            function (
                /** @type {(arg0: any) => any} */ resolve, 
                /** @type {(arg0: any) => void} */ reject
            ) {
                /**
                 * @param {any} value
                 */
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                };

                /**
                 * @param {any} value
                 */
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                };

                /**
                 * @param {{ done: any; value: any; }} result
                 */
                function step(result) {
                    result.done ? 
                        resolve(result.value) : 
                        adopt(result.value).then(fulfilled, rejected);
                };
                step((
                    generator = generator.apply(thisArg, _arguments || [])
                ).next());
            }
        );
});

class Commands {
    constructor() {
        this.EXTENSION_NAME = "AvivYaish.nand-ide";
        this.LANGUAGE_NAME = "Nand2Tetris";
        let symbol;
        this.platform = process.platform;
        switch (this.platform) {
            case "win32":
                symbol = ";";
                break;
            case "linux":
                symbol = ":";
                break;
            case "darwin":
                symbol = ":";
                break;
        }
        this.outputChannel = vscode.window.createOutputChannel(this.LANGUAGE_NAME);
        this.terminal = vscode.window.createTerminal(this.LANGUAGE_NAME);
        this.extensionPath = vscode.extensions.getExtension(this.EXTENSION_NAME).extensionPath;
        this.extensionPath = this.extensionPath.replace(/\\/g, "/");
        this.hardwareCmd = "java -classpath \"${CLASSPATH}" + symbol
            + this.extensionPath + symbol
            + this.extensionPath + "/bin/classes" + symbol
            + this.extensionPath + "/bin/lib/Hack.jar" + symbol
            + this.extensionPath + "/bin/lib/HackGUI.jar" + symbol
            + this.extensionPath + "/bin/lib/Simulators.jar" + symbol
            + this.extensionPath + "/bin/lib/SimulatorsGUI.jar" + symbol
            + this.extensionPath + "/bin/lib/Compilers.jar\" HardwareSimulatorMain ";
        this.CPUCmd = "java -classpath \"${CLASSPATH}" + symbol
            + this.extensionPath + symbol
            + this.extensionPath + "/bin/classes" + symbol
            + this.extensionPath + "/bin/lib/Hack.jar" + symbol
            + this.extensionPath + "/bin/lib/HackGUI.jar" + symbol
            + this.extensionPath + "/bin/lib/Simulators.jar" + symbol
            + this.extensionPath + "/bin/lib/SimulatorsGUI.jar" + symbol
            + this.extensionPath + "/bin/lib/Compilers.jar\" CPUEmulatorMain ";
        this.VMCmd = "java -classpath \"${CLASSPATH}" + symbol
            + this.extensionPath + symbol
            + this.extensionPath + "/bin/classes" + symbol
            + this.extensionPath + "/bin/lib/Hack.jar" + symbol
            + this.extensionPath + "/bin/lib/HackGUI.jar" + symbol
            + this.extensionPath + "/bin/lib/Simulators.jar" + symbol
            + this.extensionPath + "/bin/lib/SimulatorsGUI.jar" + symbol
            + this.extensionPath + "/bin/lib/Compilers.jar\" VMEmulatorMain ";
        this.assemblerCmd = "java -classpath \"${CLASSPATH}" + symbol
            + this.extensionPath + symbol
            + this.extensionPath + "/bin/classes" + symbol
            + this.extensionPath + "/bin/lib/Hack.jar" + symbol
            + this.extensionPath + "/bin/lib/HackGUI.jar" + symbol
            + this.extensionPath + "/bin/lib/Compilers.jar" + symbol
            + this.extensionPath + "/bin/lib/AssemblerGUI.jar" + symbol
            + this.extensionPath + "/bin/lib/TranslatorsGUI.jar\" HackAssemblerMain ";
        this.compilerCmd = "java -classpath \"${CLASSPATH}" + symbol
            + this.extensionPath + symbol
            + this.extensionPath + "/bin/classes" + symbol
            + this.extensionPath + "/bin/lib/Hack.jar" + symbol
            + this.extensionPath + "/bin/lib/Compilers.jar\" Hack.Compiler.JackCompiler ";
        this.zipSource = JSON.parse(fs.readFileSync(this.extensionPath + "/assets/zip.json").toString());
    }

    /**
     * @param {vscode.Uri} fileUri
     */
    executeCommand(fileUri) {
        return _awaiter(this, void 0, void 0, function* () {
            if (this.isRunning) {
                vscode.window.showInformationMessage("Code is already running!");
                return;
            }
            const editor = vscode.window.activeTextEditor;
            if (fileUri && editor && fileUri.fsPath !== editor.document.uri.fsPath) {
                this.document = yield vscode.workspace.openTextDocument(fileUri);
            }
            else if (editor) {
                this.document = editor.document;
            }
            else {
                vscode.window.showInformationMessage("No code found or selected.");
                return;
            }
            const filePath = path.parse(this.document.fileName);
            const execName = path.join(
                filePath.dir, filePath.name
            ).replace(/ /g, "\" \"").replace(/\\/g, "/");
            let command;
            switch (filePath.ext) {
                case ".hdl":
                    command = this.hardwareCmd + execName + ".tst";
                    break;
                case ".asm":
                case ".hack":
                    command = this.CPUCmd + execName + ".tst";
                    break;
                case ".vm":
                    if (path.parse(execName + "VME.tst").ext) {
                        command = this.VMCmd + execName + "VME.tst";
                    } else {
                        command = this.VMCmd + execName + ".tst";
                    }
                    break;
                default:
                    vscode.window.showInformationMessage(
                        "No .hdl/.asm/.hack/.vm code found or selected."
                    );
                    return;
            }

            this.config = vscode.workspace.getConfiguration("nand2tetris");
            const clearPreviousOutput = this.config.get("clearPreviousOutput");
            const preserveFocus = this.config.get("preserveFocus");
            if (this.config.get("runInTerminal")) {
                this.executeCommandInTerminal(
                    command, clearPreviousOutput, preserveFocus
                );
            } else {
                this.executeCommandInOutputChannel(
                    filePath.name + filePath.ext, command, clearPreviousOutput,
                    preserveFocus
                );
            }
        });
    }

    /**
     * @param {vscode.Uri} fileUri
     */
    translateCommand(fileUri) {
        return _awaiter(this, void 0, void 0, function* () {
            const editor = vscode.window.activeTextEditor;
            if (fileUri && editor && fileUri.fsPath !== editor.document.uri.fsPath) {
                this.document = yield vscode.workspace.openTextDocument(fileUri);
            }
            else if (editor) {
                this.document = editor.document;
            }
            else {
                vscode.window.showInformationMessage("No code found or selected.");
                return;
            }

            const filePath = path.parse(this.document.fileName);
            const execName = path.join(
                filePath.dir, filePath.name
            ).replace(/ /g, "\" \"").replace(/\\/g, "/");
            let command;
            switch (filePath.ext) {
                case ".asm":
                    command = this.assemblerCmd;
                    break;
                case ".jack":
                    command = this.compilerCmd;
                    break;
                default:
                    vscode.window.showInformationMessage(
                        "No .asm/.jack code found or selected."
                    );
                    return;
            }
            command += execName + filePath.ext;
            this.config = vscode.workspace.getConfiguration("nand2tetris");

            const clearPreviousOutput = this.config.get("clearPreviousOutput");
            const preserveFocus = this.config.get("preserveFocus");
            if (this.config.get("runInTerminal")) {
                this.executeCommandInTerminal(
                    command, clearPreviousOutput, preserveFocus
                );
            } else {
                this.executeCommandInOutputChannel(
                    filePath.name + filePath.ext, command, clearPreviousOutput,
                    preserveFocus
                );
            }
        });
    }

    executeHardwareCommand() {
        this.terminal.sendText(`cd "${this.extensionPath}"`);
        this.terminal.sendText(this.hardwareCmd);
    }

    executeCPUCommand() {
        this.terminal.sendText(`cd "${this.extensionPath}"`);
        this.terminal.sendText(this.CPUCmd);
    }
    
    executeVMCommand() {
        this.terminal.sendText(`cd "${this.extensionPath}"`);
        this.terminal.sendText(this.VMCmd);
    }

    executeAssemblerCommand() {
        this.terminal.sendText(`cd "${this.extensionPath}"`);
        this.terminal.sendText(this.assemblerCmd);
    }

    stopCommand() {
        if (this.isRunning) {
            this.isRunning = false;
            const kill = require("tree-kill");
            kill(this.process.pid);
        }
    }

    zipCommand() {
        return _awaiter(this, void 0, void 0, function* () {
            if (this.isCompressing) {
                vscode.window.showInformationMessage("Already Compressing!");
                return;
            }
            let inputName;
            let outputName;
            let zipCmd;

            this.document = vscode.window.activeTextEditor.document;
            let filePath = path.parse(this.document.fileName).dir.replace(/ /g, "\" \"").replace(/\\/g, "/");
            const dirArr = filePath.split("/").filter(_ => _).reverse();
            if (this.zipSource[dirArr[0]]) {
                const courseInfo = this.zipSource[dirArr[0]];
                const extension = courseInfo.extension.join("|");
                zipCmd = `java -jar ${this.extensionPath}/bin/lib/Zip.jar -f false -r \".+(?=${extension})\"`;
                if (courseInfo.extrafile) {
                    const extraFiles = [];
                    for (const extraFile of courseInfo.extrafile) {
                        extraFiles.push(this.extensionPath + "/assets/" + extraFile);
                    }
                    const extratring = extraFiles.join("|");
                    zipCmd = zipCmd + " -a " + extratring;
                }
                const baseName = parseInt(dirArr[0], 10).toString();
                filePath = path.resolve(filePath, "..");
                outputName = `${filePath}/project${baseName}.zip`;
                inputName = `${filePath}/${dirArr[0]}`;
            }
            else if (this.zipSource[dirArr[1]]) {
                const courseInfo = this.zipSource[dirArr[1]];
                const extension = courseInfo.extension.join("|");
                zipCmd = `java -jar ${this.extensionPath}/bin/lib/Zip.jar -f false -r \".+(?=${extension})\"`;
                if (courseInfo.extrafile) {
                    const extraFiles = [];
                    for (const extraFile of courseInfo.extrafile) {
                        extraFiles.push(this.extensionPath + "/assets/" + extraFile);
                    }
                    const extratring = extraFiles.join("|");
                    zipCmd = zipCmd + " -a " + extratring;
                }
                const baseName = parseInt(dirArr[1], 10).toString();
                filePath = path.resolve(filePath, "../..");
                outputName = `${filePath}/project${baseName}.zip`;
                inputName = `${filePath}/${dirArr[1]}`;
            }
            if (inputName === null) {
                vscode.window.showInformationMessage("Could not found source to compress!");
                return;
            }
            let command = `${zipCmd} -o ${outputName} -i ${inputName}`;
            command = command.replace(/\\/g, "/");
            this.config = vscode.workspace.getConfiguration("nand2tetris");
            const runInTerminal = this.config.get("runInTerminal");
            const clearPreviousOutput = this.config.get("clearPreviousOutput");
            const preserveFocus = this.config.get("preserveFocus");
            if (runInTerminal) {
                this.zipCommandInTerminal(command, clearPreviousOutput, preserveFocus);
            }
            else {
                this.zipCommandInOutputChannel(command, outputName, clearPreviousOutput, preserveFocus);
            }
        });
    }

    compilerDirectoryCommand() {
        return _awaiter(this, void 0, void 0, function* () {
            this.document = vscode.window.activeTextEditor.document;
            let command = this.compilerCmd + path.parse(
                this.document.fileName
            ).dir;
            this.config = vscode.workspace.getConfiguration("nand2tetris");
            const runInTerminal = this.config.get("runInTerminal");
            const clearPreviousOutput = this.config.get("clearPreviousOutput");
            const preserveFocus = this.config.get("preserveFocus");
            if (runInTerminal) {
                this.executeCommandInTerminal(
                    command, clearPreviousOutput, preserveFocus
                );
            }
            else {
                this.executeCommandInOutputChannel(
                    fileName, command, clearPreviousOutput, preserveFocus
                );
            }
        });
    }

    dispose() {
        this.stopCommand();
    }

    /**
     * @param {string} command
     * @param {any} clearPreviousOutput
     * @param {boolean} preserveFocus
     */
    executeCommandInTerminal(command, clearPreviousOutput, preserveFocus) {
        if (clearPreviousOutput) {
            vscode.commands.executeCommand("workbench.action.terminal.clear");
        }
        this.terminal.show(preserveFocus);
        this.terminal.sendText(`cd "${this.extensionPath}"`);
        this.terminal.sendText(command);
    }
    /**
     * @param {any} fileName
     * @param {string} command
     * @param {any} clearPreviousOutput
     * @param {boolean} preserveFocus
     */
    executeCommandInOutputChannel(
        fileName, command, clearPreviousOutput, preserveFocus
    ) {
        if (clearPreviousOutput) {
            this.outputChannel.clear();
        }
        this.isRunning = true;
        this.isSuccess = false;
        this.outputChannel.show(preserveFocus);
        this.outputChannel.appendLine(`[Running] ${fileName}`);
        const startTime = new Date();
        this.process = exec(command, {cwd: this.extensionPath});
        this.process.stdout.on("data", (data) => {
            this.outputChannel.appendLine(data);
            if (data.match("successfully")) {
                this.isSuccess = true;
            }
        });
        this.process.stderr.on("data", (data) => {
            this.outputChannel.appendLine(data);
            if (data.match("java")) {
                data = "You need to install [Java Runtime Environment] First.";
            }
        });
        this.process.on("close", (code) => {
            this.isRunning = false;
            if (command.startsWith(this.compilerCmd)) {
                this.isSuccess = (code === 0);
            }
            this.outputChannel.appendLine(
                `[Done] Command finished ${
                    (this.isSuccess ? `successfully` : `with an error`)
                } with code=${code} in ${
                    ((new Date()).getTime() - startTime.getTime()) / 1000
                } seconds`
            );
            this.outputChannel.appendLine("");
        });
    }
    /**
     * @param {string} command
     * @param {any} clearPreviousOutput
     * @param {boolean} preserveFocus
     */
    zipCommandInTerminal(command, clearPreviousOutput, preserveFocus) {
        if (clearPreviousOutput) {
            vscode.commands.executeCommand("workbench.action.terminal.clear");
        }
        this.terminal.show(preserveFocus);
        this.terminal.sendText(`cd "${this.extensionPath}"`);
        this.terminal.sendText(command);
    }
    /**
     * @param {string} command
     * @param {any} outputName
     * @param {any} clearPreviousOutput
     * @param {boolean} preserveFocus
     */
    zipCommandInOutputChannel(command, outputName, clearPreviousOutput, preserveFocus) {
        if (clearPreviousOutput) {
            this.outputChannel.clear();
        }
        this.isRunning = true;
        this.isSuccess = false;
        this.outputChannel.show(preserveFocus);
        this.outputChannel.appendLine(`[Compressing] ${outputName}`);
        this.process = exec(command, {cwd: this.extensionPath});
        this.process.stdout.on("data", (data) => {
            this.outputChannel.appendLine(data);
        });
        this.process.stderr.on("data", (data) => {
            if (data.match("java")) {
                data = "You need to install [Java Runtime Environment] First.";
            }
            this.outputChannel.appendLine(data);
        });
        this.process.on("close", (code) => {
            this.isRunning = false;
            if (code === 1) {
                this.outputChannel.appendLine(
                    `[Done] Compressed to file ${outputName}`
                );
            } else {
                this.outputChannel.appendLine(
                    `[Done] Compression failed.`
                );
            }
            this.outputChannel.appendLine("");
        });
    }
}

exports.Commands = Commands;