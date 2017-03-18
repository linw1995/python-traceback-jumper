/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
import * as vscode from 'vscode';
import { DocumentLinkProvider, diagnosticCollection } from './providers/DocumentLinksProvider';

let provider: vscode.Disposable;

export function activate(context: vscode.ExtensionContext) {
    let sel: vscode.DocumentSelector = { language: 'python-traceback-output' };
    provider = vscode.languages.registerDocumentLinkProvider(sel, new DocumentLinkProvider);
}

export function deactivate() {
    provider.dispose();
    diagnosticCollection.dispose();
}