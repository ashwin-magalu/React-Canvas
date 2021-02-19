import React, {useState, useEffect, useRef} from "react"

// Path2D for a Heart SVG
const heartSVG = "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
const SVG_PATH = new Path2D(heartSVG);
// M/m: MoveTo, L/l/H/h/V/v: LineTo, C/c/S/s: Cubic Bézier Curve, Q/q/T/t: Quadratic Bézier Curve, A/a: Elliptical Arc Curve, Z/z: ClosePath
// Commands are case-sensitive. An upper-case command specifies absolute coordinates, while a lower-case command specifies coordinates relative to the current position.
// It is always possible to specify a negative value as an argument to a command: negative angles will be anti-clockwise,absolute negative x and y values are interpreted as negative coordinates, relative negative x values move to the left, and relative negative y values move upwards.
// M (x,y)+ --> Pn = {x,y}, m (dx,dy)+ --> pn = {x+dx, y+dy}

/* 

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d

M/m+ --> Move the current point to the coordinate x,y. Any subsequent coordinate pair(s) are interpreted as parameter(s) for implicit absolute LineTo (L) command(s) 
L/l --> Draw a line from the current point to the end point specified by x,y. Any subsequent coordinate pair(s) are interpreted as parameter(s) for implicit absolute LineTo (L) command(s).
H/h --> Draw a horizontal line from the current point to the end point, which is specified by the x parameter and the current point's y coordinate. Any subsequent value(s) are interpreted as parameter(s) for implicit absolute horizontal LineTo (H) command(s).
V/v --> Draw a vertical line from the current point to the end point, which is specified by the y parameter and the current point's x coordinate. Any subsequent values are interpreted as parameters for implicit absolute vertical LineTo (V) command(s).
C/c: (x1/dx1, y1/dy1 x2/dx2, y2/dy2 x/dx, y/dy) --> Draw a cubic Bézier curve from the current point to the end point specified by x,y. The start control point is specified by x1,y1 and the end control point is specified by x2,y2. Any subsequent triplet(s) of coordinate pairs are interpreted as parameter(s) for implicit absolute cubic Bézier curve (C) command(s).
S/s: (x2/dx2, y2/dy2 x/dx, y/dy) --> Draw a smooth cubic Bézier curve from the current point to the end point specified by x,y. The end control point is specified by x2,y2. The start control point is a reflection of the end control point of the previous curve command. If the previous command wasn't a cubic Bézier curve, the start control point is the same as the curve starting point (current point). Any subsequent pair(s) of coordinate pairs are interpreted as parameter(s) for implicit absolute smooth cubic Bézier curve (S) commands.
Q/q: (x1/dx1, y1/dy1 x/dx, y/dy) --> Draw a quadratic Bézier curve from the current point to the end point specified by x,y. The control point is specified by x1,y1. Any subsequent pair(s) of coordinate pairs are interpreted as parameter(s) for implicit absolute quadratic Bézier curve (Q) command(s).
T/t: (x/dx, y/dy) --> Draw a smooth quadratic Bézier curve from the current point to the end point specified by x,y. The control point is a reflection of the control point of the previous curve command. If the previous command wasn't a quadratic Bézier curve, the control point is the same as the curve starting point (current point). Any subsequent coordinate pair(s) are interpreted as parameter(s) for implicit absolute smooth quadratic Bézier curve (T) command(s).
A/a: (rx ry angle large-arc-flag sweep-flag x/dx y/dy) --> Draw an Arc curve from the current point to the coordinate x,y. The center of the ellipse used to draw the arc is determined automatically based on the other parameters of the command: 
// rx and ry are the two radii of the ellipse, angle represents a rotation (in degrees) of the ellipse relative to the x-axis, large-arc-flag and sweep-flag allows to chose which arc must be drawn as 4 possible arcs can be drawn out of the other parameters. large-arc-flag allows to chose one of the large arc (1) or small arc (0), sweep-flag allows to chose one of the clockwise turning arc (1) or anticlockwise turning arc (0). The coordinate x,y becomes the new current point for the next command. All subsequent sets of parameters are considered implicit absolute arc curve (A) commands.
Z/z --> Close the current subpath by connecting the last point of the path with its initial point. If the two points are at different coordinates, a straight line is drawn between those two points.
*/

// Scaling Constants for Canvas
const SCALE = 0.1;
const OFFSET = 80;
export const canvasWidth = window.innerWidth * .5;
export const canvasHeight = window.innerHeight * .5;

export function draw(context, location){
  console.log("attempting to draw")
  context.fillStyle = 'red';
  context.shadowColor = 'blue';
  context.shadowBlur = 15;
  context.save();
  context.scale(SCALE, SCALE);
  context.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
  context.rotate(225 * Math.PI / 180);
  context.fill(SVG_PATH);
  // .restore(): Canvas 2D API restores the most recently saved canvas state
  context.restore();  
};

export function useCanvas(){
    const canvasRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);

    useEffect(()=>{
        const canvasObj = canvasRef.current;
        const context = canvasObj.getContext('2d');
        // clear the canvas area before rendering the coordinates held in state
        context.clearRect( 0,0, canvasWidth, canvasHeight );

        // draw all coordinates held in state
        coordinates.forEach((coordinate)=>{draw(context, coordinate)});
    });

    return [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight ];
}