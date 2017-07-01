import { 
    TextWindow, 
    GraphicsWindow,
} from './small-js.js';

main();

async function main() {
    await TextWindow.Show();
    await GraphicsWindow.Show();
    await TextWindow.WriteLine("Hola");
    await TextWindow.PauseIfVisible();
    TextWindow.BackgroundColor = "pink";
    TextWindow.ForegroundColor = "red";
    await TextWindow.WriteLine(TextWindow.BackgroundColor);
    await TextWindow.WriteLine("Despues de una tecla");
    var k = await TextWindow.ReadKey();
    await TextWindow.WriteLine("key: " + k);
    await TextWindow.WriteLine("Ingrese una línea:");
    var l = await TextWindow.ReadLine();
    await TextWindow.WriteLine("line: " + l);
    await TextWindow.WriteLine("Ingrese un número:");
    var n = await TextWindow.ReadNumber();
    await TextWindow.WriteLine("number: " + n);
    // while (true) {
    //     await TextWindow.setBackgroundColor("green");
    //     await TextWindow.setBackgroundColor("red");
    // }
    // while (true) {
    //     await TextWindow.WriteLine("Hola");
    // }
    //await TextWindow.Pause();
    //await TextWindow.Hide();
}
