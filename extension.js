const vscode = require('vscode');

const j2meClasses = {
    Display: {
        package: 'javax.microedition.lcdui.Display',
        description: 'Represents the device display and manages which screen (Displayable) is shown.',
        methods: [
            { label: 'getDisplay', insertText: 'getDisplay(this)', documentation: 'Returns the Display object for the current MIDlet.', returns: 'Display' },
            { label: 'getCurrent', insertText: 'getCurrent()', documentation: 'Returns the current Displayable.', returns: 'Displayable' },
            { label: 'setCurrent', insertText: 'setCurrent(${1:Displayable})', documentation: 'Sets the current Displayable.', returns: 'void' },
            { label: 'callSerially', insertText: 'callSerially(${1:Runnable})', documentation: 'Causes the Runnable object to have its run method called later.', returns: 'void' },
            { label: 'isColor', insertText: 'isColor()', documentation: 'Checks if the display supports color.', returns: 'boolean' },
            { label: 'numColors', insertText: 'numColors()', documentation: 'Gets the number of colors supported by the display.', returns: 'int' }
        ]
    },
    Displayable: {
        package: 'javax.microedition.lcdui.Displayable',
        description: 'Base class for objects that can be displayed on the screen.',
        methods: [
            { label: 'addCommand', insertText: 'addCommand(${1:Command})', documentation: 'Adds a command to the Displayable.', returns: 'void' },
            { label: 'removeCommand', insertText: 'removeCommand(${1:Command})', documentation: 'Removes a command from the Displayable.', returns: 'void' },
            { label: 'setCommandListener', insertText: 'setCommandListener(${1:CommandListener})', documentation: 'Sets a listener for commands.', returns: 'void' },
            { label: 'isShown', insertText: 'isShown()', documentation: 'Checks if the Displayable is currently shown.', returns: 'boolean' }
        ]
    },
    Form: {
        package: 'javax.microedition.lcdui.Form',
        description: 'Screen that contains an arbitrary mixture of items.',
        methods: [
            { label: 'append', insertText: 'append(${1:Item})', documentation: 'Appends an item to the Form.', returns: 'int' },
            { label: 'insert', insertText: 'insert(${1:int}, ${2:Item})', documentation: 'Inserts an item into the Form.', returns: 'void' },
            { label: 'delete', insertText: 'delete(${1:int})', documentation: 'Deletes the item at the specified position.', returns: 'void' },
            { label: 'set', insertText: 'set(${1:int}, ${2:Item})', documentation: 'Sets an item at the specified position.', returns: 'void' },
            { label: 'get', insertText: 'get(${1:int})', documentation: 'Gets the item at the specified position.', returns: 'Item' },
            { label: 'size', insertText: 'size()', documentation: 'Gets the number of items in the Form.', returns: 'int' }
        ]
    },
    TextBox: {
        package: 'javax.microedition.lcdui.TextBox',
        description: 'Screen that allows user to enter and edit text.',
        methods: [
            { label: 'getString', insertText: 'getString()', documentation: 'Gets the contents of the TextBox as a string.', returns: 'String' },
            { label: 'setString', insertText: 'setString(${1:String})', documentation: 'Sets the contents of the TextBox.', returns: 'void' },
            { label: 'getChars', insertText: 'getChars(${1:char[]})', documentation: 'Copies the contents into a character array.', returns: 'int' },
            { label: 'setChars', insertText: 'setChars(${1:char[]}, ${2:int}, ${3:int})', documentation: 'Sets the contents from a character array.', returns: 'void' },
            { label: 'getMaxSize', insertText: 'getMaxSize()', documentation: 'Returns the maximum size (number of characters) that can be stored.', returns: 'int' },
            { label: 'setMaxSize', insertText: 'setMaxSize(${1:int})', documentation: 'Sets the maximum size (number of characters) that can be contained.', returns: 'int' },
            { label: 'getConstraints', insertText: 'getConstraints()', documentation: 'Gets the input constraints of the TextBox.', returns: 'int' },
            { label: 'setConstraints', insertText: 'setConstraints(${1:int})', documentation: 'Sets the input constraints of the TextBox.', returns: 'void' }
        ]
    },
    Alert: {
        package: 'javax.microedition.lcdui.Alert',
        description: 'Screen that shows data to the user for a certain period of time.',
        methods: [
            { label: 'setTimeout', insertText: 'setTimeout(${1:int})', documentation: 'Sets the time for which the Alert is displayed.', returns: 'void' },
            { label: 'getTimeout', insertText: 'getTimeout()', documentation: 'Gets the time for which the Alert is displayed.', returns: 'int' },
            { label: 'setType', insertText: 'setType(${1:AlertType})', documentation: 'Sets the type of the Alert.', returns: 'void' },
            { label: 'getType', insertText: 'getType()', documentation: 'Gets the type of the Alert.', returns: 'AlertType' },
            { label: 'setString', insertText: 'setString(${1:String})', documentation: 'Sets the text string used in the Alert.', returns: 'void' },
            { label: 'getString', insertText: 'getString()', documentation: 'Gets the text string used in the Alert.', returns: 'String' }
        ]
    },
    List: {
        package: 'javax.microedition.lcdui.List',
        description: 'Screen containing list of choices.',
        methods: [
            { label: 'append', insertText: 'append(${1:String}, ${2:Image})', documentation: 'Appends an element to the List.', returns: 'int' },
            { label: 'insert', insertText: 'insert(${1:int}, ${2:String}, ${3:Image})', documentation: 'Inserts an element into the List.', returns: 'void' },
            { label: 'delete', insertText: 'delete(${1:int})', documentation: 'Deletes the element at the given index.', returns: 'void' },
            { label: 'getString', insertText: 'getString(${1:int})', documentation: 'Gets the string part of the element at the specified index.', returns: 'String' },
            { label: 'getSelectedIndex', insertText: 'getSelectedIndex()', documentation: 'Gets the index of the selected element.', returns: 'int' },
            { label: 'setSelectedIndex', insertText: 'setSelectedIndex(${1:int}, ${2:boolean})', documentation: 'Sets the selected index for the List.', returns: 'void' },
            { label: 'isSelected', insertText: 'isSelected(${1:int})', documentation: 'Gets the selection state of an element.', returns: 'boolean' },
            { label: 'size', insertText: 'size()', documentation: 'Returns the number of elements in the List.', returns: 'int' }
        ]
    },
    Command: {
        package: 'javax.microedition.lcdui.Command',
        description: 'Represents an action that can be triggered by the user.',
        methods: [
            { label: 'getLabel', insertText: 'getLabel()', documentation: 'Gets the label of the command.', returns: 'String' },
            { label: 'getCommandType', insertText: 'getCommandType()', documentation: 'Gets the command type.', returns: 'int' },
            { label: 'getPriority', insertText: 'getPriority()', documentation: 'Gets the priority of the command.', returns: 'int' }
        ]
    },
    Connector: {
        package: 'javax.microedition.io.Connector',
        description: 'Factory class for creating Connection objects.',
        methods: [
            { label: 'open', insertText: 'open(${1:name})', documentation: 'Create and open a Connection.', returns: 'Connection' },
            { label: 'openDataInputStream', insertText: 'openDataInputStream(${1:name})', documentation: 'Create and open a connection input stream.', returns: 'DataInputStream' },
            { label: 'openDataOutputStream', insertText: 'openDataOutputStream(${1:name})', documentation: 'Create and open a connection output stream.', returns: 'DataOutputStream' },
            { label: 'openInputStream', insertText: 'openInputStream(${1:name})', documentation: 'Create and open a connection input stream.', returns: 'InputStream' },
            { label: 'openOutputStream', insertText: 'openOutputStream(${1:name})', documentation: 'Create and open a connection output stream.', returns: 'OutputStream' }
        ],
        constants: [
            { label: 'READ', documentation: 'Access mode READ' },
            { label: 'READ_WRITE', documentation: 'Access mode READ_WRITE' },
            { label: 'WRITE', documentation: 'Access mode WRITE' }
        ]
    },
    Connection: {
        package: 'javax.microedition.io.Connection',
        description: 'Generic connection interface.',
        methods: [
            { label: 'close', insertText: 'close()', documentation: 'Close the connection.', returns: 'void' }
        ]
    },
    HttpConnection: {
        package: 'javax.microedition.io.HttpConnection',
        description: 'HTTP connection interface.',
        methods: [
            { label: 'setRequestMethod', insertText: 'setRequestMethod(${1:String})', documentation: 'Set the method for the URL request.', returns: 'void' },
            { label: 'getRequestMethod', insertText: 'getRequestMethod()', documentation: 'Get the current request method.', returns: 'String' },
            { label: 'setRequestProperty', insertText: 'setRequestProperty(${1:String}, ${2:String})', documentation: 'Set a request property.', returns: 'void' },
            { label: 'getRequestProperty', insertText: 'getRequestProperty(${1:String})', documentation: 'Get a request property value.', returns: 'String' },
            { label: 'getResponseCode', insertText: 'getResponseCode()', documentation: 'Get the HTTP response status code.', returns: 'int' },
            { label: 'getResponseMessage', insertText: 'getResponseMessage()', documentation: 'Get the HTTP response message.', returns: 'String' },
            { label: 'getHeaderField', insertText: 'getHeaderField(${1:String})', documentation: 'Get a header field value.', returns: 'String' },
            { label: 'getURL', insertText: 'getURL()', documentation: 'Get the URL for this connection.', returns: 'String' },
            { label: 'getProtocol', insertText: 'getProtocol()', documentation: 'Get the protocol name.', returns: 'String' },
            { label: 'getHost', insertText: 'getHost()', documentation: 'Get the host name.', returns: 'String' },
            { label: 'getPort', insertText: 'getPort()', documentation: 'Get the port number.', returns: 'int' }
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
            { label: 'platformRequest', insertText: 'platformRequest(${1:url})', documentation: 'Request Device API to complete an URI.', returns: 'boolean' },
            { label: 'notifyDestroyed', insertText: 'notifyDestroyed()', documentation: 'Notifies the application manager that the MIDlet has entered the Destroyed state.', returns: 'void' },
            { label: 'notifyPaused', insertText: 'notifyPaused()', documentation: 'Notifies the application manager that the MIDlet has entered the Paused state.', returns: 'void' },
            { label: 'resumeRequest', insertText: 'resumeRequest()', documentation: 'Provides a MIDlet with a mechanism to indicate that it is interested in entering the Active state.', returns: 'void' }
        ]
    },
    RecordStore: {
        package: 'javax.microedition.rms.RecordStore',
        description: 'Persistent storage for small amounts of data.',
        methods: [
            { label: 'openRecordStore', insertText: 'openRecordStore(${1:name}, ${2:create})', documentation: 'Opens a record store.', returns: 'RecordStore' },
            { label: 'closeRecordStore', insertText: 'closeRecordStore()', documentation: 'Closes the RecordStore.', returns: 'void' },
            { label: 'addRecord', insertText: 'addRecord(${1:byte[]}, ${2:int}, ${3:int})', documentation: 'Adds a new record to the record store.', returns: 'int' },
            { label: 'setRecord', insertText: 'setRecord(${1:int}, ${2:byte[]}, ${3:int}, ${4:int})', documentation: 'Sets the data in an existing record.', returns: 'void' },
            { label: 'getRecord', insertText: 'getRecord(${1:int})', documentation: 'Returns a copy of the data stored in the given record.', returns: 'byte[]' },
            { label: 'deleteRecord', insertText: 'deleteRecord(${1:int})', documentation: 'Deletes the specified record.', returns: 'void' },
            { label: 'getNumRecords', insertText: 'getNumRecords()', documentation: 'Returns the number of records currently in the record store.', returns: 'int' },
            { label: 'getSize', insertText: 'getSize()', documentation: 'Returns the amount of space, in bytes, that the record store occupies.', returns: 'int' },
            { label: 'getNextRecordID', insertText: 'getNextRecordID()', documentation: 'Returns the record ID of the next record to be added to the record store.', returns: 'int' },
            { label: 'deleteRecordStore', insertText: 'deleteRecordStore(${1:String})', documentation: 'Deletes the named record store.', returns: 'void' },
            { label: 'listRecordStores', insertText: 'listRecordStores()', documentation: 'Returns an array of the names of record stores owned by the MIDlet suite.', returns: 'String[]' }
        ]
    },
    RecordStoreException: {
        package: 'javax.microedition.rms.RecordStoreException',
        description: 'Thrown to indicate a general exception occurred in a record store operation.',
        methods: []
    },
    RecordStoreNotFoundException: {
        package: 'javax.microedition.rms.RecordStoreNotFoundException',
        description: 'Thrown when a record store could not be found.',
        methods: []
    },
    RecordStoreFullException: {
        package: 'javax.microedition.rms.RecordStoreFullException',
        description: 'Thrown when the record store is full.',
        methods: []
    },
    InvalidRecordIDException: {
        package: 'javax.microedition.rms.InvalidRecordIDException',
        description: 'Thrown when an operation is attempted on a record ID that is invalid.',
        methods: []
    },
    Timer: {
        package: 'java.util.Timer',
        description: 'Facility for threads to schedule tasks for future execution.',
        methods: [
            { label: 'schedule', insertText: 'schedule(${1:TimerTask}, ${2:Date})', documentation: 'Schedules the specified task for execution at the specified time.', returns: 'void' },
            { label: 'scheduleAtFixedRate', insertText: 'scheduleAtFixedRate(${1:TimerTask}, ${2:Date}, ${3:long})', documentation: 'Schedules the specified task for repeated fixed-rate execution.', returns: 'void' },
            { label: 'cancel', insertText: 'cancel()', documentation: 'Terminates this timer, discarding any currently scheduled tasks.', returns: 'void' }
        ]
    },
    TimerTask: {
        package: 'java.util.TimerTask',
        description: 'Task that can be scheduled for one-time or repeated execution by a Timer.',
        methods: [
            { label: 'run', insertText: 'run()', documentation: 'The action to be performed by this timer task.', returns: 'void' },
            { label: 'cancel', insertText: 'cancel()', documentation: 'Cancels this timer task.', returns: 'boolean' },
            { label: 'scheduledExecutionTime', insertText: 'scheduledExecutionTime()', documentation: 'Returns the scheduled execution time of the most recent actual execution of this task.', returns: 'long' }
        ]
    },
    Runnable: {
        package: 'java.lang.Runnable',
        description: 'Interface that should be implemented by any class whose instances are intended to be executed by a thread.',
        methods: [
            { label: 'run', insertText: 'run()', documentation: 'When an object implementing interface Runnable is used to create a thread, starting the thread causes the run method to be called.', returns: 'void' }
        ]
    },
    Thread: {
        package: 'java.lang.Thread',
        description: 'A thread of execution in a program.',
        methods: [
            { label: 'start', insertText: 'start()', documentation: 'Causes this thread to begin execution.', returns: 'void' },
            { label: 'run', insertText: 'run()', documentation: 'If this thread was constructed using a separate Runnable run object, then that Runnable objects run method is called.', returns: 'void' },
            { label: 'sleep', insertText: 'sleep(${1:long})', documentation: 'Causes the currently executing thread to sleep for the specified number of milliseconds.', returns: 'void' },
            { label: 'currentThread', insertText: 'currentThread()', documentation: 'Returns a reference to the currently executing thread object.', returns: 'Thread' },
            { label: 'isAlive', insertText: 'isAlive()', documentation: 'Tests if this thread is alive.', returns: 'boolean' },
            { label: 'setPriority', insertText: 'setPriority(${1:int})', documentation: 'Changes the priority of this thread.', returns: 'void' },
            { label: 'getPriority', insertText: 'getPriority()', documentation: 'Returns this threads priority.', returns: 'int' }
        ]
    },
    IOException: {
        package: 'java.io.IOException',
        description: 'Signals that an I/O exception of some sort has occurred.',
        methods: [
            { label: 'getMessage', insertText: 'getMessage()', documentation: 'Returns the detail message string of this throwable.', returns: 'String' }
        ]
    },
    IllegalArgumentException: {
        package: 'java.lang.IllegalArgumentException',
        description: 'Thrown to indicate that a method has been passed an illegal or inappropriate argument.',
        methods: [
            { label: 'getMessage', insertText: 'getMessage()', documentation: 'Returns the detail message string of this throwable.', returns: 'String' }
        ]
    },
    IllegalStateException: {
        package: 'java.lang.IllegalStateException',
        description: 'Signals that a method has been invoked at an illegal or inappropriate time.',
        methods: [
            { label: 'getMessage', insertText: 'getMessage()', documentation: 'Returns the detail message string of this throwable.', returns: 'String' }
        ]
    },
    NullPointerException: {
        package: 'java.lang.NullPointerException',
        description: 'Thrown when an application attempts to use null in a case where an object is required.',
        methods: [
            { label: 'getMessage', insertText: 'getMessage()', documentation: 'Returns the detail message string of this throwable.', returns: 'String' }
        ]
    },
    ArrayIndexOutOfBoundsException: {
        package: 'java.lang.ArrayIndexOutOfBoundsException',
        description: 'Thrown to indicate that an array has been accessed with an illegal index.',
        methods: [
            { label: 'getMessage', insertText: 'getMessage()', documentation: 'Returns the detail message string of this throwable.', returns: 'String' }
        ]
    },
    String: {
        package: 'java.lang.String',
        description: 'Represents a string of characters.',
        methods: [
            { label: 'length', insertText: 'length()', documentation: 'Returns the length of this string.', returns: 'int' },
            { label: 'charAt', insertText: 'charAt(${1:int})', documentation: 'Returns the char value at the specified index.', returns: 'char' },
            { label: 'substring', insertText: 'substring(${1:int})', documentation: 'Returns a new string that is a substring of this string.', returns: 'String' },
            { label: 'indexOf', insertText: 'indexOf(${1:int})', documentation: 'Returns the index within this string of the first occurrence of the specified character.', returns: 'int' },
            { label: 'equals', insertText: 'equals(${1:Object})', documentation: 'Compares this string to the specified object.', returns: 'boolean' },
            { label: 'compareTo', insertText: 'compareTo(${1:String})', documentation: 'Compares two strings lexicographically.', returns: 'int' },
            { label: 'toLowerCase', insertText: 'toLowerCase()', documentation: 'Converts all of the characters in this String to lower case.', returns: 'String' },
            { label: 'toUpperCase', insertText: 'toUpperCase()', documentation: 'Converts all of the characters in this String to upper case.', returns: 'String' },
            { label: 'trim', insertText: 'trim()', documentation: 'Returns a copy of the string, with leading and trailing whitespace omitted.', returns: 'String' },
            { label: 'valueOf', insertText: 'valueOf(${1:int})', documentation: 'Returns the string representation of the int argument.', returns: 'String' }
        ]
    },
    System: {
        package: 'java.lang.System',
        description: 'Contains several useful class fields and methods.',
        methods: [
            { label: 'currentTimeMillis', insertText: 'currentTimeMillis()', documentation: 'Returns the current time in milliseconds.', returns: 'long' },
            { label: 'arraycopy', insertText: 'arraycopy(${1:Object}, ${2:int}, ${3:Object}, ${4:int}, ${5:int})', documentation: 'Copies an array from the specified source array.', returns: 'void' },
            { label: 'getProperty', insertText: 'getProperty(${1:String})', documentation: 'Gets the system property indicated by the specified key.', returns: 'String' }
        ]
    },
    Math: {
        package: 'java.lang.Math',
        description: 'Contains methods for performing basic numeric operations.',
        methods: [
            { label: 'abs', insertText: 'abs(${1:int})', documentation: 'Returns the absolute value of an int value.', returns: 'int' },
            { label: 'max', insertText: 'max(${1:int}, ${2:int})', documentation: 'Returns the greater of two int values.', returns: 'int' },
            { label: 'min', insertText: 'min(${1:int}, ${2:int})', documentation: 'Returns the smaller of two int values.', returns: 'int' },
            { label: 'sqrt', insertText: 'sqrt(${1:double})', documentation: 'Returns the correctly rounded positive square root of a double value.', returns: 'double' },
            { label: 'random', insertText: 'random()', documentation: 'Returns a double value with a positive sign, greater than or equal to 0.0 and less than 1.0.', returns: 'double' }
        ]
    },
    Vector: {
        package: 'java.util.Vector',
        description: 'Implements a growable array of objects.',
        methods: [
            { label: 'addElement', insertText: 'addElement(${1:Object})', documentation: 'Adds the specified component to the end of this vector.', returns: 'void' },
            { label: 'elementAt', insertText: 'elementAt(${1:int})', documentation: 'Returns the component at the specified index.', returns: 'Object' },
            { label: 'removeElementAt', insertText: 'removeElementAt(${1:int})', documentation: 'Deletes the component at the specified index.', returns: 'void' },
            { label: 'size', insertText: 'size()', documentation: 'Returns the number of components in this vector.', returns: 'int' },
            { label: 'isEmpty', insertText: 'isEmpty()', documentation: 'Tests if this vector has no components.', returns: 'boolean' },
            { label: 'contains', insertText: 'contains(${1:Object})', documentation: 'Tests if the specified object is a component in this vector.', returns: 'boolean' },
            { label: 'indexOf', insertText: 'indexOf(${1:Object})', documentation: 'Searches for the first occurrence of the given argument.', returns: 'int' }
        ]
    },
    Hashtable: {
        package: 'java.util.Hashtable',
        description: 'Implements a hashtable, which maps keys to values.',
        methods: [
            { label: 'put', insertText: 'put(${1:Object}, ${2:Object})', documentation: 'Maps the specified key to the specified value in this hashtable.', returns: 'Object' },
            { label: 'get', insertText: 'get(${1:Object})', documentation: 'Returns the value to which the specified key is mapped.', returns: 'Object' },
            { label: 'remove', insertText: 'remove(${1:Object})', documentation: 'Removes the key (and its corresponding value) from this hashtable.', returns: 'Object' },
            { label: 'containsKey', insertText: 'containsKey(${1:Object})', documentation: 'Tests if the specified object is a key in this hashtable.', returns: 'boolean' },
            { label: 'contains', insertText: 'contains(${1:Object})', documentation: 'Tests if some key maps into the specified value in this hashtable.', returns: 'boolean' },
            { label: 'size', insertText: 'size()', documentation: 'Returns the number of keys in this hashtable.', returns: 'int' },
            { label: 'isEmpty', insertText: 'isEmpty()', documentation: 'Tests if this hashtable maps no keys to values.', returns: 'boolean' },
            { label: 'keys', insertText: 'keys()', documentation: 'Returns an enumeration of the keys in this hashtable.', returns: 'Enumeration' },
            { label: 'elements', insertText: 'elements()', documentation: 'Returns an enumeration of the values in this hashtable.', returns: 'Enumeration' }
        ]
    }
};

const midletInheritedMethods = [ 'getAppProperty', 'platformRequest', 'checkPermission', 'resumeRequest', 'notifyDestroyed', 'notifyPaused', 'startApp', 'pauseApp', 'destroyApp' ];

function buildPackageHierarchy() {
    const root = {};
    
    Object.values(j2meClasses).forEach(cls => {
        const packageParts = cls.package.split('.');
        let currentLevel = root;
        
        packageParts.forEach((part, index) => {
            if (!currentLevel[part]) { currentLevel[part] = {}; }
            if (index === packageParts.length - 1) { currentLevel[part]._class = cls; }
            
            currentLevel = currentLevel[part];
        });
    });
    
    return root;
}

// CORREÇÃO AQUI: Criar símbolos com informações completas
function createSymbolsFromHierarchy(hierarchy, parentName = '') {
    const symbols = [];
    
    Object.keys(hierarchy).forEach(key => {
        const fullName = parentName ? `${parentName}.${key}` : key;
        const node = hierarchy[key];
        
        if (node._class) {
            const cls = node._class;
            
            const symbol = new vscode.DocumentSymbol(
                key,
                "", // detalhes
                vscode.SymbolKind.Class, // tipo
                new vscode.Range(0, 0, 0, 10), 
                new vscode.Range(0, 0, 0, 10) 
            );
            
            if (cls.methods && cls.methods.length > 0) {
                cls.methods.forEach(method => {
                    const methodSymbol = new vscode.DocumentSymbol(
                        method.label,
                        `${method.documentation} → ${method.returns}`,
                        vscode.SymbolKind.Method,
                        new vscode.Range(0, 0, 0, 10),
                        new vscode.Range(0, 0, 0, 10)
                    );
                    methodSymbol.detail = method.returns;
                    symbol.children.push(methodSymbol);
                });
            }
            
            symbols.push(symbol);
        } else {
            const packageSymbol = new vscode.DocumentSymbol(
                key,
                `Package: ${fullName}`,
                vscode.SymbolKind.Package,
                new vscode.Range(0, 0, 0, 10),
                new vscode.Range(0, 0, 0, 10)
            );

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

function extendsMIDlet(document) {
    const text = document.getText();

    const classExtendsMatch = text.match(/class\s+\w+\s+extends\s+MIDlet/);
    if (classExtendsMatch) return true;

    const classExtendsWithPackageMatch = text.match(/class\s+\w+\s+extends\s+[^{]*\bMIDlet\b/);
    if (classExtendsWithPackageMatch) return true;
    
    const hasMIDletImport = text.includes('import javax.microedition.midlet.MIDlet');
    const hasExtendsMIDlet = text.includes('extends MIDlet');
    
    return hasMIDletImport && hasExtendsMIDlet;
}

function getMIDletInheritedMethods() {
    return midletInheritedMethods.map(methodName => {
        const method = j2meClasses.MIDlet.methods.find(m => m.label === methodName);
        if (method) {
            const item = new vscode.CompletionItem(method.label, vscode.CompletionItemKind.Method);
            item.insertText = new vscode.SnippetString(method.insertText);
            item.documentation = new vscode.MarkdownString(method.documentation);
            item.detail = `MIDlet.${method.label} → ${method.returns}`;
            return item;
        }
        return null;
    }).filter(item => item !== null);
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
                
                if (!type) {
                    const lineText = document.lineAt(position.line).text.substring(0, position.character);
                    const isDirectCompletion = !lineText.match(/[\w\)]\.$/);
                    
                    if (isDirectCompletion && extendsMIDlet(document)) {
                        return getMIDletInheritedMethods();
                    }
                    return [];
                }
                
                if (!j2meClasses[type]) return [];
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

    const directMethodProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'java', scheme: 'file' },
        {
            provideCompletionItems(document, position) {
                const lineText = document.lineAt(position.line).text.substring(0, position.character);
                const isDirectCompletion = !lineText.match(/[\w\)]\.$/);
                
                if (isDirectCompletion && extendsMIDlet(document)) {
                    return getMIDletInheritedMethods();
                }
                
                return [];
            }
        },
        ''
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
                try {
                    const hierarchy = buildPackageHierarchy();
                    const symbols = createSymbolsFromHierarchy(hierarchy);
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