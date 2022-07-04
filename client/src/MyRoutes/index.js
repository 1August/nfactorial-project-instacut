import {Route, Routes} from "react-router-dom"
import {Banner} from "../components/Banner"
import {SettingsPage} from "../components/SettingsPage"
import {ResultPage} from "../pages/ResultPage"
import {AboutPage} from "../pages/AboutPage"

export const MyRoutes = props => {
    const {
        refTextPart,
        handleStylesInputChange,
        styles,
        textarea,
        handleTextareaChange,
        textareaCounter,
        maxCharLength,
        submitBtnRef,
        tempCanvas,
        handleCreate,
        textPart,
        canvasPages,
        refCanvas,
        refDownload,
        refCanvasPages,
        setPicturePart,
        setTextPart,
        picturePart,
        divideTexts,
        downloadLinks
    } = props

    return(
        <Routes>
            <Route path={'/'} element={<Banner/>}/>
            <Route path={'create/*'} element={
                <div className="container">
                    <SettingsPage
                        tempCanvas={tempCanvas}
                        submitBtnRef={submitBtnRef}
                        maxCharLength={maxCharLength}
                        textareaCounter={textareaCounter}
                        handleTextareaChange={handleTextareaChange}
                        textarea={textarea}
                        styles={styles}
                        handleStylesInputChange={handleStylesInputChange}
                        refTextPart={refTextPart}
                        refCanvasPages={refCanvasPages}
                        refDownload={refDownload}
                        refCanvas={refCanvas}
                        canvasPages={canvasPages}
                        textPart={textPart}
                        handleCreate={handleCreate}
                        divideTexts={divideTexts}
                        picturePart={picturePart}
                        setTextPart={setTextPart}
                        setPicturePart={setPicturePart}
                    />
                </div>
            }/>
            <Route path={'result'} element={
                <div className="container">
                    <ResultPage
                        refTextPart={refTextPart}
                        refCanvasPages={refCanvasPages}
                        refDownload={refDownload}
                        refCanvas={refCanvas}
                        canvasPages={canvasPages}
                        downloadLinks={downloadLinks}
                    />
                </div>
            }/>
            <Route path={'about'} element={
                <div className="container">
                    <AboutPage/>
                </div>
            }/>
        </Routes>
    )
}