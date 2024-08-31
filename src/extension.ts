
import * as vscode from 'vscode';
import { createFigure } from './create_figure';
import { updateFigures } from './update_figures';
import { initFileTracker } from './file_tracker';

export function activate(context: vscode.ExtensionContext) {




	console.log("Inkscape Quick Figures activated.");

	context.subscriptions.push(vscode.commands.registerCommand('inkscape-quick-figures.createFigure', createFigure));
	context.subscriptions.push(vscode.commands.registerCommand('inkscape-quick-figures.updateFigures', updateFigures));

	initFileTracker();
	// context.subscriptions.push(vscode.commands.registerCommand('inkscape-quick-figures.updateFigures', () => {
	// 	vscode.workspace.findFiles("**/figures/*.svg", "**/template.svg").then((uris: vscode.Uri[]) => {
	// 		uris.forEach((uri: vscode.Uri) => {
	// 			console.log("Updating" + uri.fsPath);
	// 		});
	// 	});
	// }));

}

// This method is called when your extension is deactivated
export function deactivate() { }