import useState from 'react-usestateref'
import {useEffect, useRef} from "react"

import './static/css/variables.css'
import './App.css'

import {SettingsPage} from "./components/SettingsPage"
import {Header} from "./components/Header"
import {Modal} from "./components/Modal"
import {Banner} from "./components/Banner"

import {Routes, Route} from "react-router-dom"
import {ResultPage} from "./pages/ResultPage"


function App() {
    // Vars
    let canvas = []
    let contexts = []

    // useState
    const [maxCharLength, setMaxCharLength] = useState(900)

    const [textarea, setTextarea, refTextarea] = useState('')
    const [textareaCounter, setTextareaCounter] = useState(0)

    const [canvasPages, setCanvasPages, refCanvasPages] = useState([])
    const [, setCanvasLines, refCanvasLines] = useState([])
    const [styles, setStyles, refStyles] = useState({
        width: 720,
        fontSize: 36,
        fontFamily: 'sans-serif',
        color: '#000000',
        padding:  36,
        bgColor: '#ffffff',
        bgOpacity: '',
        textAlign: 'left',
        textBaseline: 'top',
        lineHeight: 3
    })

    const [textPart, setTextPart, refTextPart] = useState([])
    const [picturePart, setPicturePart, refPicturePart] = useState([])
    const [, setSentences, refSentences] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [downloadLinks, setDownloadLinks] = useState([])

    // useRef
    const refCanvas = useRef([])
    const tempCanvas = useRef(null)
    const refDownload = useRef([])
    const submitBtnRef = useRef(null)


    // useEffect
    useEffect(()=>{
        if(!refCanvas.current) return
        createCanvas()
        setCanvasStyles()
        putTextIntoContext()
    },[refCanvasPages.current])

    // Handlers
    const handleFormSubmit = e => {
        e?.preventDefault()
        // submitBtnRef.current.disabled = true

        // setSentences(getSentencesArr(refTextarea.current))
        // divideTexts()
        //
        // setCanvasLines(getCanvasLines(refPicturePart.current.join('. ')))
        // setCanvasPages(divideByPages(refCanvasLines.current))
        // submitBtnRef.current.disabled = false
    }
    const handleTextareaChange = e => {
        // console.log('selection', e.target.selectionStart, e.target.selectionEnd)
        setTextarea(e.target.value)
        setTextareaCounter(e.target.value.length)
    }
    const handleModalSubmit = () => {
        setIsModalOpen(false)
        setSentences(getSentencesArr(refTextarea.current))
        divideTexts()
    }
    const handleCreate = () => {
        setCanvasLines(getCanvasLines(refPicturePart.current.join('. ')))
        setCanvasPages(divideByPages(refCanvasLines.current))
    }
    const handleStylesInputChange = e => {
        const val = e.target.value
        if (Number.isInteger(+val)){
            if (e.target.name === 'bgOpacity' && +e.target.value === 100){
                return setStyles({...styles, [e.target.name]: ''})
            }
            return setStyles({...styles, [e.target.name]: +val})
        }
        else
            setStyles({...styles, [e.target.name]: val})
    }

    // Functions
    const getSentencesArr = text => text.split(/[.?!]/).map(sentence => sentence.trim()).map(sentence => sentence.trimEnd())
    const divideByPages = arr => {
        const {
            width,
            padding,
            fontSize,
            lineHeight
        } = refStyles.current

        const res = []
        let page = []
        const linesPerPage = Math.floor(((width - (2 * padding))) / (2 * lineHeight + fontSize))

        for (let i = 0; i < arr.length; i++) {
            page.push(arr[i])
            if ((i + 1) % linesPerPage === 0 || i === arr.length - 1) {
                res.push(page)
                page = []
            }
        }
        return res
    }
    const divideTexts = (setToText, setToPicture) => {
        if (setToText && setToPicture){
            setTextPart(setToText)
            setPicturePart(setToPicture)
            return
        }
        const toText = []
        const toPicture = []
        let addToText = true

        for (let i = 0; i < refSentences.current.length; i++) {
            if (addToText && toText.join('. ').length + refSentences.current[i].length < maxCharLength) {
                toText.push(refSentences.current[i])
            } else {
                addToText = false
                toPicture.push(refSentences.current[i])
            }
        }
        setTextPart(toText)
        setPicturePart(toPicture)
    }
    const putTextIntoContext = () => {
        const {
            padding,
            fontSize,
            lineHeight
        } = refStyles.current

        const jCoefficient = 2 * lineHeight + fontSize

        const newDownloads = []
        for (let i = 0; i < refCanvasPages.current.length; i++) {
            for (let j = 0; j < refCanvasPages.current[i].length; j++) {
                contexts[i].fillText(refCanvasPages.current[i][j], padding, j * jCoefficient + padding)
            }
            newDownloads.push(refCanvas.current[i].toDataURL('image/png'))
            refDownload.current[i].href = refCanvas.current[i].toDataURL('image/png')
        }

        setDownloadLinks([...newDownloads])

        console.log(downloadLinks)
    }
    const getCanvasLines = text => {
        const maxWidth = styles.width - (2 * styles.padding)

        const canvas = tempCanvas.current
        const context = canvas.getContext('2d')
        canvas.width = styles.width
        canvas.height = styles.width
        setCanvasStyles(context)

        const words = text.split(" ").map(el => el + ' ')
        const lines = []
        let currentLine = words[0]

        for (let i = 1; i < words.length; i++) {
            const word = words[i]
            const width = context.measureText(currentLine + " " + word).width
            if (width < maxWidth) {
                currentLine += " " + word
            } else {
                lines.push(currentLine)
                currentLine = word
            }
        }
        lines.push(currentLine)
        return lines
    }
    const createCanvas = () => {
        const {
            width
        } = refStyles.current

        for (let i = 0; i < refCanvasPages.current.length; i++) {
            canvas.push(refCanvas.current[i])
            contexts.push(canvas[i].getContext('2d'))
            canvas[i].width = width
            canvas[i].height = width
        }
    }
    const setCanvasStyles = myContext => {
        const {
            width,
            fontSize,
            fontFamily = 'sans-serif',
            color,
            bgColor,
            // textAlign = 'left',
            textBaseline = 'top',
        } = refStyles.current

        const [x, y, font] = [0, 0, `${fontSize}px ${fontFamily}`]

        if (myContext) {
            myContext.textBaseline = textBaseline
            myContext.font = font
            myContext.lineWidth = 2
            myContext.fillStyle = bgColor
            myContext.fillRect(x, y, width, width)
            myContext.fillStyle = color

            return
        }

        for (let context of contexts) {
            context.textBaseline = textBaseline
            context.font = font
            context.lineWidth = 2
            context.fillStyle = bgColor
            context.fillRect(x, y, width, width)
            context.fillStyle = color
        }
    }

    return (
        <div className="App">
            <Header
                setIsModalOpen={setIsModalOpen}
            />
            <main>
                <Routes>
                    <Route path={'/'} element={
                        <>
                            <Banner/>
                        </>
                    }/>
                    <Route path={'create/*'} element={
                        <div className="container">
                            <SettingsPage
                                tempCanvas={tempCanvas}
                                submitBtnRef={submitBtnRef}
                                maxCharLength={maxCharLength}
                                textareaCounter={textareaCounter}
                                handleTextareaChange={handleTextareaChange}
                                textarea={textarea}
                                handleFormSubmit={handleFormSubmit}
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
                </Routes>
                {
                    isModalOpen &&
                    <Modal
                        setIsModalOpen={setIsModalOpen}
                        handleTextareaChange={handleTextareaChange}
                        handleFormSubmit={handleFormSubmit}
                        textarea={textarea}
                        setTextarea={setTextarea}
                        textareaCounter={textareaCounter}
                        maxCharLength={maxCharLength}
                        tempCanvas={tempCanvas}
                        handleModalSubmit={handleModalSubmit}
                    />
                }
            </main>
        </div>
    )
}

export default App