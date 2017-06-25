var el = document.getElementById('sjs-TextWindow');
Hide();
Clear();
var visible = false;

export function Show() {
    visible = true;
    el.classList.remove('hidden');
}

export function Hide() {
    visible = false;
    el.classList.add('hidden');
}

export function Clear() {
    el.value = "";
}

export function WriteLine(msg) {
    el.value += msg + "\r\n";
}

export async function Pause() {
    await WriteLine("Press any key . . .");
    await PauseWithoutMessage();
}

export async function PauseWithoutMessage() {
    await new Promise(resolve => 
        el.addEventListener("keypress", resolve));
}

export async function PauseIfVisible() {
    if (visible) {
        await Pause();
    }
}