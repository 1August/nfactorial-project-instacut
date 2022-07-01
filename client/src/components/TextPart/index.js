import './TextPart.css'

export const TextPart = ({...props}) => {
    const {
        refTextPart,
        downloadLinks
    } = props

    const downloadAll = (e, filename) => {
        e.preventDefault()
        for (let i = 0; i < downloadLinks.length; i++) {
            setTimeout(() => {
                const a = document.createElement('a')
                a.setAttribute('href', downloadLinks[i])
                a.setAttribute('download', `InstaCut-${i}`)
                a.click()
                a.remove()
            }, i * 500)
        }
    }

    return (
        <div id="textPart">
            <p>
                <span className={'resultPrefix'}>You. </span>
                {
                    (
                        refTextPart.current.length > 0
                        && `${refTextPart.current.join('. ') + '.'}`
                    ) || 'Download your InstaCut here...'
                }
            </p>
            <a href="#" onClick={e => downloadAll(e, 'Canvas')}>Download all</a>
        </div>
    )
}