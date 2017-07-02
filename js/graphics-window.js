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

        this._document = elements.document || document;
        this._componentEl = elements.component || this._document.getElementById('sjs-GraphicsWindow');
        this._canvasEl = elements.canvas || this._componentEl.getElementsByTagName('Canvas')[0];
        this._canvasContext2d = this._canvasEl.getContext("2d");
        this._visible = false;

        this._lastKey = null;
        this._mouseX = null;
        this._mouseY = null;

        this.Hide();
        this.Clear();

        this._lastDownTarget = null;
        this._document.addEventListener("mousedown", e => {
            this._lastDownTarget = e.target;
        }, false);
        this._document.addEventListener("keypress", e => {
            if(this._lastDownTarget == this._canvasEl) {
                this._lastKey = e.key;
            }         
        }, false);
        
        // this._canvasEl.addEventListener("mousemove", e => {
        //     this._mouseX = canvasOffset.left;
        //     this._mouseY = canvasOffset.top;
        // }, false);
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
        this._canvasContext2d.clearRect(0, 0, this._canvasEl.width, this._canvasEl.height);
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
        this._canvasContext2d.fillStyle = value;
    }
    get BrushColor() { 
        return this._canvasContext2d.fillStyle;
    }

    set PenWidth(value) { 
        this._canvasContext2d.lineWidth = value;
    }
    get PenWidth() { 
        return this._canvasContext2d.lineWidth;
    }

    set PenColor(value) { 
        this._canvasContext2d.strokeStyle = value;
    }
    get PenColor() { 
        return this._canvasContext2d.strokeStyle;
    }

    get LastKey() { 
        return this._lastKey;
    }

    get MouseX() { 
        return this._mouseX;
    }
    get MouseY() { 
        return this._mouseY;
    }

    DrawRectangle(x, y, width, height) {
        this._canvasContext2d.strokeRect(x, y, width, height);
        return utilities.delayResponse();
    }

    FillRectangle(x, y, width, height) {
        this._canvasContext2d.fillRect(x, y, width, height);
        return utilities.delayResponse();
    }

    DrawLine(x1, y1, x2, y2) {
        this._canvasContext2d.moveTo(x1, y1);
        this._canvasContext2d.lineTo(x2, y2);
        this._canvasContext2d.stroke();
        return utilities.delayResponse();
    }
}

export var GraphicsWindow = new GraphicsWindowClass(document.getElementById('sjs-GraphicsWindow'));
