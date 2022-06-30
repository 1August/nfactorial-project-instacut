import './SettingsPage.css'

import {InputForm} from "../InputForm";
import {Result} from "../Result";
import {SettingsList} from "../SettingsList";
import {Routes, Route} from "react-router-dom";
import {TextCutter} from "../InputForm/TextCutter";

export const SettingsPage = (props) => {
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
        <section id={'settingsPage'}>
            <SettingsList/>
            <Routes>
                <Route path={'step1'} element={
                    <TextCutter
                        refTextPart={refTextPart}
                    />
                }/>
                <Route path={'step2'} element={
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
                }/>
            </Routes>
        </section>
    )
}




{/*<a href="#" onClick={handleDownloadAllClick}>Download all</a>*/}
{/*<Result*/}
{/*    refTextPart={refTextPart}*/}
{/*    refCanvasPages={refCanvasPages}*/}
{/*    refDownload={refDownload}*/}
{/*    refCanvas={refCanvas}*/}
{/*    canvasPages={canvasPages}*/}
{/*/>*/}