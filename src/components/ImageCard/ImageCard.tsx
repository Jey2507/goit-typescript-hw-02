import css from "../ImageCard/ImageCard.module.css"

interface ImageCard {
    urls: {
        small: string,
        regular: string;
    },
    alt_description: string,
    onOpen: (url:string) => void 
}

export default function ImageCard({urls, alt_description, onOpen}: ImageCard) {
    return (
        <div className={css.div}>
            <img onClick={() => onOpen(urls.regular)} className={css.image} src={urls.small} alt={alt_description} />   
        </div>
    )
}