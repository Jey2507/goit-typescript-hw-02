import React from "react";
import ImageCard from "../ImageCard/ImageCard"
import css from "../ImageGallery/ImageGallery.module.css"

interface Image {
    id: number,
    urls: {
        small: string;
        regular: string;
    },
    alt_description: string;
}

interface GalleryProps {
    images: Image[],
    onOpen: (url: string) => void,
}

const ImageGallery: React.FC<GalleryProps> = ({images, onOpen}) => {
    return (
        <ul className={css.list}>
            {images.map((image) => (
                <li className={css.item} key={image.id}>
                   <ImageCard onOpen={onOpen} urls={image.urls} alt_description={image.alt_description} />
                </li>
            ))}
        </ul>
    )
}

export default ImageGallery;