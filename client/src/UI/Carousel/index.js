import './Carousel.css'

import rightArrow from '../../static/img/right.png'
import leftArrow from '../../static/img/left.png'

import {Canvas} from "../../components/CanvasGroup/Canvas"
import React, {useState} from "react"

export const Carousel = props => {
    const {
        refCanvasPages,
        canvasPages,
        refDownload,
        refCanvas
    } = props

    const [activeCanvasIdx, setActiveCanvasIdx] = useState(0)

    const showPrevCanvas = () => {
        if (activeCanvasIdx - 1 <= -1) return
        setActiveCanvasIdx(activeCanvasIdx - 1)
    }

    const showNextCanvas = () => {
        if (activeCanvasIdx >= refCanvasPages.current.length - 1) return
        setActiveCanvasIdx(activeCanvasIdx + 1)
    }

    return (
        <div id={'carousel'}>
            <div className="carouselBody">
                {
                    refCanvasPages.current.length > 0 && refCanvasPages.current.map((el, i) => (
                        <Canvas
                            activeCanvasIdx={activeCanvasIdx}
                            key={'canvas' + i}
                            canvasPages={canvasPages}
                            refCanvas={refCanvas}
                            refDownload={refDownload}
                            idx={i}
                        />
                    ))
                }
            </div>
            <div className="carouselBtnGroup">
                <div
                    className="carouselBtn carouselPrevBtn"
                    onClick={showPrevCanvas}
                >
                    <img src={leftArrow} alt="left"/>
                </div>
                <div
                    className="carouselBtn carouselNextBtn"
                    onClick={showNextCanvas}
                >
                    <img src={rightArrow} alt="right"/>
                </div>
            </div>
            <span className="carouselPagesCounter">{activeCanvasIdx + 1}/{refCanvasPages.current.length}</span>
        </div>
    )
}