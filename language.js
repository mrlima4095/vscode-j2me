const vscode = require('vscode');

const j2meClasses = {
    Object: {
        package: 'java.lang.Object',
        description: 'The root of the class hierarchy. Every class has Object as a superclass.',
        methods: [
            { label: 'getClass', insertText: 'getClass()', documentation: 'Returns the runtime class of this Object.', returns: 'Class' },
            { label: 'hashCode', insertText: 'hashCode()', documentation: 'Returns a hash code value for the object.', returns: 'int' },
            { label: 'equals', insertText: 'equals(${1:Object})', documentation: 'Indicates whether some other object is "equal to" this one.', returns: 'boolean' },
            { label: 'toString', insertText: 'toString()', documentation: 'Returns a string representation of the object.', returns: 'String' }
        ]
    },
    Display: {
        package: 'javax.microedition.lcdui.Display',
        extends: 'Object',
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
        extends: 'Object',
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
        extends: 'Screen',
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
    Screen: {
        package: 'javax.microedition.lcdui.Screen',
        extends: 'Displayable',
        description: 'Base class for high-level user interface classes.',
        methods: [
            { label: 'getTicker', insertText: 'getTicker()', documentation: 'Gets the ticker used by this Screen.', returns: 'Ticker' },
            { label: 'setTicker', insertText: 'setTicker(${1:Ticker})', documentation: 'Sets a ticker for use with this Screen.', returns: 'void' },
            { label: 'getTitle', insertText: 'getTitle()', documentation: 'Gets the title of the Screen.', returns: 'String' },
            { label: 'setTitle', insertText: 'setTitle(${1:String})', documentation: 'Sets the title of the Screen.', returns: 'void' }
        ]
    },
    TextBox: {
        package: 'javax.microedition.lcdui.TextBox',
        extends: 'Screen',
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
        extends: 'Screen',
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
        extends: 'Screen',
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
        extends: 'Object',
        description: 'Represents an action that can be triggered by the user.',
        methods: [
            { label: 'getLabel', insertText: 'getLabel()', documentation: 'Gets the label of the command.', returns: 'String' },
            { label: 'getCommandType', insertText: 'getCommandType()', documentation: 'Gets the command type.', returns: 'int' },
            { label: 'getPriority', insertText: 'getPriority()', documentation: 'Gets the priority of the command.', returns: 'int' }
        ]
    },
    Connector: {
        package: 'javax.microedition.io.Connector',
        extends: 'Object',
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
        extends: 'Object',
        description: 'Generic connection interface.',
        methods: [
            { label: 'close', insertText: 'close()', documentation: 'Close the connection.', returns: 'void' }
        ]
    },
    HttpConnection: {
        package: 'javax.microedition.io.HttpConnection',
        extends: 'Connection',
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
        extends: 'Object',
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
        extends: 'Object',
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
    Timer: {
        package: 'java.util.Timer',
        extends: 'Object',
        description: 'Facility for threads to schedule tasks for future execution.',
        methods: [
            { label: 'schedule', insertText: 'schedule(${1:TimerTask}, ${2:Date})', documentation: 'Schedules the specified task for execution at the specified time.', returns: 'void' },
            { label: 'scheduleAtFixedRate', insertText: 'scheduleAtFixedRate(${1:TimerTask}, ${2:Date}, ${3:long})', documentation: 'Schedules the specified task for repeated fixed-rate execution.', returns: 'void' },
            { label: 'cancel', insertText: 'cancel()', documentation: 'Terminates this timer, discarding any currently scheduled tasks.', returns: 'void' }
        ]
    },
    TimerTask: {
        package: 'java.util.TimerTask',
        extends: 'Object',
        description: 'Task that can be scheduled for one-time or repeated execution by a Timer.',
        methods: [
            { label: 'run', insertText: 'run()', documentation: 'The action to be performed by this timer task.', returns: 'void' },
            { label: 'cancel', insertText: 'cancel()', documentation: 'Cancels this timer task.', returns: 'boolean' },
            { label: 'scheduledExecutionTime', insertText: 'scheduledExecutionTime()', documentation: 'Returns the scheduled execution time of the most recent actual execution of this task.', returns: 'long' }
        ]
    },
    Runnable: {
        package: 'java.lang.Runnable',
        extends: 'Object',
        description: 'Interface that should be implemented by any class whose instances are intended to be executed by a thread.',
        methods: [
            { label: 'run', insertText: 'run()', documentation: 'When an object implementing interface Runnable is used to create a thread, starting the thread causes the run method to be called.', returns: 'void' }
        ]
    },
    Thread: {
        package: 'java.lang.Thread',
        extends: 'Object',
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
    String: {
        package: 'java.lang.String',
        extends: 'Object',
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
        extends: 'Object',
        description: 'Contains several useful class fields and methods.',
        methods: [
            { label: 'currentTimeMillis', insertText: 'currentTimeMillis()', documentation: 'Returns the current time in milliseconds.', returns: 'long' },
            { label: 'arraycopy', insertText: 'arraycopy(${1:Object}, ${2:int}, ${3:Object}, ${4:int}, ${5:int})', documentation: 'Copies an array from the specified source array.', returns: 'void' },
            { label: 'getProperty', insertText: 'getProperty(${1:String})', documentation: 'Gets the system property indicated by the specified key.', returns: 'String' }
        ]
    },
    Math: {
        package: 'java.lang.Math',
        extends: 'Object',
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
        extends: 'Object',
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
        extends: 'Object',
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
    },
    Throwable: {
        package: 'java.lang.Throwable',
        extends: 'Object',
        description: 'The Throwable class is the superclass of all errors and exceptions.',
        methods: [
            { label: 'getMessage', insertText: 'getMessage()', documentation: 'Returns the detail message string of this throwable.', returns: 'String' },
            { label: 'toString', insertText: 'toString()', documentation: 'Returns a short description of this throwable.', returns: 'String' },
            { label: 'printStackTrace', insertText: 'printStackTrace()', documentation: 'Prints this throwable and its backtrace to the standard error stream.', returns: 'void' }
        ]
    },
    Exception: {
        package: 'java.lang.Exception',
        extends: 'Throwable',
        description: 'The class Exception and its subclasses are a form of Throwable.',
        methods: []
    },
    IOException: {
        package: 'java.io.IOException',
        extends: 'Exception',
        description: 'Signals that an I/O exception of some sort has occurred.',
        methods: []
    },
    RuntimeException: {
        package: 'java.lang.RuntimeException',
        extends: 'Exception',
        description: 'RuntimeException is the superclass of those exceptions that can be thrown during the normal operation of the Java Virtual Machine.',
        methods: []
    },
    IllegalArgumentException: {
        package: 'java.lang.IllegalArgumentException',
        extends: 'RuntimeException',
        description: 'Thrown to indicate that a method has been passed an illegal or inappropriate argument.',
        methods: []
    },
    IllegalStateException: {
        package: 'java.lang.IllegalStateException',
        extends: 'RuntimeException',
        description: 'Signals that a method has been invoked at an illegal or inappropriate time.',
        methods: []
    },
    NullPointerException: {
        package: 'java.lang.NullPointerException',
        extends: 'RuntimeException',
        description: 'Thrown when an application attempts to use null in a case where an object is required.',
        methods: []
    },
    ArrayIndexOutOfBoundsException: {
        package: 'java.lang.ArrayIndexOutOfBoundsException',
        extends: 'RuntimeException',
        description: 'Thrown to indicate that an array has been accessed with an illegal index.',
        methods: []
    },
    IndexOutOfBoundsException: {
        package: 'java.lang.IndexOutOfBoundsException',
        extends: 'RuntimeException',
        description: 'Thrown to indicate that an index of some sort (such as to an array, to a string, or to a vector) is out of range.',
        methods: []
    }
};

const methodCache = new Map();

function getAllMethods(className) {
    if (methodCache.has(className)) {
        return methodCache.get(className);
    }

    const allMethods = new Map();
    let currentClass = className;

    while (currentClass && j2meClasses[currentClass]) {
        const classDef = j2meClasses[currentClass];
        if (classDef.methods) {
            classDef.methods.forEach(method => {
                if (!allMethods.has(method.label)) {
                    allMethods.set(method.label, {
                        ...method,
                        inheritedFrom: currentClass
                    });
                }
            });
        }
        currentClass = classDef.extends;
    }

    const methodsArray = Array.from(allMethods.values());
    methodCache.set(className, methodsArray);
    return methodsArray;
}

function buildPackageHierarchy() {
    const root = {};
    
    Object.entries(j2meClasses).forEach(([className, classDef]) => {
        const packageParts = classDef.package.split('.');
        let currentLevel = root;
        
        packageParts.forEach((part, index) => {
            if (!currentLevel[part]) {
                currentLevel[part] = {};
            }
            if (index === packageParts.length - 1) {
                currentLevel[part]._class = {
                    name: className,
                    ...classDef
                };
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
                cls.name,
                '',
                vscode.SymbolKind.Class,
                new vscode.Range(0, 0, 0, 10),
                new vscode.Range(0, 0, 0, 10)
            );
            
            // Adiciona apenas métodos próprios da classe, não os herdados de Object
            const ownMethods = cls.methods || [];
            if (ownMethods.length > 0) {
                ownMethods.forEach(method => {
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

function inferVariableType(document, position, variableName) {
    const text = document.getText();
    const lines = text.split('\n');
    
    for (let i = position.line; i >= 0; i--) {
        const line = lines[i];
        
        const varDeclRegex = new RegExp(`(\\w+)\\s+${variableName}\\s*=`);
        const match = line.match(varDeclRegex);
        
        if (match) {
            const type = match[1];
            if (j2meClasses[type]) {
                return type;
            }
        }
        
        const newInstanceRegex = new RegExp(`${variableName}\\s*=\\s*new\\s+(\\w+)`);
        const newMatch = line.match(newInstanceRegex);
        
        if (newMatch) {
            const type = newMatch[1];
            if (j2meClasses[type]) {
                return type;
            }
        }
        
        const castRegex = new RegExp(`\\(\\s*(\\w+)\\s*\\)\\s*${variableName}`);
        const castMatch = line.match(castRegex);
        
        if (castMatch) {
            const type = castMatch[1];
            if (j2meClasses[type]) {
                return type;
            }
        }
        
        const paramRegex = new RegExp(`\\([^)]*?(\\w+)\\s+${variableName}[^)]*\\)`);
        const paramMatch = line.match(paramRegex);
        
        if (paramMatch) {
            const type = paramMatch[1];
            if (j2meClasses[type]) {
                return type;
            }
        }
    }
    
    return null;
}

function getTypeAtPosition(document, position) {
    const lineText = document.lineAt(position.line).text.substring(0, position.character);
    
    const classAccessMatch = lineText.match(/(\w+)\.$/);
    if (classAccessMatch) {
        const className = classAccessMatch[1];
        if (j2meClasses[className]) {
            return className;
        }
    }
    
    const varAccessMatch = lineText.match(/([a-zA-Z_][a-zA-Z0-9_]*)\.$/);
    if (varAccessMatch) {
        const varName = varAccessMatch[1];
        
        const varType = inferVariableType(document, position, varName);
        if (varType) {
            return varType;
        }
        
        const methodChainMatch = lineText.match(/((?:\w+\.)*)([a-zA-Z_][a-zA-Z0-9_]*)\.$/);
        if (methodChainMatch) {
            const prefix = methodChainMatch[1];
            const lastVar = methodChainMatch[2];
            
            if (prefix) {
                const chainParts = prefix.split('.').filter(Boolean);
                let currentType = chainParts[0];
                
                for (let i = 1; i < chainParts.length; i++) {
                    const methodName = chainParts[i];
                    const methods = getAllMethods(currentType);
                    const method = methods.find(m => m.label === methodName);
                    if (!method) break;
                    currentType = method.returns;
                }
                
                if (currentType && j2meClasses[currentType]) {
                    return currentType;
                }
            }
        }
    }
    
    const chainMatch = lineText.match(/((?:\w+\.)*\w+\(\)\s*\.)*(\w+\(\)\s*\.)$/);
    if (chainMatch) {
        const fullChain = chainMatch[0];
        const methodCalls = fullChain.split('.').filter(part => part.includes('()'));
        
        let currentType = null;
        
        const beforeChain = lineText.replace(fullChain, '');
        const lastPart = beforeChain.split('.').pop();
        if (lastPart && j2meClasses[lastPart]) {
            currentType = lastPart;
        } else {
            const contextMatch = beforeChain.match(/([a-zA-Z_][a-zA-Z0-9_]*)$/);
            if (contextMatch) {
                currentType = inferVariableType(document, position, contextMatch[1]);
            }
        }
        
        if (currentType) {
            for (const methodCall of methodCalls) {
                const methodName = methodCall.replace('()', '').trim();
                const methods = getAllMethods(currentType);
                const method = methods.find(m => m.label === methodName);
                if (!method) break;
                currentType = method.returns;
            }
            
            if (currentType && j2meClasses[currentType]) {
                return currentType;
            }
        }
    }
    
    return null;
}

function getCompletionItems(type) {
    if (!type || !j2meClasses[type]) {
        return [];
    }
    
    // Para sugestões, inclui TODOS os métodos (incluindo herdados de Object)
    const methods = getAllMethods(type);
    return methods.map(method => {
        const item = new vscode.CompletionItem(method.label, vscode.CompletionItemKind.Method);
        item.insertText = new vscode.SnippetString(method.insertText);
        item.documentation = new vscode.MarkdownString(
            `**${method.label}** → ${method.returns}\n\n${method.documentation}` +
            (method.inheritedFrom && method.inheritedFrom !== type ? 
             `\n\n*Inherited from ${method.inheritedFrom}*` : '')
        );
        return item;
    });
}

function getExtendedClasses(document) {
    const text = document.getText();
    const extendedClasses = [];
    
    const extendsMatch = text.match(/class\s+\w+\s+extends\s+([^{]+)/);
    if (extendsMatch) {
        const classesStr = extendsMatch[1].trim();
        const classes = classesStr.split(',').map(cls => cls.trim());
        
        classes.forEach(className => {
            const cleanName = className.replace(/<[^>]*>/g, '').trim();
            if (j2meClasses[cleanName]) {
                extendedClasses.push(cleanName);
            }
        });
    }
    
    return extendedClasses;
}

function getInheritedMethods(extendedClasses) {
    const inheritedMethods = [];
    extendedClasses.forEach(className => {
        const methods = getAllMethods(className);
        methods.forEach(method => {
            inheritedMethods.push({
                ...method,
                inheritedFrom: className
            });
        });
    });
    return inheritedMethods;
}

module.exports = {
    j2meClasses,
    buildPackageHierarchy,
    createSymbolsFromHierarchy,
    getTypeAtPosition,
    getCompletionItems,
    getExtendedClasses,
    getInheritedMethods,
    getAllMethods
};