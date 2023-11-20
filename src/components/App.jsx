import { useEffect, useState } from 'react';
import { fetchImages } from 'api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { MyModal } from './Modal/Modal';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { animateScroll as scroll } from 'react-scroll';
import { nanoid } from 'nanoid';

export const App = () => {
  const [dataImages, setDataImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tagImageAlt, setTagImageAlt] = useState('');
  const [availablePages, setAvailablePages] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) return;

      try {
        setIsLoading(true);
        setError(false);

        const { hits, totalHits } = await fetchImages(searchQuery, page);

        if (hits.length > 0) {
          setDataImages(prevDataImages => [...prevDataImages, ...hits]);
          setAvailablePages(Math.ceil(totalHits / per_page));
          toast.success('Successfully found!');
        } else {
          toast.error(
            'Nothing found. Check the correctness of the search word.'
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page, per_page, id]);

  const handleFormSubmit = newQuery => {
    setSearchQuery(newQuery);
    setPage(1);
    setDataImages([]);
    setId(nanoid());
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    scroll.scrollToBottom();
  };

  const handleOpenModal = image => {
    const { largeImageURL, tags } = image;
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTagImageAlt(tags);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
    setTagImageAlt('');
  };

  return (
    <div>
      <Searchbar onFormSubmit={handleFormSubmit} />

      {isLoading && <Loader />}

      {error && <h1>{error.message}</h1>}

      {dataImages.length > 0 && (
        <>
          <ImageGallery dataImages={dataImages} onOpenModal={handleOpenModal} />

          {page !== availablePages && dataImages.length >= 11 && (
            <LoadMoreBtn onLoadMore={handleLoadMore} />
          )}
        </>
      )}

      {showModal && (
        <MyModal onCloseModal={handleCloseModal}>
          <img src={largeImageURL} alt={tagImageAlt} />
        </MyModal>
      )}
      <GlobalStyle />
      <Toaster />
    </div>
  );
};
