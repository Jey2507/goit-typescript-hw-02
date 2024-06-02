import SearchBar from './components/SearchBar/SearchBar'
import ImageGallery from './components/ImageGallery/ImageGallery'
import Loader from './components/Loader/Loader'
import './App.css'
import { useEffect, useState, useRef } from 'react'
import { fetchImages } from './gallery-api'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import ImageModal from './components/ImageModal/ImageModal'

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const loadMoreButtonRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [modalIsOpen, setIsOpen] = useState(false);

  const handlSearch = async (newQuery) => {
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
        const data = await fetchImages(query, page);
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

const openModal = (image) => {
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


