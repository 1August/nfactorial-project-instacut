import {Canvas} from "./components/Canvas"

import useState from 'react-usestateref'
import {useRef} from "react"

import './App.css'

function App() {
    // Vars
    const width = 1920

    // useState
    const [textarea, setTextarea, refTextarea] = useState('')
    const [textareaCounter, setTextareaCounter] = useState(0)

    const [canvasPages, setCanvasPages] = useState([])
    const [canvasLines, setCanvasLines] = useState([])
    const [styles, setStyles] = useState({
        fontSize: 36,
        fontFamily: 'sans-serif',
        color: '#000',
        padding: Math.floor(width / 20),
        bgColor: '#fff',
        textAlign: 'left',
        textBaseline: 'top'
    })

    const [textPart, setTextPart] = useState([])
    const [picturePart, setPicturePart] = useState([])
    const [sentences, setSentences] = useState([])

    // Vars
    let canvas = []
    let contexts = []

    const maxCharLength = 900
    const lineHeight = styles.fontSize / 15

    // useRef
    const refCanvas = useRef([])
    const tempCanvas = useRef(null)
    const refDownload = useRef([])

    // Handlers
    /*
    userInput => handleTextareaChange => clickToBtn => handleFormSubmit => setSentences =>
    divideTexts => divideByPages => createCanvas => setCanvasStyles => getCanvasLines => setCanvasPages => putTextIntoContext
     */
    const handleFormSubmit = e => {
        e.preventDefault()

        setSentences(getSentencesArr(textarea))
        divideTexts({style: styles})
        setCanvasLines(getCanvasLines(picturePart.join('. ') + '.'))
        setCanvasPages(divideByPages(canvasLines))
        createCanvas()
        setCanvasStyles()
        putTextIntoContext()


        // setCanvasLines(getCanvasLines(textarea, width - (2 * styles.padding)))

        // setCanvasNumber(canvasPages)
    }

    const handleTextareaChange = e => {
        setTextarea(e.target.value)
        setTextareaCounter(e.target.value.length)
    }

    // Functions
    const getSentencesArr = text => text.split(/[.?!]/).map(sentence => sentence.trim()).map(sentence => sentence.trimEnd())

    const divideByPages = arr => {
        const {
            padding,
            fontSize
        } = styles

        const res = []
        let page = []
        // const linesPerPage = Math.floor((width - (2 * padding)) / (4 * lineHeight + fontSize))
        const linesPerPage = Math.floor(((width - (2 * padding))) / (2 * lineHeight + fontSize))
        console.log(linesPerPage)
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
        for (let i = 0; i < sentences.length; i++) {
            // if (addToText && toText.reduce((acc, el) => (acc + el.length), 0) + sentences[i].length < maxCharLength) {
            if (addToText && toText.join('').length + sentences[i].length < maxCharLength) {
                toText.push(sentences[i])
            } else {
                addToText = false
                toPicture.push(sentences[i])
            }
        }
        setTextPart(toText)
        setPicturePart(toPicture)


        /*------------------------------------------*/
        //////// SET PAGES WITH FOR TO EVERY CANVAS

        // const canvasLines = getCanvasLines(contexts, toPictureStr, width - (2 * padding))
        // setCanvasPages(divideByPages(canvasLines))
        // console.log(divideByPages(canvasLines))
        /*------------------------------------------*/
    }

    const putTextIntoContext = () => {
        const {
            padding,
            fontSize
        } = styles

        // console.log('!!!Canvas Lines', canvasLines)

        for (let i = 0; i < canvasPages.length; i++) {
            for (let j = 0; j < canvasPages[i].length; j++) {
                // contexts[i].fillText(canvasLines[j], padding, j * (2 * lineHeight + fontSize) + padding - 2 * lineHeight)
                // refCanvas.current[i].fillText(canvasPages[i], padding, j * (2 * lineHeight + fontSize) + padding)
                // contexts[i].fillText(canvasLines[j + textPart.length], padding, j * (2 * lineHeight + fontSize) + padding)
                contexts[i].fillText(canvasPages[i][j], padding, j * (2 * lineHeight + fontSize) + padding)
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
        for (let i = 0; i < refCanvas.current.length; i++) {
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

        if (myContext){
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
            // context.fillRect(x, y, width + padding, width + padding)
            context.fillRect(x, y, width, width)
            context.fillStyle = color
        }
    }


    return (
        <div className="App">
            <main>
                <div className="container">
                    <h1>InstaCut</h1>
                    <form onSubmit={handleFormSubmit}>
                        <textarea value={textarea} onChange={handleTextareaChange} name="userInput" id="userInput"
                                  cols="30" rows="10" placeholder={'Write your text here...'}></textarea>
                        <span className={'textareaCounter'}>{textareaCounter} / {maxCharLength}</span>
                        <button type={"submit"}>Create InstaCut</button>
                        <canvas id="tempCanvas" ref={tempCanvas}></canvas>
                    </form>
                    <p>{(textPart.length > 0 && `${textPart.join('. ')}.`) || 'Download your InstaCut here...'}</p>
                    {
                        canvasPages.length > 0 && canvasPages.map((el, i) => (
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
            </main>
        </div>
    )
}

export default App
/*

Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium asperiores at consequuntur delectus dolores, dolorum est expedita illo illum libero maxime, mollitia placeat quas rerum suscipit ullam unde? Accusamus alias animi asperiores cum deserunt esse eveniet exercitationem fugiat impedit inventore ipsa laborum laudantium minus modi neque nihil pariatur quis quisquam quo soluta tempore, totam unde ut. Consectetur cum delectus dolorem, dolores, eligendi facere facilis modi necessitatibus odio praesentium provident quam, quibusdam repellat rerum voluptas. Aliquam, animi architecto autem blanditiis consectetur consequuntur ea enim eos excepturi explicabo in labore libero minima mollitia nam numquam obcaecati omnis perspiciatis, quaerat quibusdam quo rem repudiandae sapiente sint sunt tempore ullam. Aut illum incidunt ipsam libero molestiae perspiciatis quidem ratione repellat soluta vel. Amet corporis cum cupiditate deserunt distinctio ea earum, enim explicabo fugit laborum magnam molestias non odit, optio quasi qui rerum saepe, sapiente suscipit tempora totam velit voluptatum! Adipisci assumenda autem commodi consequatur deleniti distinctio eaque eos expedita explicabo facere illo libero magnam mollitia neque nisi numquam, omnis perspiciatis praesentium qui quos tempore veritatis voluptates. Adipisci, alias beatae cum cupiditate dolore, expedita harum laudantium maiores minus molestias, reiciendis rem velit vero? Commodi consectetur eligendi eos esse ex exercitationem nam odit, qui quidem sequi velit voluptatem. Dolor facere id minus repudiandae sint! A assumenda dicta distinctio ea exercitationem fuga itaque iure laboriosam laborum maxime molestiae, nihil nobis numquam obcaecati officia perferendis possimus provident quam quod reprehenderit rerum saepe voluptas voluptatibus. Commodi eaque nobis pariatur voluptates. Aut, quos temporibus? A adipisci consequatur facere nesciunt optio possimus voluptatum. Adipisci aliquid animi consequuntur culpa dicta dolor doloribus eligendi id illum impedit iste magnam maxime nobis numquam obcaecati, perspiciatis quaerat similique soluta tempore velit. Accusamus ad delectus quas! A adipisci aliquam aspernatur aut cupiditate deserunt dicta dolore dolorem dolores ducimus harum id illum incidunt inventore ipsum laboriosam nisi non officia placeat possimus qui, quidem quis quod vel velit veritatis vero voluptatum! Ab autem corporis cupiditate doloremque dolores doloribus, eaque et ex expedita illo, incidunt iure iusto laborum magni maiores nobis optio praesentium quam quidem saepe soluta suscipit tempora! Alias commodi in, magni minus officiis reiciendis ut veniam. Accusantium deserunt eum in minus possimus quibusdam quod rerum vero. A alias aut culpa cum deleniti deserunt dicta dolorem eligendi esse et facilis hic ipsum itaque iure iusto libero minima nesciunt pariatur, quisquam repellat sequi suscipit tempore voluptate! Atque exercitationem facere iste nostrum odit optio, quas, quibusdam quo, tempora totam unde velit vero voluptas. Alias asperiores aut eos sint, vel veritatis voluptates. Adipisci amet architecto assumenda, at autem deleniti dolore eius eos error esse et, eveniet ex exercitationem hic iusto minus neque nihil numquam officia officiis omnis optio placeat possimus praesentium provident quidem quo quod quos, reprehenderit sequi tempora tempore tenetur totam veritatis vero vitae voluptas. Consequatur et nobis quas quos voluptatum? Aliquam amet aperiam assumenda at aut autem consequatur culpa cupiditate dolorum eius eligendi eos error esse fugit laborum, magnam molestiae mollitia nam, necessitatibus odit officia quibusdam recusandae sed totam ut. Amet animi asperiores deleniti dolorum, eligendi eveniet explicabo fugiat maxime odit quidem quis sapiente sed similique totam voluptatibus. Enim id iusto molestias, nisi numquam quod saepe sunt veniam! Adipisci aspernatur dolore, et facilis obcaecati porro praesentium, provident quasi reprehenderit sequi tenetur velit. Autem cupiditate delectus deleniti deserunt excepturi expedita ipsa minima modi molestiae molestias nisi nulla possimus praesentium quia quidem quisquam quo ratione reiciendis rem rerum saepe sint tempore, voluptate voluptatibus voluptatum. Beatae commodi consectetur debitis distinctio ea eligendi enim est ex excepturi, facere fuga fugit inventore iste labore laudantium molestiae necessitatibus nemo obcaecati perspiciatis quaerat quisquam quos ratione rerum sapiente, sint sit temporibus ullam unde voluptatem voluptates! A aliquam aliquid distinctio fugit in iure maxime, nam obcaecati perferendis placeat provident quaerat quas quibusdam sint, tenetur, veritatis vero voluptate. Animi architecto assumenda dicta distinctio doloremque eos, exercitationem facere fugit inventore modi nihil nostrum nulla quo quos repellat repellendus ullam voluptas voluptate voluptatem voluptatibus. Ab aperiam dolor ea eveniet id officiis quia quod, rem! Animi asperiores consectetur corporis cumque excepturi facere hic impedit incidunt ipsa maxime nam natus quibusdam ratione repellendus repudiandae, sed sit soluta totam vitae voluptas. Accusantium iste iure, numquam perferendis quia ullam. Aspernatur cupiditate distinctio dolor eligendi enim est harum id illum inventore, ipsa ipsam libero magni necessitatibus nemo, nobis, quae qui quod quos repellat sapiente soluta suscipit tenetur vel veritatis voluptates? Aliquid animi at consectetur delectus deleniti deserunt dolor eveniet illum itaque laudantium maiores maxime minus nam nulla numquam obcaecati possimus quaerat quos suscipit, tempore tenetur totam veniam. A ad aliquid animi aut dolorem, enim et hic illo laboriosam magnam natus non odio perferendis quisquam recusandae, repellendus tempore unde! Accusantium animi, atque doloribus earum ipsam iusto magnam magni! Assumenda, at delectus est id illo impedit in ipsum labore, magni maxime nam nobis quisquam sapiente temporibus veniam! Delectus fuga incidunt minus nobis nostrum numquam rerum saepe velit. Aliquam amet delectus, deserunt eum expedita fuga illum, impedit ipsa iusto laboriosam odio odit officia praesentium quam ullam unde, ut voluptate voluptates. Aliquid blanditiis deleniti, minus nobis odit provident quibusdam sequi ut? Adipisci autem consequuntur modi odit! Architecto corporis dolorem ipsa obcaecati recusandae saepe tenetur velit veniam! Atque, deleniti, dolorum? Asperiores blanditiis commodi consequatur, dolores excepturi impedit perferendis quas voluptatibus. Assumenda autem corporis dolorem dolores ea, earum est eum in ipsum necessitatibus neque, odio quod quos repellat, repellendus veniam veritatis vero? Ab accusamus architecto at atque consequatur dicta distinctio fugit, id illum in inventore minima mollitia nihil obcaecati pariatur praesentium quisquam rerum sequi sint totam vero voluptates voluptatum. Ab aliquid aspernatur autem ducimus fuga iusto maxime praesentium quam rerum. Itaque magnam voluptatem voluptates? Ab at deleniti dolorum ea exercitationem laborum modi, molestiae nam officia, provident quaerat reiciendis rerum sint voluptas voluptatibus. Ab aliquam aspernatur culpa debitis delectus dolores, earum eos eum iste itaque laboriosam, molestiae nesciunt nostrum officiis perferendis saepe ut! Adipisci asperiores blanditiis consequuntur deleniti deserunt dignissimos dolor doloribus ducimus expedita iure, necessitatibus nobis nulla officia quaerat suscipit? Architecto beatae debitis ea expedita, facilis fugiat hic illo illum ipsa laudantium nam necessitatibus non nulla porro quaerat quam quis quo, quos, reiciendis rem sed voluptatem voluptatum? Adipisci aliquam consequuntur culpa cumque dignissimos eaque, enim eos fugit hic illo, impedit inventore laboriosam maxime neque nesciunt nobis obcaecati, qui quibusdam quod rem sequi veritatis voluptatem. Aliquam atque consectetur dignissimos doloribus dolorum enim est hic illo illum, incidunt inventore itaque iusto laudantium maxime modi molestiae nobis nostrum officiis quae quas quibusdam, quisquam saepe tempora unde vitae voluptates voluptatibus voluptatum. A ab ad alias aliquid animi aperiam assumenda at cupiditate debitis deleniti dolor dolore eos error exercitationem harum ipsam ipsum itaque iusto maiores molestiae neque nisi odio optio perspiciatis porro possimus, provident ratione reiciendis rem rerum saepe sed sit temporibus ut veritatis voluptas voluptatum. A accusamus alias, animi architecto atque beatae deleniti doloremque doloribus ea eaque eos esse eum, exercitationem fuga illum iusto labore modi molestiae mollitia nisi obcaecati perferendis porro quae qui recusandae reiciendis repellendus sed temporibus ut vitae? Blanditiis cumque facilis harum ipsam libero nam necessitatibus nemo obcaecati officia, reiciendis repudiandae sed! Accusantium aliquid amet aperiam asperiores assumenda beatae delectus deleniti dignissimos dolores enim eos est facilis fuga fugiat hic illum ipsam libero minima minus modi natus necessitatibus neque numquam obcaecati perferendis placeat quos, ratione rem sunt veniam? Dolor maiores nisi porro quae quaerat! Alias, animi deleniti ducimus eius enim et expedita fugiat inventore laboriosam minus molestiae neque quia quod reiciendis repellendus reprehenderit soluta, voluptates. Commodi corporis cum cumque dolor dolorum incidunt laborum, magnam, minima molestias necessitatibus neque nihil nostrum officia placeat quaerat, repellendus voluptatibus! Atque blanditiis illum iusto modi nulla? Assumenda culpa cum dicta distinctio earum hic ipsum officiis quas quisquam quod. Accusamus alias, aliquam atque aut culpa dicta dolore dolorem eligendi est, excepturi id labore magni minus nostrum officia quod quos similique voluptatem. Corporis dicta dolorem itaque ullam. A animi beatae blanditiis commodi distinctio dolores expedita libero obcaecati sapiente. Accusantium aliquam aliquid beatae cumque cupiditate delectus ducimus ea eum eveniet exercitationem harum ipsa ipsam magnam minus molestiae nisi obcaecati porro quod repudiandae, rerum sequi unde ut velit vitae voluptas! Distinctio iure laudantium neque porro possimus quis soluta suscipit tempore. Aliquam esse fugiat magni vitae? Delectus dolores illo iure libero minima mollitia qui sunt tempora ut, voluptatem! Asperiores distinctio fuga laudantium neque obcaecati perspiciatis quis. Blanditiis cum ea mollitia nemo sequi! Accusantium alias aut dolore doloremque et, facere facilis iste itaque maiores modi mollitia nemo optio possimus quam quisquam quo veritatis. Ad alias aperiam autem corporis deserunt dignissimos dolor dolore eligendi, fuga fugit impedit in labore laudantium maiores minima necessitatibus nesciunt nostrum omnis perspiciatis quasi quis recusandae rem sequi sit tenetur ullam unde veniam! Ab animi asperiores atque beatae consectetur cupiditate, debitis doloremque eaque earum eius excepturi explicabo, facilis illo ipsam maxime nam possimus, quam quibusdam quis quisquam ratione rerum ut. Adipisci architecto beatae consequatur culpa cupiditate, doloremque, earum eum excepturi natus nobis obcaecati, qui quo reiciendis sapiente tempora tempore vel. Modi natus odio pariatur velit voluptatem. Ab ad adipisci amet aut beatae doloribus illum, ipsa ipsum iste iure neque nobis nostrum pariatur praesentium, qui, quos sapiente sit tenetur veritatis vero. Adipisci alias aliquid animi aut autem consectetur corporis cupiditate dolores ea earum fugiat inventore ipsa laborum maxime minus neque nisi numquam officiis omnis pariatur qui quibusdam quisquam repellendus saepe, sunt ut veritatis vitae? Accusamus alias amet assumenda beatae blanditiis consequatur consequuntur corporis, cupiditate dolores earum eos facilis in ipsa iure iusto labore laudantium magnam maxime nesciunt nostrum nulla quae quas qui quisquam rem repellat repellendus reprehenderit rerum sequi similique soluta temporibus unde vel! Ad eos explicabo fugiat iste perspiciatis sit totam. Aperiam commodi dolorum enim error magni placeat, praesentium sunt! Aliquid animi architecto, assumenda consequatur deserunt dolores earum exercitationem in incidunt inventore maxime non officia officiis omnis placeat repudiandae saepe? Architecto aspernatur beatae deserunt doloribus earum error illum nulla praesentium ut vero. Amet consectetur corporis debitis delectus distinctio error, magnam maxime natus necessitatibus neque odio officia rerum saepe, sapiente sed unde velit. Enim fugit nam nesciunt pariatur quas! Aliquam consectetur consequatur corporis dolorem eum incidunt inventore ipsum laborum non nostrum, praesentium sed, similique soluta sunt totam? Dicta dolores esse eum excepturi hic incidunt quaerat? Accusantium cum deserunt distinctio ipsum iste iure labore libero maiores neque odio optio, quae rem tempora vero vitae. Accusantium aliquam aperiam, cupiditate eum inventore ipsum maiores quae repellendus soluta voluptate. A ab, accusamus adipisci amet animi at cupiditate earum eos est eveniet in magnam maiores nihil nisi, odio quae, quia ratione reiciendis repellat repellendus saepe sed sequi similique sint tempora tempore voluptatem! Aliquid assumenda eaque, labore laboriosam omnis quae recusandae. A aliquid architecto blanditiis consequatur culpa delectus dignissimos doloremque dolores earum eos est eveniet ex exercitationem, explicabo ipsa itaque labore laboriosam laborum magnam nobis nulla pariatur perferendis placeat quibusdam quo repellendus, sequi sunt suscipit tempore voluptate. Aliquam amet architecto aspernatur blanditiis deserunt dolores doloribus explicabo laborum libero, maiores natus neque non officia officiis omnis perferendis perspiciatis quibusdam quisquam repudiandae sapiente. A debitis, delectus dolor eos, id in incidunt minima neque nesciunt nihil placeat provident, quidem quo temporibus velit veniam veritatis? Dignissimos maxime minus odio possimus praesentium, repellendus sunt voluptate. Deleniti fuga, id iure officia possimus provident quam quisquam temporibus! Eaque eligendi expedita illo iste laborum modi molestias necessitatibus pariatur porro quae quo quod sequi soluta temporibus ullam unde, vel. Asperiores aspernatur commodi debitis dolore ducimus, eum explicabo iusto modi neque quia repellat voluptatibus. Adipisci alias aliquid at culpa hic, ipsam labore nam neque veniam. Et, facilis, magni. Accusamus commodi debitis fugit libero maxime quas repudiandae! Ab corporis perferendis sint! Ab alias architecto assumenda aut, consequuntur, culpa cum delectus deleniti enim eum ex id, impedit labore mollitia nihil nisi nobis numquam odio odit officia perferendis quaerat quos reiciendis suscipit ullam unde ut velit veniam voluptas voluptatum! Aspernatur dicta fugit nihil? Animi architecto aut debitis delectus doloribus ducimus eos eum fugiat ipsum laborum, maiores maxime non nostrum quam quia quidem, reiciendis rerum tempore? Animi blanditiis, consequuntur cum doloribus ea illum inventore ipsum laboriosam, natus neque nihil officiis perferendis quos reiciendis repellendus. Adipisci, animi, architecto excepturi harum iste magnam minima, odio quaerat quam ratione repudiandae saepe veritatis voluptates.

 */