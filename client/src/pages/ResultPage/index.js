import './ResultPage.css'

import {TextPart} from "../../components/TextPart";
import {CanvasGroup} from "../../components/CanvasGroup";

export const ResultPage = props => {
    const {
        refTextPart,
        refCanvasPages,
        refDownload,
        refCanvas,
        canvasPages,
        downloadLinks
    } = props

    return(
        <section id="resultPage">
            <CanvasGroup
                refCanvasPages={refCanvasPages}
                refDownload={refDownload}
                refCanvas={refCanvas}
                canvasPages={canvasPages}
            />
            <TextPart
                refTextPart={refTextPart}
                downloadLinks={downloadLinks}
            />
        </section>
    )
}