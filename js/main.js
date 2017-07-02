import { 
    TextWindow, 
    GraphicsWindow,
} from './small-js.js';

main();

async function main() {
    await TextWindow.Show();
    await GraphicsWindow.Show();
    GraphicsWindow.BackgroundColor = "green";
    await TextWindow.WriteLine("Hola");
    await TextWindow.PauseIfVisible();
    TextWindow.BackgroundColor = "pink";
    TextWindow.ForegroundColor = "red";
    await TextWindow.WriteLine(TextWindow.BackgroundColor);
    GraphicsWindow.PenColor = "yellow";
    GraphicsWindow.BrushColor = "violet";
    GraphicsWindow.PenWidth = 3;
    GraphicsWindow.DrawLine(5, 5, 100, 100);
    await GraphicsWindow.DrawRectangle(5, 5, 20, 20);
    await GraphicsWindow.FillRectangle(20, 20, 50, 50);
    GraphicsWindow.PenColor = "orange";
    GraphicsWindow.PenWidth = 10;
    await GraphicsWindow.DrawRectangle(40, 40, 100, 100);

    // while (true) {
    //     await TextWindow.WriteLine(`(${GraphicsWindow.MouseX}, ${GraphicsWindow.MouseY})`);
    // }
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
