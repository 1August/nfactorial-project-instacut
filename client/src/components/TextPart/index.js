export const TextPart = ({...props}) => {
    const {
        refTextPart
    } = props

    return(
        <p>
            {
                (
                    refTextPart.current.length > 0
                    && `${refTextPart.current.join('. ') + '.'}`
                ) || 'Download your InstaCut here...'
            }
        </p>
    )
}