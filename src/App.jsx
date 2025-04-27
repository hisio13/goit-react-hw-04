import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";

import Modal from "react-modal";
Modal.setAppElement("#root");

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);

  async function fetchImages(search, pageNum) {
    if (loading) return;

    try {
      setLoading(true);
      const accessKey = "BpYRJE4xvIB7Hxr42pvsR_NQNvTzNNmnT9DRQT8iIoo";
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: search,
          page: pageNum,
          client_id: accessKey,
          per_page: 4,
        },
      });

      if (response.data.results.length === 0) {
        toast.error("No photos for this topic");
        setImages([]);
        setTotalImages(0);
        return;
      }

      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setTotalImages(response.data.total);
      setError(false);
    } catch (error) {
      setError(true);
      setImages([]);
      setTotalImages(0);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(topic) {
    if (topic !== query) {
      setImages([]);
      setPage(1);
      setTotalImages(0);
      setQuery(topic);
    }
  }

  function handleLoadMore() {
    if (loading) return;
    setPage((prevPage) => prevPage + 1);
  }

  function openModal(image) {
    setIsOpen(true);
    setModalImage(image);
  }

  function closeModal() {
    setIsOpen(false);
    setModalImage(null);
  }

  useEffect(() => {
    if (query) {
      fetchImages(query, page);
    }
  }, [query, page]);

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      <ImageGallery images={images} onCardClick={openModal} />
      {loading && <Loader />}
      {modalImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          image={modalImage}
        />
      )}
      {!loading && images.length > 0 && images.length < totalImages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {!loading && images.length > 0 && images.length >= totalImages && (
        <p>No more images for this topic.</p>
      )}
    </>
  );
}

export default App;
