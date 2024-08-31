import * as vscode from "vscode";
import { updateFigure } from "./update_figures";
import chokidar from 'chokidar';

export function initFileTracker() {
    let cwd = vscode.workspace.workspaceFolders![0].uri.fsPath;
    let watcher = chokidar.watch(`${cwd}/figures/*.svg`);
    watcher.on('change', (path, stats) => {
        console.log(path + " changed, updating.");
        updateFigure(path);
    });
}