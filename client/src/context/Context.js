import {createContext} from "react"
import useState from "react-usestateref"
import {useRef} from "react"

// useState
const [width, setWidth] = useState(1920)
const [textarea, setTextarea, refTextarea] = useState('')
const [textareaCounter, setTextareaCounter] = useState(0)

const [canvasPages, setCanvasPages, refCanvasPages] = useState([])
const [canvasLines, setCanvasLines, refCanvasLines] = useState([])
const [styles, setStyles, refStyles] = useState({
    fontSize: 36,
    fontFamily: 'sans-serif',
    color: '#000',
    padding: Math.floor(width / 20),
    bgColor: '#fff',
    textAlign: 'left',
    textBaseline: 'top'
})

const [textPart, setTextPart, refTextPart] = useState([])
const [picturePart, setPicturePart, refPicturePart] = useState([])
const [sentences, setSentences, refSentences] = useState([])

const [loading, setLoading] = useState(false)

// Vars
let canvas = []
let contexts = []

const maxCharLength = 900
const lineHeight = styles.fontSize / 15

// useRef
const refCanvas = useRef([])
const tempCanvas = useRef(null)
const refDownload = useRef([])

const refs = { refCanvas, tempCanvas, refDownload }

// Functions
const getSentencesArr = text => text.split(/[.?!]/).map(sentence => sentence.trim()).map(sentence => sentence.trimEnd())
const divideByPages = arr => {
    const {
        padding,
        fontSize
    } = styles

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
const divideTexts = () => {
    const toText = []
    const toPicture = []
    let addToText = true

    for (let i = 0; i < refSentences.current.length; i++) {
        if (addToText && toText.join('').length + refSentences.current[i].length < maxCharLength) {
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
        fontSize
    } = styles

    for (let i = 0; i < refCanvasPages.current.length; i++) {
        for (let j = 0; j < refCanvasPages.current[i].length; j++) {
            contexts[i].fillText(refCanvasPages.current[i][j], padding, j * (2 * lineHeight + fontSize) + padding)
            refDownload.current[i].href = refCanvas.current[i].toDataURL('image/png')
        }
    }
}
const getCanvasLines = (text) => {
    const maxWidth = width - (2 * styles.padding)

    const canvas = tempCanvas.current
    const context = canvas.getContext('2d')
    canvas.width = width
    canvas.height = width
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
    for (let i = 0; i < refCanvasPages.current.length; i++) {
        canvas.push(refCanvas.current[i])
        contexts.push(canvas[i].getContext('2d'))
        canvas[i].width = width
        canvas[i].height = width
    }
}
const setCanvasStyles = myContext => {
    const {
        fontSize = 36,
        fontFamily = 'sans-serif',
        padding = Math.floor(width / 20),
        color = '#000',
        bgColor = '#5ed30d',
        textAlign = 'left',
        textBaseline = 'top',
    } = styles
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

const functions = {
    getSentencesArr,
    divideByPages,
    divideTexts,
    putTextIntoContext,
    getCanvasLines,
    createCanvas,
    setCanvasStyles,
}




export const FunctionsContext = createContext({functions, states, refs})