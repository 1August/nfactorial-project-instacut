import {Canvas} from "./Canvas"
import {FunctionsContext} from "../context/Context"
import {useContext} from "react"


export const Main = () => {
    const ctx = useContext(FunctionsContext)
    const {
        functions,
        states,
        refs
    } = ctx

    return(
        <main>
            <div className="container">
                <h1>InstaCut</h1>
                <form onSubmit={functions.handleFormSubmit}>
                        <textarea value={textarea} onChange={functions.handleTextareaChange} name="userInput" id="userInput"
                                  cols="30" rows="10" placeholder={'Write your text here...'}></textarea>
                    <span className={'textareaCounter'}>{textareaCounter} / {maxCharLength}</span>
                    <button type={"submit"}>Create InstaCut</button>
                    <canvas id="tempCanvas" ref={tempCanvas}></canvas>
                </form>
                <p>{(refTextPart.current.length > 0 && `${refTextPart.current.join('. ')}`) || 'Download your InstaCut here...'}</p>
                <div className="canvasGroup">
                    {
                        loading
                            ? <h1>Loading...</h1>
                            : refCanvasPages.current.length > 0 && refCanvasPages.current.map((el, i) => (
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
            </div>
        </main>
    )
}