import './TextPart.css'

export const TextPart = props => {
    const {
        refTextPart,
        downloadLinks
    } = props

    const showText = refTextPart.current.join('. ')
    const additionalText = showText.slice(showText.length - 3, showText.length - 2) === '.' ? '' : '.'
    // console.log(showText.slice(showText.length - 3, showText.length - 2) === '.' ? '' : '.')

    // Lorem ipsum dolor sit amet, consectetur adipisicing elit, Animi assumenda blanditiis consequatur
    // exercitationem facilis harum illo in iste iure nemo neque, nesciunt nisi odio provident quaerat quasi soluta
    // tempore velit veritatis voluptatum, Alias aliquid amet corporis delectus ducimus eaque eligendi eveniet explicabo fuga harum inventore ipsam magnam natus nesciunt obcaecati optio placeat, porro possimus quae quas quia recusandae reiciendis sequi sit, ut vitae voluptate voluptatibus

    return (
        <div id="textPart" className={'textPart'}>
            <p>
                <span className={'resultPrefix'}>You. </span>
                {
                    (
                        refTextPart.current.length > 0 && `${showText + additionalText}`
                    ) || 'Text is empty!'
                }
            </p>
        </div>
    )
}