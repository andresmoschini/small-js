// See http://smallbasic.com/doc.aspx?o=TextWindow
// TODO:
// CursorLeft propery: Gets or sets the cursor's column position on the text window.
// CursorTop propery: Gets or sets the cursor's row position on the text window.
// Left propery: Gets or sets the Left position of the Text Window.
// Title propery: Gets or sets the Title for the text window.
// Top propery: Gets or sets the Top position of the Text Window.

import * as utilities from './utilities.js';

export class TextWindowClass {
    constructor(elements) {
        elements = utilities.parseElementsOptions(elements);

        this._document = elements.document || document;
        this._componentEl = elements.component || this._document.getElementById('sjs-TextWindow');
        this._textareaEl = elements.textarea || this._componentEl.querySelectorAll('.sjs-TextWindow-textarea')[0];
        this._textInputEl = elements.textInput || this._componentEl.querySelectorAll('.sjs-TextWindow-textline')[0];
        this._numberInputEl = elements.numberInput || this._componentEl.querySelectorAll('.sjs-TextWindow-number')[0];
        this._submitButtonEl = elements.submitButton || this._componentEl.querySelectorAll('.sjs-TextWindow-submit')[0];
        this._formEl = elements.form || this._componentEl.querySelectorAll('Form')[0];
        
        this._visible = false;
        this.Hide();
        this.Clear();
    }

    // TODO: determine the best option for properties:
    // For example with BackgroundColor. The property is more 
    // simillar to SmallBasic but the property does not support 
    // asynchronous working, so have setBackgroundColor and 
    // getBackgroundColor functions sounds better. Or should I 
    // also keep the property?
    set BackgroundColor(value) { 
        this._textareaEl.style["background-color"] = value;
    }
    SetBackgroundColor(value) {
        this.BackgroundColor = value;
        return utilities.delayResponse();
    }
    get BackgroundColor() { 
        return this._textareaEl.style["background-color"]; 
    }
    GetBackgroundColor() {
        return utilities.delayResponse(this.BackgroundColor);
    }

    set ForegroundColor(value) {
        this._textareaEl.style["color"] = value;
    }
    SetForegroundColor(value) {
        this.ForegroundColor = value;
        return utilities.delayResponse();
    }
    get ForegroundColor() {
        return this._textareaEl.style["color"];
    }
    GetForegroundColor() {
        return utilities.delayResponse(this.ForegroundColor);
    }

    Show() {
        this._visible = true;
        this._componentEl.classList.remove('hidden');
        return utilities.delayResponse();
    }

    Hide() {
        this._visible = false;
        this._componentEl.classList.add('hidden');
        return utilities.delayResponse();
    }

    Clear() {
        this._textareaEl.value = "";
        return utilities.delayResponse();
    }

    Write(msg) {
        this._textareaEl.value += msg;
        return utilities.delayResponse();
    }

    async WriteLine(msg) {
        this._textareaEl.value += msg + "\r\n";
        return utilities.delayResponse();
    }

    async Pause() {
        await this.WriteLine("Press any key . . .");
        await this.PauseWithoutMessage();
    }

    async PauseWithoutMessage() {
        await this.ReadKey();
    }

    async ReadKey() {
        this._textareaEl.focus();
        return await new Promise(resolve => {
            var handler = e => {
                this._textareaEl.removeEventListener("keypress", handler);
                resolve(e.key);
                // e.key (character) => character (ex. 'a')
                // e.key (special keys) => key name (ex. 'Enter')
                // e.charCode (characters) => (ex. 'a' => 97)
                // e.keyCode (characters) => 0
                // e.charCode (special keys) => 0
                // e.keyCode (special keys) => (ex. 'Enter' => 13)
            };
            this._textareaEl.addEventListener("keypress", handler);
        }); 
    }

    async ReadLine() {
        this._textInputEl.value = "";
        this._textInputEl.classList.remove('hidden');
        this._submitButtonEl.classList.remove('hidden');
        this._textInputEl.focus();
        return await new Promise(resolve => {
            var handler = e => {
                e.preventDefault();
                this._formEl.onsubmit = null;
                this._submitButtonEl.classList.add('hidden');
                this._textInputEl.classList.add('hidden');
                resolve(this._textInputEl.value);
                return false;
            };
            this._formEl.onsubmit = handler;
        });
    }

    async ReadNumber() {
        this._numberInputEl.value = "";
        this._numberInputEl.classList.remove('hidden');
        this._submitButtonEl.classList.remove('hidden');
        this._numberInputEl.focus();
        return await new Promise(resolve => {
            var handler = e => {
                e.preventDefault();
                this._formEl.onsubmit = null;
                this._submitButtonEl.classList.add('hidden');
                this._numberInputEl.classList.add('hidden');
                resolve(Number(this._numberInputEl.value));
                return false;
            };
            this._formEl.onsubmit = handler;
        });
    }

    async PauseIfVisible() {
        if (this._visible) {
            await this.Pause();
        }
    }
}

export var TextWindow = new TextWindowClass(document.getElementById('sjs-TextWindow'));
