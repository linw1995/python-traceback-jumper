/*---------------------------------------------------------------------------------------------
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
import * as vscode from 'vscode';
import { DocumentLinkProvider } from './providers/DocumentLinksProvider';


export function activate(context: vscode.ExtensionContext) {
    let disposable: vscode.Disposable;
    let isEnable = vscode.workspace.getConfiguration("python.tracebackJumper").get<boolean>("Enable");
    if (isEnable) {
        let sel: vscode.DocumentSelector = { language: 'python-traceback-output' };
        disposable = vscode.languages.registerDocumentLinkProvider(sel, new DocumentLinkProvider);
    }
    context.subscriptions.push(disposable)
}

export function deactivate() {

}
