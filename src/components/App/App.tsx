import SearchBar from '../SearchBar/SearchBar'
import ImageGallery from '../ImageGallery/ImageGallery'
import Loader from '../Loader/Loader'
import './App.css'
import { useEffect, useState, useRef } from 'react'
import { fetchImages } from '../../gallery-api'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import ImageModal from '../ImageModal/ImageModal'

interface Image {
  id: number,
  url: string,
  urls: {
    small: string;
    regular: string;
},
  alt_description: string;
}

export default function App() {
  const [gallery, setGallery] = useState<Image[]>([]);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const handlSearch = async (newQuery:string) => {
    setQuery(newQuery);
    setPage(1);
    setGallery([]);
  }

  const handlLoadMore = () => {
    setPage(page + 1);
  }


  useEffect(() => {
    async function getImages() {
      if (query === "") {
        return;
      }
      setError(false)
      try {
        setSpinner(true);
        const data:Image[] = await fetchImages(query, page);
        if (data.length === 0) {
          throw new Error("No item..");
      }
        setGallery(prevGallery => [...prevGallery, ...data]);
      } catch (error) {
        setError(true);
      } finally {
        setSpinner(false);
      }
    }
  
    getImages();
  }, [page, query]);
  
useEffect(() => {
  if (gallery.length <= 12) {
    return
  }
  if (loadMoreButtonRef.current) {
    const loadMoreButtonRect = loadMoreButtonRef.current.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + loadMoreButtonRect.top,
      behavior: 'smooth',
    });
  }
}, [gallery]);

const openModal = (image: string) => {
  setSelectedImage(image);
  setIsOpen(true);
}

const closeModal = () => {
  setIsOpen(false);
}

  return (
    <>
      <SearchBar onSearch={handlSearch} />
      
      {error ? <ErrorMessage />: gallery.length > 0 && <ImageGallery onOpen={openModal} images={gallery} />}
      {spinner && <Loader />}
      {gallery.length > 11 && <LoadMoreBtn onRef={loadMoreButtonRef} onAdd={handlLoadMore} />}
      
      <ImageModal open={modalIsOpen} selectedImage={selectedImage} onClose={closeModal} />
    </>
  )
}


