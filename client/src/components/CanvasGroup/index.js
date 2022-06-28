import {Canvas} from "../Canvas";

export const CanvasGroup = ({...props}) => {
    const {
        refCanvasPages,
        canvasPages,
        refCanvas,
        refDownload
    } = props

    return(
        <div className="canvasGroup">
            {
                refCanvasPages.current.length > 0 && refCanvasPages.current.map((el, i) => (
                    <Canvas
                        key={'canvas' + i}
                        canvasPages={canvasPages}
                        refCanvas={refCanvas}
                        refDownload={refDownload}
                        idx={i}
                    />
                ))
            }
        </div>
    )
}