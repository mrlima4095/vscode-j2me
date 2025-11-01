const vscode = require('vscode');

const j2meClasses = {
    Display: {
        package: 'javax.microedition.lcdui.Display',
        description: 'Represents the device display and manages which screen (Displayable) is shown.',
        methods: [
            { label: 'getDisplay', insertText: 'getDisplay()', documentation: 'Returns the Display object for the current MIDlet.' },
            { label: 'getCurrent', insertText: 'getCurrent()', documentation: 'Returns the current Displayable.' },
            { label: 'setCurrent', insertText: 'setCurrent(${1:Displayable})', documentation: 'Sets the current Displayable.' }
        ],
        constants: ['SCREEN', 'LIST', 'ALERT', 'FORM']
    },
    MIDlet: {
        package: 'javax.microedition.midlet.MIDlet',
        description: 'Base class for all MIDlets (J2ME applications).',
        methods: [
            { label: 'startApp', insertText: 'startApp()', documentation: 'Called when the MIDlet is started.' },
            { label: 'pauseApp', insertText: 'pauseApp()', documentation: 'Called when the MIDlet is paused.' },
            { label: 'destroyApp', insertText: 'destroyApp(${1:boolean})', documentation: 'Called when the MIDlet is destroyed.' },
            { label: 'getAppProperty', insertText: 'getAppProperty(${1})', documentation: 'Get a MIDlet Property.' },
            { label: 'platformRequest', insertText: 'platformRequest(${1})', documentation: 'Request Device API to complete an URI.' }
        ]
    },
    RecordStore: {
        package: 'javax.microedition.rms.RecordStore',
        description: 'Persistent storage for small amounts of data.',
        methods: [
            { label: 'openRecordStore', insertText: 'openRecordStore(${1:name}, ${2:create})', documentation: 'Opens a record store.' },
            { label: 'addRecord', insertText: 'addRecord(${1:data}, ${2:offset}, ${3:length})', documentation: 'Adds a record.' },
            { label: 'closeRecordStore', insertText: 'closeRecordStore()', documentation: 'Closes the RecordStore.' }
        ]
    }
};

function activate(context) {
    console.log("J2ME extension activated");

    const classProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'java', scheme: 'file' },
        {
            provideCompletionItems() {
                return Object.keys(j2meClasses).map(className => {
                    const cls = j2meClasses[className];
                    const item = new vscode.CompletionItem(className, vscode.CompletionItemKind.Class);
                    item.detail = cls.package;
                    item.documentation = new vscode.MarkdownString(cls.description);
                    return item;
                });
            }
        }
    );

    const methodProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'java', scheme: 'file' },
        {
            provideCompletionItems(document, position) {
                const line = document.lineAt(position.line).text.trim();
                const items = [];

                const variableMatch = line.match(/(\w+)\.$/);
                if (variableMatch) {
                    const variable = variableMatch[1];
                    const text = document.getText();

                    const declMatch = new RegExp(`(\\w+)\\s+${variable}\\s*=\\s*(?:new\\s+)?(\\w+)`, 'm').exec(text);
                    if (declMatch) {
                        const type = declMatch[1] || declMatch[2];
                        if (j2meClasses[type]) {
                            j2meClasses[type].methods.forEach(m => {
                                const item = new vscode.CompletionItem(m.label, vscode.CompletionItemKind.Method);
                                item.insertText = new vscode.SnippetString(m.insertText);
                                item.documentation = new vscode.MarkdownString(m.documentation);
                                items.push(item);
                            });
                            return items;
                        }
                    }
                }

                const classMatch = line.match(/(\w+)\.$/);
                if (classMatch) {
                    const className = classMatch[1];
                    if (j2meClasses[className]) {
                        j2meClasses[className].methods.forEach(m => {
                            const item = new vscode.CompletionItem(m.label, vscode.CompletionItemKind.Method);
                            item.insertText = new vscode.SnippetString(m.insertText);
                            item.documentation = new vscode.MarkdownString(m.documentation);
                            items.push(item);
                        });
                        return items;
                    }
                }

                return [];
            }
        },
        '.' 
    );

    context.subscriptions.push(classProvider, methodProvider);
}

function deactivate() {}

module.exports = { activate, deactivate };
