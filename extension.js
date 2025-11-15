const vscode = require('vscode');
const language = require('./language');

function activate(context) {
    console.log("J2ME Enabled!");

    const javaExt = vscode.extensions.getExtension('redhat.java');

    const classProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'java', scheme: 'file' },
        {
            provideCompletionItems() {
                return Object.keys(language.j2meClasses).map(name => {
                    const cls = language.j2meClasses[name];
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
                const type = language.getTypeAtPosition(document, position);
                
                if (!type) {
                    const lineText = document.lineAt(position.line).text.substring(0, position.character);
                    const isDirectCompletion = !lineText.match(/[\w\)]\.$/);
                    
                    if (isDirectCompletion) {
                        const extendedClasses = language.getExtendedClasses(document);
                        if (extendedClasses.length > 0) {
                            const inheritedMethods = language.getInheritedMethods(extendedClasses);
                            return inheritedMethods.map(method => {
                                const item = new vscode.CompletionItem(method.label, vscode.CompletionItemKind.Method);
                                item.insertText = new vscode.SnippetString(method.insertText);
                                item.documentation = new vscode.MarkdownString(
                                    `${method.documentation}\n\n*Inherited from ${method.inheritedFrom}*`
                                );
                                item.detail = `${method.inheritedFrom}.${method.label} → ${method.returns}`;
                                return item;
                            });
                        }
                    }
                    return [];
                }
                
                if (!language.j2meClasses[type]) return [];
                return language.j2meClasses[type].methods.map(m => {
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
            provideCompletionItems(document, position) {
                return language.getSmartCompletionItems(document, position);
            }
        }
    );

    const directMethodProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'java', scheme: 'file' },
        {
            provideCompletionItems(document, position) {
                const lineText = document.lineAt(position.line).text.substring(0, position.character);
                const isDirectCompletion = !lineText.match(/[\w\)]\.$/);
                
                if (isDirectCompletion) {
                    const items = [];
                    
                    // Adiciona tokens Java e variáveis do escopo
                    items.push(...language.getScopeAwareCompletionItems(document, position));
                    
                    // Adiciona métodos herdados
                    const extendedClasses = language.getExtendedClasses(document);
                    if (extendedClasses.length > 0) {
                        const inheritedMethods = language.getInheritedMethods(extendedClasses);
                        inheritedMethods.forEach(method => {
                            const item = new vscode.CompletionItem(method.label, vscode.CompletionItemKind.Method);
                            item.insertText = new vscode.SnippetString(method.insertText);
                            item.documentation = new vscode.MarkdownString(
                                `${method.documentation}\n\n*Inherited from ${method.inheritedFrom}*`
                            );
                            item.detail = `${method.inheritedFrom}.${method.label} → ${method.returns}`;
                            items.push(item);
                        });
                    }
                    
                    return items;
                }
                
                return [];
            }
        },
        ''
    );

    const symbolProvider = vscode.languages.registerDocumentSymbolProvider(
        { language: 'java', scheme: 'file' },
        {
            provideDocumentSymbols() {
                try {
                    const hierarchy = language.buildPackageHierarchy();
                    const symbols = language.createSymbolsFromHierarchy(hierarchy);
                    console.log(`Generated ${symbols.length} J2ME symbols`);
                    return symbols;
                } catch (error) {
                    console.error('Error generating symbols:', error);
                    return [];
                }
            }
        }
    );

    context.subscriptions.push(
        classProvider, 
        methodProvider, 
        directMethodProvider, 
        varProvider, 
        symbolProvider
    );

    console.log(javaExt ? "Java extension detected (Red Hat)" : "No Java support - using internal");
}

function deactivate() {}

module.exports = { activate, deactivate };