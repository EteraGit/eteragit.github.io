let time = 0;
let wave = [];

function setup()
{
    createCanvas(800, 600);
}

function draw()
{
    background(0);
    translate(200,300);
    let radius = 50;

    let x = 0;
    let y = 0;

    for(let i = 1; i < 6; i++)
    {
        let prevx = x;
        let prevy = y;
        
        x += radius * cos(i * time);
        y += radius * sin(i * time);
    
        stroke(200);
        noFill();
        ellipse(prevx, prevy, radius * 2);    

        stroke(255);
        line(prevx, prevy, x, y);
        ellipse(x, y, 4);
    }

    wave.unshift(y);

    translate(300, 0);
    line(x - 300, y, 0, wave[0]);
    
    beginShape();
    noFill();
    for(let i = 0; i < wave.length; i++)
    {
        vertex(i, wave[i]);
    }
    endShape();
    
    time += 0.025;

    if(wave.length > 300)
    {
        wave.pop();
    }
}