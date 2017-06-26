// See http://smallbasic.com/doc.aspx?o=TextWindow
// TODO:
// ForegroundColor propery: Gets or sets the foreground color of the text to be output in the text window.
// BackgroundColor propery: Gets or sets the background color of the text to be output in the text window.
// CursorLeft propery: Gets or sets the cursor's column position on the text window.
// CursorTop propery: Gets or sets the cursor's row position on the text window.
// Left propery: Gets or sets the Left position of the Text Window.
// Title propery: Gets or sets the Title for the text window.
// Top propery: Gets or sets the Top position of the Text Window.

var component = document.getElementById('sjs-TextWindow');
var textarea = component.querySelectorAll('.sjs-TextWindow-textarea')[0];
var textInput = component.querySelectorAll('.sjs-TextWindow-textline')[0];
var numberInput = component.querySelectorAll('.sjs-TextWindow-number')[0];
var submitButon = component.querySelectorAll('.sjs-TextWindow-submit')[0];
var form = component.querySelectorAll('Form')[0];

function delayResponse(value) {
    return new Promise(resolve => setTimeout(() => resolve(value), 0));
}

Hide();
Clear();
var visible = false;

export function Show() {
    visible = true;
    component.classList.remove('hidden');
    return delayResponse();
}

export function Hide() {
    visible = false;
    component.classList.add('hidden');
    return delayResponse();
}

export function Clear() {
    textarea.value = "";
    return delayResponse();
}

export function Write(msg) {
    textarea.value += msg;
    return delayResponse();
}

export async function WriteLine(msg) {
    textarea.value += msg + "\r\n";
    return delayResponse();
}

export async function Pause() {
    await WriteLine("Press any key . . .");
    await PauseWithoutMessage();
}

export async function PauseWithoutMessage() {
    await ReadKey();
}

export async function ReadKey() {
    textarea.focus();
    return await new Promise(resolve => {
        var handler = e => {
            textarea.removeEventListener("keypress", handler);
            resolve(e.charCode);
        };
        textarea.addEventListener("keypress", handler);
    }); 
        // e.key (character) => character (ex. 'a')
        // e.key (special keys) => key name (ex. 'Enter')
        // e.charCode (characters) => (ex. 'a' => 97)
        // e.keyCode (characters) => 0
        // e.charCode (special keys) => 0
        // e.keyCode (special keys) => (ex. 'Enter' => 13)
}

export async function ReadLine() {
    textInput.value = "";
    textInput.classList.remove('hidden');
    submitButon.classList.remove('hidden');
    textInput.focus();
    return await new Promise(resolve => {
        var handler = e => {
            e.preventDefault();
            form.onsubmit = null;
            submitButon.classList.add('hidden');
            textInput.classList.add('hidden');
            resolve(textInput.value);
            return false;
        };
        form.onsubmit = handler;
    });
}

export async function ReadNumber() {
    numberInput.value = "";
    numberInput.classList.remove('hidden');
    submitButon.classList.remove('hidden');
    numberInput.focus();
    return await new Promise(resolve => {
        var handler = e => {
            e.preventDefault();
            form.onsubmit = null;
            submitButon.classList.add('hidden');
            numberInput.classList.add('hidden');
            resolve(Number(numberInput.value));
            return false;
        };
        form.onsubmit = handler;
    });
}

export async function PauseIfVisible() {
    if (visible) {
        await Pause();
    }
}