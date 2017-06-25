// See 
// * http://smallbasic.com/doc.aspx?o=GraphicsWindow
// * https://social.technet.microsoft.com/wiki/contents/articles/16368.small-basic-curriculum-lesson-2-1-graphics-window.aspx
// 
// TODO:
// All methods, properties and events



var component = document.getElementById('sjs-GraphicsWindow');
var canvas = component.getElementsByTagName('Canvas')[0];
var context = canvas.getContext("2d");

Hide();
Clear();
var visible = false;

export function Show() {
    visible = true;
    component.classList.remove('hidden');
}

export function Hide() {
    visible = false;
    component.classList.add('hidden');
}

export function Clear() {
    context.clearRect(0, 0, 500, 500); // TODO: ensure to clear all
}

