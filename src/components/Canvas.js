import React, { useRef, useEffect } from 'react'
import useCanvas2 from "../hooks/useCanvas2"

const Canvas = props => {
    const { draw, ...rest } = props
    const canvasRef = useCanvas2(draw)

    // useEffect(() => {
    //     const canvas = canvasRef.current
    //     const context = canvas.getContext('2d')
    //     let frameCount = 0
    //     let animationFrameId

    //     // Our first draw
    //     const render = () => {
    //     frameCount++
    //     draw(context, frameCount)
    //     animationFrameId = window.requestAnimationFrame(render)
    //     }
    //     render()
    //     return () => {
    //     window.cancelAnimationFrame(animationFrameId)
    //     }
    // }, [draw])
    
return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas