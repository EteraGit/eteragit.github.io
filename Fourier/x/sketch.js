let time = 0;
let wave = [];
let a_n = [];
let b_n = [];
let funkcija = [];
let scalar = 50;
let number_of_circles = 10;
let slider1;
let slider2;
let width = 1400;
let height = 600;
let multiplier = 0.9;
let text_size = 20;
let prvi = 0;

function f(x)
{
    return x;
}

function f_pom(x)
{
    if(x - Math.PI >= 0) return x - Math.PI;
    return x + Math.PI;
}

function f_sin(f, n, x)
{
    return f(x) * sin(n * x);
}

function f_cos(f, n, x)
{
    return f(x) * cos(n * x);
}

function integrate_f_trig(f_trig, f, k, a, b, n)
{
    let suma = 0;
    let h = (b - a) / n;
    for(let i = 0; i < n; i++)
    {
        suma += f_trig(f, k, a + i * h) * h;
    }
    return suma / Math.PI;
}

function integrate_f(f, a, b, n)
{
    let suma = 0;
    let h = (b - a) / n;
    for(let i = 0; i < n; i++)
    {
        suma += f(a + i * h) * h;
    }
    return suma / Math.PI;
}

function setup()
{
    createCanvas(width, height);

    b_n.push(0);

    for(k = 1; k <= 100; k++)
    {
        b_n.push(integrate_f_trig(f_sin, f, k, -Math.PI, Math.PI, 1000));
    }

    slider1 = createSlider(1, 40, 5);
    slider1.position(210, height * multiplier);
    slider1.style('width', '80px');

    slider2 = createSlider(0, 100, 25);
    slider2.position(570, height * multiplier);
    slider2.style('width', '80px');
}

function draw() 
{
    background(255);

    textSize(text_size);
    fill(0);
    text("Broj kružnica = " + slider1.value(), 10, 30);

    translate(300, height / 2);

    let x = 0;
    let y = 0;

    for(let i = 1; i <= slider1.value(); i++)
    {
        let prevx = x;
        let prevy = y;

        radius = scalar * b_n[i];
        x += radius * cos(i * time);
        y += radius * sin(i * time);
    
        stroke(50);
        noFill();
        ellipse(prevx, prevy, Math.sqrt((x - prevx) * (x - prevx) + (y - prevy) * (y - prevy)) * 2); 

        stroke(50, 10, 250);
        line(prevx, prevy, x, y);
        fill(0);
        stroke(0, 0, 0);
        ellipse(x, y, 3);
    }

    if(time > 2 * Math.PI) time = 0;

    funkcija.unshift(scalar * f_pom(time) - 156);

    wave.unshift(y);

    translate(300, 0);
    line(x - 300, y, 0, wave[0]);
    
    beginShape();
    stroke(0, 0, 0);
    noFill();
    for(let i = 0; i < wave.length; i++)
    {
        vertex(i, wave[i]);
    }
    endShape();

    beginShape();
    stroke(255, 0, 0);
    noFill();
    for(let i = 0; i < funkcija.length; i++)
    {
        vertex(i, funkcija[i]);   
    }
    endShape();
    time += slider2.value() / 1000;

    if (wave.length > 10) prvi = 10;

    if(wave.length > 1000)
    {
        wave.pop();
        funkcija.pop();
    }
    stroke(0, 0, 0);

    translate(-600, - height / 2);
    textSize(text_size);
    fill(0);
    text("Broj kružnica [1, 40]:", 10, height * multiplier + 8);

    translate(400, 0);
    textSize(text_size);
    fill(0);
    text("Brzina [0, 100]:", 10, height * multiplier + 8);
}
