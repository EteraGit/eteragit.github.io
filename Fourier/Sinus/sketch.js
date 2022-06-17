let time = 0;
let wave = [];
let scalar = 100;
let width = 1400;
let height = 600;

function setup()
{
    createCanvas(width, height);
}

function draw()
{
    background(255);

    fill(0);

    translate(300, height / 2);

    let x = 0;
    let y = 0;

    let prevx = x;
    let prevy = y;
        
    radius = scalar;
    x += radius * cos(time);
    y += radius * sin(time);
    
    stroke(50);
    noFill();
    ellipse(prevx, prevy, Math.sqrt((x - prevx) * (x - prevx) + (y - prevy) * (y - prevy)) * 2); 

    stroke(50, 10, 250);
    line(prevx, prevy, x, y);
    fill(0);
    stroke(0, 0, 0);
    ellipse(x, y, 3);

    if (time > 2 * Math.PI) time = 0;

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
    
    time += 0.025;

    if(wave.length > 1000)
    {
        wave.pop();
    }
}
