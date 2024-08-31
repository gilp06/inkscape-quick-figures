import * as cs from 'cross-spawn';
import { existsSync } from 'fs';
import * as vscode from 'vscode';



interface createOptions {
    template: vscode.Uri,
    new_name: string,
    success: boolean,
}




async function createFigureOptionsQuickPick() {

    //TODO: global configuration (i've given up for now)

    const result = {} as Partial<createOptions>;
    let templateFolderString = "/figures/templates/";

    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showInformationMessage("Open a folder/workspace first");
        return;
    }

    let cwd = vscode.workspace.workspaceFolders[0].uri;
    let template_dict = new Map<string, vscode.Uri>();

    await vscode.workspace.findFiles("**/figures/templates/*.svg").then((uris: vscode.Uri[]) => {

        uris.forEach(uri => {
            console.log(uri.fsPath);
            let name = uri.fsPath;
            let cut = name.lastIndexOf('\\');
            if (cut !== -1) {
                name = name.substring(cut + 1);
            }
            console.log(name);
            template_dict.set(name, uri);
        });
    });

    console.log(Array.from(template_dict.keys()));

    let template_string = await vscode.window.showQuickPick(Array.from(template_dict.keys()), {
        placeHolder: "Select a template.",
    });

    if (template_string === undefined) {
        return result as createOptions;
    }

    result.template = template_dict.get(template_string);

    let new_file_name = await vscode.window.showInputBox({
        value: "figure.svg",
        valueSelection: [0, 6],
        validateInput:
            text => {

                if(vscode.workspace.workspaceFolders === undefined)
                {
                    // this should never be reached anyways.
                    return "Please open a workspace folder.";
                }

                const filename_regex = /^[0-9a-z_\-]{1,255}\.svg/;
                if (!filename_regex.test(text)) {
                    return "Must be a valid file name.";
                }


                return existsSync(vscode.Uri.joinPath(vscode.workspace.workspaceFolders[0].uri, `/figures/${text}`).fsPath) ? "File already exists!" : null;
            }
    });

    result.new_name = new_file_name;


    return result as createOptions;
}


export async function createFigure() {

    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showInformationMessage("Open a folder/workspace first");
        return;
    }

    const config = vscode.workspace.getConfiguration("inkscape-quick-figures");
    const inkscape_exec =  config.get<string>("inkscapeLocation");
    if(inkscape_exec === undefined)
    {
        return;
    }

    

    const result = await createFigureOptionsQuickPick();
    if (result === undefined || result.template === undefined || result.new_name === undefined) {
        return;
    }

    console.log(result);

    const cwd = vscode.workspace.workspaceFolders[0];

    let new_figure_uri = vscode.Uri.joinPath(cwd.uri, `figures/${result.new_name}`);


    vscode.workspace.fs.copy(result.template, new_figure_uri);
    let process = cs.spawn(inkscape_exec, [new_figure_uri.fsPath], {
        detached: true,
    });
}