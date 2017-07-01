// See 
// * http://smallbasic.com/doc.aspx?o=GraphicsWindow
// * https://social.technet.microsoft.com/wiki/contents/articles/16368.small-basic-curriculum-lesson-2-1-graphics-window.aspx
// 
// TODO:
// All methods, properties and events

import * as utilities from './utilities.js';

export class GraphicsWindowClass {
    constructor(elements) {
        elements = utilities.parseElementsOptions(elements);

        this._componentEl = elements.component || document.getElementById('sjs-GraphicsWindow');
        this._canvasEl = elements.canvas || this._componentEl.getElementsByTagName('Canvas')[0];
        this._canvasContext2d = this._canvasEl.getContext("2d");
        this._visible = false;

        this._brushColor = "black";
        this._penWidth = 1;
        this._penColor = "black";
        this._lastKey = null;

        this.Hide();
        this.Clear();

        this._lastDownTarget = null;
        document.addEventListener("mousedown", e => {
            this._lastDownTarget = e.target;
        }, false);
        document.addEventListener("keypress", e => {
            if(this._lastDownTarget == this._canvasEl) {
                this._lastKey = e.key;
            }         
        }, false);
    }

    Show() {
        this._visible = true;
        this._componentEl.classList.remove('hidden');
    }
    
    Hide() {
        this._visible = false;
        this._componentEl.classList.add('hidden');
    }

    Clear() {
        this._canvasContext2d.clearRect(0, 0, 500, 500); // TODO: ensure to clear all
    }

    set BackgroundColor(value) { 
        this._canvasEl.style["background-color"] = value;
    }
    setBackgroundColor(value) {
        this.BackgroundColor = value;
        return utilities.delayResponse();
    }
    get BackgroundColor() { 
        return this._canvasEl.style["background-color"]; 
    }
    getBackgroundColor() {
        return utilities.delayResponse(this.BackgroundColor);
    }

    set BrushColor(value) { 
        this._brushColor = value;
    }
    get BrushColor() { 
        return this._brushColor;
    }

    set PenWidth(value) { 
        this._penWidth = value;
    }
    get PenWidth() { 
        return this._penWidth;
    }

    set PenColor(value) { 
        this._penColor = value;
    }
    get PenColor() { 
        return this._penColor;
    }

    get LastKey() { 
        return this._lastKey;
    }
}

export var GraphicsWindow = new GraphicsWindowClass(document.getElementById('sjs-GraphicsWindow'));
