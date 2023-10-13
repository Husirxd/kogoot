"use client"
import { useEffect } from 'react';
import './Hero.scss';

const Hero = () => {


useEffect(()=>{

//load canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const matchingFactor = 0.02;
const centeringFactor = 0.0005;

const visionRadius = 100;
const separationRadius = 30;

const avoidFactor = 0.04;

const maxSpeed = 2;
const minSpeed = 1;

const boids = 100;

let closeBoids = [];

var triangles = [];
for (var i = 0; i < boids; i++) {
    triangles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random()  * 4 - 2,
        vy: Math.random()  * 4 - 2,
        color: "hsl(" + (Math.random() * 40 + 40)  + ", 100%, 80%)",
        size: Math.random()* 6 + 3
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < triangles.length; i++) {
        let triangle = triangles[i];

        ctx.beginPath();
        ctx.moveTo(triangle.x, triangle.y);
        ctx.arc(triangle.x , triangle.y, triangle.size, 0, Math.PI * 2, false);
        ctx.fillStyle = triangle.color;
        ctx.fill();


    }
}

//move triangles

let close_pos = [0,0];

let xvel_avg = 0;
let yvel_avg = 0;
let neighbor_count = 0;

let xpos_avg = 0;
let ypos_avg = 0;
function update() {

    for (var i = 0; i < triangles.length; i++) {
        close_pos = [0,0];
        xvel_avg = 0;
        yvel_avg = 0;
        neighbor_count = 0;
        xpos_avg = 0;
        ypos_avg = 0;
        closeBoids = [];
        let triangle = triangles[i];
        for(let j = 0; j < triangles.length; j++) {
            if(triangle == triangles[j]) break;
            let other = triangles[j];

           //centering(triangle);
            if(getDistance(triangle.x, triangle.y, other.x, other.y) < visionRadius) {
                xvel_avg += other.vx;
                yvel_avg += other.vy;
                xpos_avg += other.x;
                ypos_avg += other.y;
                neighbor_count++;
            }
            avoidCollision(triangle, other);

        }
 
    if(neighbor_count > 0){
    matchVelocity(triangle);
    centering(triangle);
    
    //drawLines(triangle);
    }

    avoidWall(triangle);
    normalizeSpeed(triangle);
    triangle.vx += close_pos[0];
    triangle.vy += close_pos[1];
    triangle.x += triangle.vx;
    triangle.y += triangle.vy;

    }
}


function getDistance(x1, y1, x2, y2) {
    let x = x1 - x2;
    let y = y1 - y2;
    return Math.sqrt(x * x + y * y);
}

function avoidCollision(triangle, other) {
    let dist = getDistance(triangle.x, triangle.y, other.x, other.y);
    if(dist < separationRadius) {
        close_pos[0] = (triangle.x - other.x) * avoidFactor;
        close_pos[1] = (triangle.y - other.y) * avoidFactor;
        closeBoids.push(other);
    }
}

function normalizeSpeed(triangle) {
    let speed = Math.sqrt(triangle.vx * triangle.vx + triangle.vy * triangle.vy);
    if(speed > maxSpeed) {
        triangle.vx = (triangle.vx / speed) * maxSpeed;
        triangle.vy = (triangle.vy / speed) * maxSpeed;
    }
    if(speed < minSpeed) {
        triangle.vx = (triangle.vx / speed) * minSpeed;
        triangle.vy = (triangle.vy / speed) * minSpeed;
    }
}

function matchVelocity(triangle) {
    triangle.vx += ( xvel_avg / neighbor_count - triangle.vx) * matchingFactor;
    triangle.vy += ( yvel_avg / neighbor_count - triangle.vy) * matchingFactor;
}

function centering(triangle) {
    triangle.vx += (xpos_avg / neighbor_count - triangle.x) * centeringFactor;
    triangle.vy += (ypos_avg / neighbor_count - triangle.y) * centeringFactor;
}


function avoidWall(triangle) {
    if(triangle.x < 100) {
        triangle.vx += avoidFactor;
    }
    if(triangle.x > canvas.width - 100) {
        triangle.vx -= avoidFactor;
    }
    if(triangle.y < 70) {
        triangle.vy += avoidFactor;
    }
    if(triangle.y > canvas.height - 70) {
        triangle.vy -= avoidFactor;
    }
}
    
//loop
function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
}

function drawLines(triangle) {
    for(let i = 0; i < closeBoids.length; i++) {
        ctx.beginPath();
        ctx.moveTo(triangle.x, triangle.y);
        ctx.lineTo(closeBoids[i].x, closeBoids[i].y);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
}


loop();


    },[])
    
    return (
        <div className='hero'>
            <div className="hero__text">
                <h1>KOGOOT</h1>
                <p>Free & Open Sourced Quiz Generator</p>
            </div>
            <canvas id="canvas" width="1920" height="720"></canvas>
        </div>
    );

};

export default Hero;
