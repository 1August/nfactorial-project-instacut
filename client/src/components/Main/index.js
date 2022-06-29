import './Main.css'

import {InputForm} from "../InputForm";
import {Result} from "../Result";

export const Main = (props) => {
    const {
        tempCanvas,
        submitBtnRef,
        maxCharLength,
        textareaCounter,
        handleTextareaChange,
        textarea,
        handleFormSubmit,
        styles,
        handleStylesInputChange,
        refTextPart,
        refCanvasPages,
        refDownload,
        refCanvas,
        canvasPages
    } = props

    return(
        <main>
            <div className="container">
                <h1>InstaCut</h1>
                {/*<a href="#" onClick={handleDownloadAllClick}>Download all</a>*/}
                <InputForm
                    tempCanvas={tempCanvas}
                    submitBtnRef={submitBtnRef}
                    maxCharLength={maxCharLength}
                    textareaCounter={textareaCounter}
                    handleTextareaChange={handleTextareaChange}
                    textarea={textarea}
                    handleFormSubmit={handleFormSubmit}
                    styles={styles}
                    handleStylesInputChange={handleStylesInputChange}
                />
                <Result
                    refTextPart={refTextPart}
                    refCanvasPages={refCanvasPages}
                    refDownload={refDownload}
                    refCanvas={refCanvas}
                    canvasPages={canvasPages}
                />
            </div>
        </main>
    )
}