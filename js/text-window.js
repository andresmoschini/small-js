var component = document.getElementById('sjs-TextWindow');
var textarea = component.querySelectorAll('.sjs-TextWindow-textarea')[0];
var textInput = component.querySelectorAll('.sjs-TextWindow-textline')[0];
var numberInput = component.querySelectorAll('.sjs-TextWindow-number')[0];
var submitButon = component.querySelectorAll('.sjs-TextWindow-submit')[0];
var form = component.querySelectorAll('Form')[0];

Hide();
Clear();
var visible = false;

export function Show() {
    visible = true;
    textarea.classList.remove('hidden');
}

export function Hide() {
    visible = false;
    textarea.classList.add('hidden');
}

export function Clear() {
    textarea.value = "";
}

export function Write(msg) {
    textarea.value += msg;
}

export function WriteLine(msg) {
    textarea.value += msg + "\r\n";
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