let time = 0;
let wave = [];
let scalar = 0.8;
let number_of_circles = 4;
let width = 1400;
let height = 600;
let multiplier = 0.9;
let text_size = 20;
let skip = 10;
let complex_array = [];
let Fourierovi_Koeficijenti = [];
let brzina = 500;
let offsetX = 300;
let offsetY = 300;
let blue = (50, 10, 250); 
let orange = (255, 165, 0);
let lavender = (230, 230, 250);
let slider1;
let slider2;
let prvi = 0;
let prosli;

function numerička_integracija(n, array)
{
    sum = 0;
    for(let i = 0; i < array.length; i++)
    {
        sum = math.add(sum, math.divide(math.multiply(array[i], math.exp(math.complex(0, (-n * 2 * Math.PI * i/array.length)))), array.length));
    }
    return sum;
}

function setup()
{
    if(prvi == 0)
    {
        prvi = 1;
        createCanvas(width, height);
        slider1 = createSlider(2, 35, 20);
        slider1.position(210, height * multiplier);
        slider1.style('width', '80px');
    }

    prosli = slider1.value();

    complex_array = [];
    Fourierovi_Koeficijenti = [];
    for(let i = 0; i < pi_X.length; i+= skip)
    {
        complex_array.push(math.complex((pi_X[i] - offsetX) * scalar, (pi_Y[i] - offsetY) * scalar));
    }

    Fourierovi_Koeficijenti.push(numerička_integracija(0, complex_array));
    for(let i = 1; i <= slider1.value(); i++)
    {
        Fourierovi_Koeficijenti.push(numerička_integracija(-i, complex_array));
        Fourierovi_Koeficijenti.push(numerička_integracija(i, complex_array));
    }
}

function draw()
{
    background(255);

    if(prosli != slider1.value())
    {
        setup();
    }

    strokeWeight(1);
    textSize(text_size);
    fill(0);
    let br = 1 + slider1.value() * 2;
    text("Broj kružnica = " + br, 10, 30);

    translate (width / 2, height / 2);

    let z = math.complex(0, 0);

    let cc = ComplexCircles(z, Fourierovi_Koeficijenti, time);
    wave.unshift(cc);

    if (wave.length > brzina) wave.pop();

    beginShape();
    stroke(0, 0, 0);
    strokeWeight(5);
    noFill();
    for(let i = 0; i < wave.length; i++)
    {
        vertex(wave[i].re, wave[i].im);
    }
    endShape();

    time += 1 / brzina;

    if(time > 1)
    {
        time = 0;
    }
    strokeWeight(1);
    translate(-600, - height / 2);
    textSize(text_size);
    fill(0);
    text("Broj kružnica [5, 71]:", -90, height * multiplier + 8);
}

function ComplexCircles(z, Fourierovi_Koeficijenti, time)
{
    for(let i = 0; i < Fourierovi_Koeficijenti.length / 2; i++)
    {
        if (i != 0)
        {
            prevx = z.re;
            prevy = z.im;
    
            z = math.add(z, math.multiply(Fourierovi_Koeficijenti[2*i - 1], math.exp(math.complex(0, i * 2 * Math.PI * time))));
            let radius = math.sqrt(Fourierovi_Koeficijenti[2*i - 1].re * Fourierovi_Koeficijenti[2*i - 1].re + Fourierovi_Koeficijenti[2*i - 1].im * Fourierovi_Koeficijenti[2*i - 1].im);
    
            stroke(0, 0, 0);
            noFill();
            ellipse(prevx, prevy, radius * 2);
            
            stroke(50, 10, 250);
            line(prevx, prevy, z.re, z.im);
            fill(0);
            stroke(255, 165, 0);
            ellipse(z.re, z.im, 3);
        }

        prevx = z.re;
        prevy = z.im;

        z = math.add(z, math.multiply(Fourierovi_Koeficijenti[2*i], math.exp(math.complex(0, -i * 2 * Math.PI * time))));
        let radius = math.sqrt(Fourierovi_Koeficijenti[2*i].re * Fourierovi_Koeficijenti[2*i].re + Fourierovi_Koeficijenti[2*i].im * Fourierovi_Koeficijenti[2*i].im);

        stroke(0, 0, 0);
        strokeWeight(1);
        noFill();
        ellipse(prevx, prevy, radius * 2); 

        stroke(50, 10, 250);
        strokeWeight(1);
        line(prevx, prevy, z.re, z.im);
        fill(0);
        stroke(255, 165, 0);
        ellipse(z.re, z.im, 3);
    }
    return z;
}