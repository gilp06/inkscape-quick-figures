import path from "path";
import * as fs from "fs";
import * as vscode from 'vscode';
import * as cs from 'cross-spawn';



import { glob } from "glob";

export function updateFigure(p: string) {
    const config = vscode.workspace.getConfiguration("inkscape-quick-figures");
    const inkscape_exec = config.get<string>("inkscapeLocation")!;

    let export_path = p.replace('.svg', '.pdf');

    cs.spawn(inkscape_exec, [p, '--export-type=pdf', '--export-latex', `--export-filename=${export_path}`]);
}


export async function updateFigures() {
    let cwd = vscode.workspace.workspaceFolders![0].uri.fsPath;
    glob(cwd + `/figures/*.svg`).then(strs => {
        let folder = cwd + `/figures/`;
        console.log(strs);
        strs.forEach(path => {
            updateFigure(path);
        });
    });
}