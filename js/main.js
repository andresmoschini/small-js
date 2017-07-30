import { 
    TextWindow, 
    GraphicsWindow,
    Mouse,
} from './small-js.js';

main();

async function main() {
    await TextWindow.Show();
    await GraphicsWindow.Show();
    
    await GraphicsWindow.SetBackgroundColor("green");
    
    await GraphicsWindow.SetTitle(await GraphicsWindow.GetTitle() + "!");

    GraphicsWindow.MouseDown = OnMouseDown;
    GraphicsWindow.MouseMove = OnMouseMove;

    //TextWindow.WriteLine(Mouse);

    async function OnMouseDown() {
        // TODO: is it necessary to identify last button clicked?
        var text = "";
        if (Mouse.IsLeftButtonDown) {
            await GraphicsWindow.SetTitle("The left mouse button was clicked.");
        } else if (Mouse.IsRigthButtonDown) {
            await GraphicsWindow.SetTitle("The right mouse button was clicked.");
        } else if (Mouse.IsMiddleButtonDown) {
            await GraphicsWindow.SetTitle("The middle mouse button was clicked.");
        }
    }

    async function OnMouseMove() {
        await GraphicsWindow.SetTitle("Mouse moved to " + Mouse.MouseX + ", " + Mouse.MouseY);
    }

    /*
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
    await GraphicsWindow.SetPixel(50, 50, "red");
    await GraphicsWindow.SetPixel(50, 51, "red");
    await GraphicsWindow.SetPixel(50, 52, "red");
    await GraphicsWindow.SetPixel(50, 53, "red");
    await GraphicsWindow.SetPixel(50, 54, "red");
    await GraphicsWindow.SetPixel(50, 55, "red");
    var color = await GraphicsWindow.GetPixel(50, 50);
    await TextWindow.WriteLine("color: " + color);
    GraphicsWindow.PenColor = "orange";
    GraphicsWindow.PenWidth = 10;
    await GraphicsWindow.DrawRectangle(40, 40, 100, 100);
*/
    // while (true) {
    //     await TextWindow.WriteLine(`(${GraphicsWindow.MouseX}, ${GraphicsWindow.MouseY})`);
    // }
    /*
    await TextWindow.WriteLine("Despues de una tecla");
    var k = await TextWindow.ReadKey();
    await TextWindow.WriteLine("key: " + k);
    await TextWindow.WriteLine("Ingrese una línea:");
    var l = await TextWindow.ReadLine();
    await TextWindow.WriteLine("line: " + l);
    await TextWindow.WriteLine("Ingrese un número:");
    var n = await TextWindow.ReadNumber();
    await TextWindow.WriteLine("number: " + n);
    */
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
