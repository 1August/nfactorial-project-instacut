import './SettingsPage.css'

import {InputForm} from "../InputForm"
import {SettingsList} from "../SettingsList"
import {Routes, Route} from "react-router-dom"
import {TextCutter} from "../InputForm/TextCutter"
import {useState} from "react"

export const SettingsPage = (props) => {
    const {
        tempCanvas,
        submitBtnRef,
        maxCharLength,
        textareaCounter,
        handleTextareaChange,
        textarea,
        styles,
        handleStylesInputChange,
        refTextPart,
        textPart,
        handleCreate,
        divideTexts,
        setTextPart,
        setPicturePart,
        picturePart
    } = props

    const [textPartCopy] = useState([...textPart].join('. '))
    const [picturePartCopy] = useState([...picturePart].join('.'))

    return(
        <section id={'settingsPage'}>
            <SettingsList/>
            <Routes>
                <Route path={'step1'} element={
                    <TextCutter
                        refTextPart={refTextPart}
                        textPart={textPart}
                        divideTexts={divideTexts}
                        setTextPart={setTextPart}
                        setPicturePart={setPicturePart}
                        picturePart={picturePart}
                        textPartCopy={textPartCopy}
                        picturePartCopy={picturePartCopy}
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
                        styles={styles}
                        handleStylesInputChange={handleStylesInputChange}
                        handleCreate={handleCreate}
                    />
                }/>
            </Routes>
        </section>
    )
}