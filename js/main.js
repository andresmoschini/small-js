import * as TextWindow from './text-window.js';
main();
async function main() {
    await TextWindow.Show();
    await TextWindow.WriteLine("Hola");
    await TextWindow.PauseIfVisible();
    await TextWindow.WriteLine("Despues de una tecla");
    var k = await TextWindow.ReadKey();
    await TextWindow.WriteLine("key: " + k);
    //await TextWindow.Pause();
    //await TextWindow.Hide();
}