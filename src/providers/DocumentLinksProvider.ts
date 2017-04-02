/*---------------------------------------------------------------------------------------------
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
import * as vscode from 'vscode';
import paths = require('path');


let basepath = vscode.workspace.rootPath;

export class DocumentLinkProvider implements vscode.DocumentLinkProvider {

    public provideDocumentLinks(doc: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.DocumentLink[]> {

        let documentLinks: vscode.ProviderResult<vscode.DocumentLink[]> = [];
        let line_idx = 0;

        while (line_idx < doc.lineCount) {
            let line = doc.lineAt(line_idx);
            let result = line.text.match("  File \"(.*?)\", line ([0-9]+)[,]?");
            if (result != null) {

                let uri: vscode.Uri;
                let path = result[1];
                if (paths.isAbsolute(path)) {
                    uri = vscode.Uri.file(path);
                }
                else {
                    path = paths.join(basepath, paths.basename(path));
                    uri = vscode.Uri.file(path);
                }
                let range = new vscode.Range(line_idx, 8, line_idx, result[1].length + 8);
                let documentlink = new vscode.DocumentLink(range, uri.with({ fragment: result[2] }));
                documentLinks.push(documentlink);
            }
            line_idx++;
        }
        return documentLinks;
    }
}
