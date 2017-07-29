// See 
// * http://smallbasic.com/doc.aspx?o=GraphicsWindow
// * https://social.technet.microsoft.com/wiki/contents/articles/16368.small-basic-curriculum-lesson-2-1-graphics-window.aspx
// 
// TODO:
// All methods, properties and events

import * as utilities from './utilities.js';

export class MouseClass {
    constructor(elements) {
        this._document = elements.document || document;
        this._componentEl = elements.component;
        this._mouseX = null;
        this._mouseY = null;
        this._isLeftButtonDown = false;
        this._isRigthButtonDown = false;
        this._isMiddleButtonDown = false;

        this._componentEl.addEventListener("mousedown", e => {
            this._updateButtons(e.buttons);
        }, false);

        this._componentEl.addEventListener("mouseup", e => {
            this._updateButtons(e.buttons);
        }, false);

        this._componentEl.addEventListener("mousemove", e => {
            this._mouseX = e.offsetX;
            this._mouseY = e.offsetY;
        }, false);
    }

    _updateButtons(buttonsFlag) {
        this._isLeftButtonDown = (buttonsFlag & 1) == 1;
        this._isRigthButtonDown = (buttonsFlag & 2) == 2;
        this._isMiddleButtonDown = (buttonsFlag & 4) == 4;
    }

    get MouseX() { 
        return this._mouseX;
    }
    get MouseY() { 
        return this._mouseY;
    }
    get IsLeftButtonDown() { 
        return this._isLeftButtonDown;
    }
    get IsRigthButtonDown() { 
        return this._isRigthButtonDown;
    }
    get IsMiddleButtonDown() { 
        return this._isMiddleButtonDown;
    }
}

export class GraphicsWindowClass {
    constructor(elements) {
        elements = utilities.parseElementsOptions(elements);

        this._document = elements.document || document;
        this._componentEl = elements.component || this._document.getElementById('sjs-GraphicsWindow');
        this._canvasEl = elements.canvas || this._componentEl.getElementsByTagName('Canvas')[0];
        this._canvasContext2d = this._canvasEl.getContext("2d");
        this._title = this._componentEl.getElementsByTagName('h2')[0];
        this._visible = false;

        this._mouseDown = null;
        this._mouseUp = null;
        this._mouseMove = null;
        this._lastKey = null;

        this.Hide();
        this.Clear();

        this._mouse = new MouseClass({ document: this._document, component: this._canvasEl });

        this._lastDownTarget = null;
        this._document.addEventListener("mousedown", e => {
            this._lastDownTarget = e.target;
        }, false);
        this._canvasEl.addEventListener("keypress", e => {
            if (this._lastDownTarget == this._canvasEl) {
                this._lastKey = e.key
            }
        }, false);
        this._canvasEl.addEventListener("mousedown", e => {
            this._mouseDown && this._mouseDown();
        }, false);
        this._canvasEl.addEventListener("mouseup", e => {
            this._mouseUp && this._mouseUp();
        }, false);
        this._canvasEl.addEventListener("mousemove", e => {
            this._mouseMove && this._mouseMove();
        }, false);
    }

    get Mouse() { 
        return this._mouse;
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
    SetBackgroundColor(value) {
        this.BackgroundColor = value;
        return utilities.delayResponse();
    }
    get BackgroundColor() { 
        return this._canvasEl.style["background-color"]; 
    }
    GetBackgroundColor() {
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


    set MouseDown(value) { 
        console.log([ "MouseDown", value ]);
        this._mouseDown = value;
    }
    get MouseDown() { 
        return this._mouseDown; 
    }
    set MouseUp(value) { 
        this._mouseUp = value;
    }
    get MouseUp() { 
        return this._mouseUp; 
    }
    set MouseMove(value) { 
        this._mouseMove = value;
    }
    get MouseMove() { 
        return this._mouseMove; 
    }

    get LastKey() { 
        return this._lastKey;
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

    SetPixel(x, y, color) {
        console.log(`color: ${color}`);
        var rgb = utilities.colorToRgb(color);
        var pixel = this._canvasContext2d.createImageData(1, 1);
        var data = pixel.data;
        data[0] = rgb[0];
        data[1] = rgb[1];
        data[2] = rgb[2];
        data[3] = 255;
        this._canvasContext2d.putImageData(pixel, x, y);
        return utilities.delayResponse();
    }

    GetPixel(x, y) {
        var pixel = this._canvasContext2d.getImageData(x, y, 1, 1);
        var data = pixel.data;
        var color = utilities.rgbToKeyword(data) || utilities.rgbToHex(data);
        return utilities.delayResponse(color);
    }

    SetTitle(value) {
        this._title.innerText = value;
        return utilities.delayResponse();
    }

    GetTitle() {
        return utilities.delayResponse(this._title.innerText);
    }
}

export var GraphicsWindow = new GraphicsWindowClass(document.getElementById('sjs-GraphicsWindow'));
export var Mouse = GraphicsWindow.Mouse;
