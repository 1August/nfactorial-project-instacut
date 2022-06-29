export const getSentencesArr = text => text.split(/[.?!]/).map(sentence => sentence.trim()).map(sentence => sentence.trimEnd())
export const divideByPages = arr => {
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
export const divideTexts = () => {
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
export const putTextIntoContext = () => {
    const {
        padding,
        fontSize,
        lineHeight
    } = refStyles.current

    const jCoefficient = 2 * lineHeight + fontSize

    for (let i = 0; i < refCanvasPages.current.length; i++) {
        for (let j = 0; j < refCanvasPages.current[i].length; j++) {
            contexts[i].fillText(refCanvasPages.current[i][j], padding, j * jCoefficient + padding)
        }
        refDownload.current[i].href = refCanvas.current[i].toDataURL('image/png')
    }
}
export const getCanvasLines = text => {
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
export const createCanvas = () => {
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
export const setCanvasStyles = myContext => {
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