import './CanvasGroup.css'

import {Canvas} from "./Canvas"
import {Carousel} from "../../UI/Carousel";

export const CanvasGroup = ({...props}) => {
    const {
        refCanvasPages,
        canvasPages,
        refCanvas,
        refDownload
    } = props

    return(
        <div id="canvasGroup">
            <Carousel
                refCanvasPages={refCanvasPages}
                canvasPages={canvasPages}
                refDownload={refDownload}
                refCanvas={refCanvas}
            />
        </div>
    )
}