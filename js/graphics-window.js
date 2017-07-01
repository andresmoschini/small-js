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

        this.Hide();
        this.Clear();
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
}

export var GraphicsWindow = new GraphicsWindowClass(document.getElementById('sjs-GraphicsWindow'));
