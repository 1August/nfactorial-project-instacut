import './Canvas.css'
import {useRef} from "react";

export const Canvas = (props) => {
    const {
        refCanvas,
        refDownload,
        idx,
        activeCanvasIdx
    } = props

    const canvas = useRef(null)

    return (
        <div
            className={'canvas'}
            ref={canvas}
            data-active-canvas={activeCanvasIdx === idx ? 'true' : 'false'}
        >
            <a
                href={'#'}
                ref={el => refDownload.current[idx] = el}
                download={true}
            >
                <canvas
                    ref={el => refCanvas.current[idx] = el}
                >

                </canvas>
            </a>
        </div>
    )
}