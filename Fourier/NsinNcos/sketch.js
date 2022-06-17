let time = 0;
let wave = [];
let scalar = 40;
let slider1;
let slider2;
let multiplier = 0.95;
let width = 1400;
let height = 600;
let text_size = 20;

function setup()
{
    createCanvas(width, height);

    slider1 = createSlider(1, 15, 5);
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
    let sum = 0;

    for(let i = 1; i <= slider1.value(); i++)
    {
        let prevx = x;
        let prevy = y;
            
        radius = scalar;
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

    if (time > 2 * Math.PI) time = 0;

    wave.unshift(y);

    translate(400, 0);
    line(x - 400, y, 0, wave[0]);
    
    beginShape();
    stroke(0, 0, 0);
    noFill();
    for(let i = 0; i < wave.length; i++)
    {
        vertex(i, wave[i]);
    }
    endShape();
    
    time += slider2.value() / 1000;

    if(wave.length > 1000)
    {
        wave.pop();
    }

    translate(-600, - height / 2);
    textSize(text_size);
    fill(0);
    text("Broj kružnica [1, 15]:", -90, height * multiplier + 8);

    translate(400, 0);
    textSize(text_size);
    fill(0);
    text("Brzina [0, 100]:", -90, height * multiplier + 8);
}
