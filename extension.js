const vscode = require('vscode');

const j2meClasses = {
    Display: {
        package: 'javax.microedition.lcdui.Display',
        description: 'Represents the device display and manages which screen (Displayable) is shown.',
        methods: [
            { label: 'getDisplay', insertText: 'getDisplay()', documentation: 'Returns the Display object for the current MIDlet.', returns: 'Display' },
            { label: 'getCurrent', insertText: 'getCurrent()', documentation: 'Returns the current Displayable.', returns: 'Displayable' },
            { label: 'setCurrent', insertText: 'setCurrent(${1:Displayable})', documentation: 'Sets the current Displayable.', returns: 'void' }
        ]
    },
    MIDlet: {
        package: 'javax.microedition.midlet.MIDlet',
        description: 'Base class for all MIDlets (J2ME applications).',
        methods: [
            { label: 'startApp', insertText: 'startApp()', documentation: 'Called when the MIDlet is started.', returns: 'void' },
            { label: 'pauseApp', insertText: 'pauseApp()', documentation: 'Called when the MIDlet is paused.', returns: 'void' },
            { label: 'destroyApp', insertText: 'destroyApp(${1:boolean})', documentation: 'Called when the MIDlet is destroyed.', returns: 'void' },
            { label: 'getAppProperty', insertText: 'getAppProperty(${1:propertyName})', documentation: 'Get a MIDlet Property.', returns: 'String' },
            { label: 'platformRequest', insertText: 'platformRequest(${1:url})', documentation: 'Request Device API to complete an URI.', returns: 'boolean' }
        ]
    },
    RecordStore: {
        package: 'javax.microedition.rms.RecordStore',
        description: 'Persistent storage for small amounts of data.',
        methods: [
            { label: 'openRecordStore', insertText: 'openRecordStore(${1:name}, ${2:create})', documentation: 'Opens a record store.', returns: 'RecordStore' },
            { label: 'addRecord', insertText: 'addRecord(${1:data}, ${2:offset}, ${3:length})', documentation: 'Adds a record.', returns: 'int' },
            { label: 'closeRecordStore', insertText: 'closeRecordStore()', documentation: 'Closes the RecordStore.', returns: 'void' }
        ]
    }
};

function getTypeAtPosition(document, position) {
    const lineText = document.lineAt(position.line).text.substring(0, position.character);
    const chainMatch = lineText.match(/([\w\.]+)\.$/);
    if (!chainMatch) return null;

    const chainParts = chainMatch[1].split('.');
    let currentType = chainParts[0];

    for (let i = 1; i < chainParts.length; i++) {
        const methodName = chainParts[i].replace(/\(\)/g, '');
        const cls = j2meClasses[currentType];
        if (!cls) return null;
        const method = cls.methods.find(m => m.label === methodName);
        if (!method) return null;
        currentType = method.returns;
    }

    return currentType;
}

function parseJavaStructure(document) {
    const text = document.getText();
    const symbols = [];

    const classRegex = /class\s+(\w+)/g;
    const methodRegex = /(public|private|protected)?\s*(static)?\s*([\w<>]+)\s+(\w+)\s*\((.*?)\)\s*\{/g;
    const varRegex = /(public|private|protected)?\s*([\w<>]+)\s+(\w+)\s*(=|;)/g;

    let match;

    while ((match = classRegex.exec(text))) {
        const name = match[1];
        const symbol = new vscode.DocumentSymbol(
            name, 'Class',
            vscode.SymbolKind.Class,
            new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)),
            new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length))
        );
        symbols.push(symbol);
    }

    while ((match = methodRegex.exec(text))) {
        const name = match[4];
        const symbol = new vscode.DocumentSymbol(
            name, 'Method',
            vscode.SymbolKind.Method,
            new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)),
            new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length))
        );
        symbols.push(symbol);
    }

    while ((match = varRegex.exec(text))) {
        const name = match[3];
        const symbol = new vscode.DocumentSymbol(
            name, 'Variable',
            vscode.SymbolKind.Variable,
            new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)),
            new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length))
        );
        symbols.push(symbol);
    }

    return symbols;
}

function activate(context) {
    console.log("J2ME Enabled!");

    const javaExt = vscode.extensions.getExtension('redhat.java');

    const classProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'java', scheme: 'file' },
        {
            provideCompletionItems() {
                return Object.keys(j2meClasses).map(name => {
                    const cls = j2meClasses[name];
                    const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Class);
                    item.detail = cls.package;
                    item.documentation = new vscode.MarkdownString(cls.description);
                    return item;
                });
            }
        },
        ''
    );

    const methodProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'java', scheme: 'file' },
        {
            provideCompletionItems(document, position) {
                const type = getTypeAtPosition(document, position);
                if (!type || !j2meClasses[type]) return [];
                return j2meClasses[type].methods.map(m => {
                    const item = new vscode.CompletionItem(m.label, vscode.CompletionItemKind.Method);
                    item.insertText = new vscode.SnippetString(m.insertText);
                    item.documentation = new vscode.MarkdownString(m.documentation);
                    return item;
                });
            }
        },
        '.'
    );

    const structureProvider = vscode.languages.registerDocumentSymbolProvider({ language: 'java', scheme: 'file' }, { provideDocumentSymbols(document) { return parseJavaStructure(document); } });

    const varProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'java', scheme: 'file' },
        {
            provideCompletionItems(document) {
                const text = document.getText();
                const items = [];
                const varMatches = text.matchAll(/([\w<>]+)\s+(\w+)\s*(=|;)/g);
                for (const match of varMatches) {
                    const name = match[2];
                    const type = match[1];
                    const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Variable);
                    item.detail = type;
                    items.push(item);
                }
                return items;
            }
        }
    );

    context.subscriptions.push(classProvider, methodProvider, structureProvider, varProvider);

    console.log(javaExt ? "Java extension detected (Red Hat)" : "No Java support - using internal");
}

function deactivate() {}

module.exports = { activate, deactivate };
