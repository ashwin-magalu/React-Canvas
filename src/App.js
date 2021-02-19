import React from 'react';
import './App.css';
import { useCanvas } from './hooks/useCanvas';
import Canvas from "./components/Canvas"

function App() {
    const [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight ] = useCanvas();
    const handleCanvasClick=(event)=>{
        // on each click get current mouse location 
        const currentCoord = { x: event.clientX, y: event.clientY };
        // add the newest mouse location to an array in state 
        setCoordinates([...coordinates, currentCoord]);
      };
    
      const handleClearCanvas=(event)=>{
        setCoordinates([]);
      };
  return (
    <main className="App-main">
        <canvas className="App-canvas" ref={canvasRef} width={canvasWidth} height={canvasHeight} onClick={handleCanvasClick} />
        <div className="button">
            <button onClick={handleClearCanvas}>CLEAR</button>
        </div>
    </main>
  );

// const draw = (ctx, frameCount) => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
//     ctx.fillStyle = '#000000'
//     ctx.beginPath()
//     ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
//     ctx.fill()
//   }
// return (
//     <Canvas draw={draw} />
// )

}

export default App;
