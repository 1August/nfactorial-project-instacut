import './TextPart.css'

export const TextPart = props => {
    const {
        refTextPart,
        downloadLinks
    } = props

    const downloadAll = e => {
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
        <div id="textPart" className={'textPart'}>
            <p>
                <span className={'resultPrefix'}>You. </span>
                {
                    (
                        refTextPart.current.length > 0
                        && `${refTextPart.current.join('. ') + '.'}`
                    ) || 'Text is empty!'
                }
            </p>
            <a href="#" onClick={downloadAll}>Download all</a>
        </div>
    )
}