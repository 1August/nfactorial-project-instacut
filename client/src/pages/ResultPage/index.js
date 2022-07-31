import './ResultPage.css'

import {TextPart} from "../../components/TextPart"
import {CanvasGroup} from "../../components/CanvasGroup"

export const ResultPage = props => {
    const {
        refTextPart,
        refCanvasPages,
        refDownload,
        refCanvas,
        canvasPages,
        downloadLinks
    } = props

    const downloadAll = e => {
        e.preventDefault()
        e.target.innerHTML = 'Downloading!'
        setTimeout(() => {
            e.target.innerHTML = `Download(${downloadLinks.length})`
        }, 1500)

        for (let i = 0; i < downloadLinks.length; i++) {
            setTimeout(() => {
                const a = document.createElement('a')
                a.setAttribute('href', downloadLinks[i])
                a.setAttribute('download', `InstaCut-${i + 1}-${Date.now()}`)
                a.click()
                a.remove()
            }, i * 500)
        }
    }

    const copyToClipboard = e => {
        e.preventDefault()
        navigator.clipboard.writeText(refTextPart.current)
        e.target.innerHTML = 'Copied!'
        setTimeout(() => {
            e.target.innerHTML = 'Copy text'
        }, 1500)
    }

    return(
        <section id="resultPage">
            <h1>Preview</h1>
            <div className="window">
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
            </div>
            <div className="resultInfo">
                <a href="#" onClick={copyToClipboard}>Copy text</a>
                <a href="#" onClick={downloadAll}>Download({downloadLinks.length})</a>
            </div>
        </section>
    )
}