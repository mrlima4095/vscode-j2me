const vscode = require('vscode');

const j2meClasses = {
    Display: {
        package: 'javax.microedition.lcdui.Display',
        description: 'Represents the device display and manages which screen (Displayable) is shown.',
        methods: [
            { label: 'getDisplay', insertText: 'getDisplay(this)', documentation: 'Returns the Display object for the current MIDlet.', returns: 'Display' },
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

// Função para criar a estrutura hierárquica de pacotes
function buildPackageHierarchy() {
    const root = {};
    
    Object.values(j2meClasses).forEach(cls => {
        const packageParts = cls.package.split('.');
        let currentLevel = root;
        
        // Navega pela hierarquia de pacotes
        packageParts.forEach((part, index) => {
            if (!currentLevel[part]) {
                currentLevel[part] = {};
            }
            
            // Se é o último nível (nome da classe), adiciona a classe
            if (index === packageParts.length - 1) {
                currentLevel[part]._class = cls;
            }
            
            currentLevel = currentLevel[part];
        });
    });
    
    return root;
}

function createSymbolsFromHierarchy(hierarchy, parentName = '') {
    const symbols = [];
    
    Object.keys(hierarchy).forEach(key => {
        const fullName = parentName ? `${parentName}.${key}` : key;
        const node = hierarchy[key];
        
        if (node._class) {
            const cls = node._class;
            const symbol = new vscode.DocumentSymbol(
                key,
                cls.description,
                vscode.SymbolKind.Class,
                new vscode.Range(0, 0, 0, 0),
                new vscode.Range(0, 0, 0, 0)
            );
            
            if (cls.methods && cls.methods.length > 0) {
                cls.methods.forEach(method => {
                    const methodSymbol = new vscode.DocumentSymbol(
                        method.label,
                        method.documentation,
                        vscode.SymbolKind.Method,
                        new vscode.Range(0, 0, 0, 0),
                        new vscode.Range(0, 0, 0, 0)
                    );
                    methodSymbol.detail = `→ ${method.returns}`;
                    symbol.children.push(methodSymbol);
                });
            }
            
            symbols.push(symbol);
        } else {
            const packageSymbol = new vscode.DocumentSymbol(
                key,
                `Package: ${fullName}`,
                vscode.SymbolKind.Package,
                new vscode.Range(0, 0, 0, 0),
                new vscode.Range(0, 0, 0, 0)
            );
            
            // Processa recursivamente os children
            const childSymbols = createSymbolsFromHierarchy(node, fullName);
            packageSymbol.children = childSymbols;
            
            symbols.push(packageSymbol);
        }
    });
    
    return symbols;
}

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

    const symbolProvider = vscode.languages.registerDocumentSymbolProvider(
        { language: 'java', scheme: 'file' },
        {
            provideDocumentSymbols() {
                const hierarchy = buildPackageHierarchy();
                return createSymbolsFromHierarchy(hierarchy);
            }
        }
    );

    context.subscriptions.push(classProvider, methodProvider, varProvider, symbolProvider);

    console.log(javaExt ? "Java extension detected (Red Hat)" : "No Java support - using internal");
}

function deactivate() {}

module.exports = { activate, deactivate };