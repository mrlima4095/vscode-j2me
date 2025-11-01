const vscode = require('vscode');

function activate(context) {
    console.log("J2ME extension activated");

    const j2meSymbols = [
        { label: 'MIDlet', kind: vscode.CompletionItemKind.Class, detail: 'J2ME application base class', documentation: 'Base class for all MIDlets (J2ME applications).' },
        { label: 'Display', kind: vscode.CompletionItemKind.Class, detail: 'Display handler', documentation: 'Represents the device display, manages which screen (Displayable) is visible.' },
        { label: 'getDisplay', kind: vscode.CompletionItemKind.Method, detail: 'Get Display instance', documentation: 'Returns the Display object associated with this MIDlet.' },
        { label: 'RecordStore', kind: vscode.CompletionItemKind.Class, detail: 'Persistent storage system', documentation: 'Provides persistent storage for small amounts of data in J2ME.' },
        { label: 'startApp', kind: vscode.CompletionItemKind.Method, detail: 'Lifecycle method', documentation: 'Called when the MIDlet starts running.' },
        { label: 'pauseApp', kind: vscode.CompletionItemKind.Method, detail: 'Lifecycle method', documentation: 'Called when the MIDlet is paused.' },
        { label: 'destroyApp', kind: vscode.CompletionItemKind.Method, detail: 'Lifecycle method', documentation: 'Called to destroy the MIDlet and release resources.' }
    ];

    const provider = vscode.languages.registerCompletionItemProvider(
        { language: 'java', scheme: 'file' },
        {
            provideCompletionItems(document, position) {
                return j2meSymbols.map(sym => {
                    const item = new vscode.CompletionItem(sym.label, sym.kind);
                    item.detail = sym.detail;
                    item.documentation = sym.documentation;
                    return item;
                });
            }
        },
        '.' 
    );

    context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = { activate, deactivate };
