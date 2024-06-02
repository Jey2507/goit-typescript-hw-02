import css from "../ImageCard/ImageCard.module.css"

export default function ImageCard({urls, alt_description, onOpen}) {
    return (
        <div className={css.div}>
            <img onClick={() => onOpen(urls.regular)} className={css.image} src={urls.small} alt={alt_description} />   
        </div>
    )
}