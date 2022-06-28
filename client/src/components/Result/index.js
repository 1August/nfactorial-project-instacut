import {CanvasGroup} from "../CanvasGroup";
import {TextPart} from "../TextPart";

export const Result = ({...props}) => {
    const {
        refTextPart,
        refCanvas,
        refDownload,
        refCanvasPages,
        canvasPages
    } = props

    return (
        <>
            <TextPart
                refTextPart={refTextPart}
            />
            <CanvasGroup
                refCanvasPages={refCanvasPages}
                refDownload={refDownload}
                refCanvas={refCanvas}
                canvasPages={canvasPages}
            />
        </>
    )
}