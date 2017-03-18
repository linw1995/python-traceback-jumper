/*---------------------------------------------------------------------------------------------
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
import * as vscode from 'vscode';
import paths = require('path');
export var diagnosticCollection: vscode.DiagnosticCollection;
var basepath = vscode.workspace.rootPath;

export class DocumentLinkProvider implements vscode.DocumentLinkProvider {
    public provideDocumentLinks(doc: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.DocumentLink[]> {
        if (diagnosticCollection == null) {
            diagnosticCollection = vscode.languages.createDiagnosticCollection('traceback');
        }
        diagnosticCollection.clear();
        let documentLinks: vscode.ProviderResult<vscode.DocumentLink[]> = [];
        let total_diagnostics = [];
        let diagnostics = [];
        let cur_uri: vscode.Uri;
        let line_idx = 0;
        let last_line_idx = 0;
        let idx = 1;

        while (line_idx < doc.lineCount) {
            let result = doc.lineAt(line_idx).text.match("Traceback \\(most recent call last\\):");
            if (result != null) {
                last_line_idx = line_idx;
            }
            line_idx++;
        }
        line_idx = last_line_idx;
        // get the last python traceback group

        while (line_idx < doc.lineCount) {
            let line = doc.lineAt(line_idx);
            let result = line.text.match("  File \"(.*?)\", line ([0-9]+), in (.*)");
            if (result != null) {
                let line = parseInt(result[2]);
                let positon_start = new vscode.Position(line - 1, 0);
                let positon_end = positon_start;
                let uri: vscode.Uri;
                let path = result[1];
                if (paths.isAbsolute(path)) {
                    uri = vscode.Uri.file(path);
                }
                else {
                    path = paths.join(basepath, paths.basename(path));
                    uri = vscode.Uri.file(path);
                }
                if (cur_uri && cur_uri.toString() != uri.toString()) {
                    let index = total_diagnostics.findIndex(x => x[0].toString() == cur_uri.toString())
                    if (index >= 0) {
                        total_diagnostics[index][1] = total_diagnostics[index][1].concat(diagnostics);  
                    } else {
                        total_diagnostics.push([cur_uri, diagnostics]);
                    }
                    diagnostics = [];
                }
                cur_uri = uri;
                let ref_range = new vscode.Range(positon_start, positon_end);
                let range = new vscode.Range(line_idx, 8, line_idx, result[1].length + 8);
                let documentlink = new vscode.DocumentLink(range, uri);
                documentLinks.push(documentlink);

                // let location = new vscode.Location(ref_uri, ref_range);
                // DocumentLink can't jump to more accurate position
                line_idx++;
                let function_name = result[3];
                let info = doc.lineAt(line_idx).text + " IN " + function_name;
                let diagnostic = new vscode.Diagnostic(ref_range, info, vscode.DiagnosticSeverity.Warning);
                diagnostic.source = "traceback " + idx++;
                diagnostics.push(diagnostic);
                last_line_idx = line_idx;
            }
            line_idx++;
        }
        if (diagnostics.length > 0) {
            let diagnosticPrev = diagnostics[diagnostics.length - 1];
            let lastDiagnostic = new vscode.Diagnostic(diagnosticPrev.range, doc.lineAt(last_line_idx+1).text, vscode.DiagnosticSeverity.Error);
            lastDiagnostic.source = "traceback end";
            diagnostics.push(lastDiagnostic);

            let index = total_diagnostics.findIndex(x => x[0].toString() == cur_uri.toString())
            if (index >= 0) {
                total_diagnostics[index][1] = total_diagnostics[index][1].concat(diagnostics);
            } else {
                total_diagnostics.push([cur_uri, diagnostics]);
            }
            diagnosticCollection.set(total_diagnostics);
        }
        return documentLinks;
    }
}