export const Canvas = (props) => {
    const {
        refCanvas,
        refDownload,
        idx
    } = props

    return (
        <>
            <a href={'#'} ref={el => refDownload.current[idx] = el} download={true}>
                <canvas ref={el => refCanvas.current[idx] = el}></canvas>
            </a>
        </>
    )
}

// const text = props.text || ''
// const width = context.measureText(props.text).width
//
// const { fontSize = 20, fontFamily = 'sans-serif', color = '#fff', textAlign = 'left', textBaseline = 'top' } = style
//
// const padding = 1
//
//
// context.beginPath()
// // context.fillStyle = '#acacac'
// // context.fontSize = `${fontSize}px`
// context.fontFamily = fontFamily
// context.textAlign = textAlign
// context.textBaseline = textBaseline
// context.beginPath()
// // context.rect(0, 0, canvas.width, canvas.height)
// // context.fillStyle = "rgba(0, 0, 0, .5)"
// context.fillStyle = "rgba(255, 255, 255, 1)"
//
// const [x, y] = [1, 1]
//
//
// context.strokeStyle = "#009ddf"
// context.strokeRect(x, y, width + padding, 20 + padding)
//
// context.fillStyle = "#009ddf"
// context.color = '#000'
// context.fillText(text, x + padding / 2, y + padding / 2)
//
// // context.fillText(props.text, (canvas.width / 2), (canvas.height / 2))
// // context.fill()
// context.color = '#000'
// context.aspectRatio = '1'
// context.padding = `${padding}rem`
//
//
// context.fillRect(x, y, width + padding, 20 + padding)
//
//
// // context.width = `${width}px`
// // context.height = `${width}px`
//
// if (props.text.length < props.maxCharLength){
//     setTextPart(props.text)
//     refDownload.current.href = refCanvas.current.toDataURL('image/png')
//     return
// } else {
//
//
// // context.fillRect(0, 0, width, width)
//
// // context.stroke()
// const width = context.measureText(props.text).width
// for (let i = 0; i < sentences.length; i++) {
//     const num = Math.floor(props.maxCharLength / sentences[i].length)
//     // console.log('NUMBER', num)
//     const numbOfSentences = Math.floor(num)
// }