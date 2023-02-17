import React, { Component } from 'react';
import s from '../components/App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { Toaster } from 'react-hot-toast';
import imageAPI from './services/pixabay-api';

export class App extends Component {
  state = {
    imageName: '',
    images: [],
    status: 'idle',
    page: 1,
    numberResults: 12,
    showModal: false,
    largeImage: '',
    altLargeImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const API_KEY = '24082194-32c1b396cbebb1b9a26199ae3';
    const { imageName, page, numberResults } = this.state;
    const URL = 'https://pixabay.com/api/';

    if (prevState.imageName !== this.state.imageName) {
      this.setState({ status: 'pending' });

      imageAPI
        .fetchImage(imageName, API_KEY, URL, page, numberResults)
        .then(({ hits }) => this.setState({ images: hits, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevState.page !== this.state.page) {
      imageAPI
        .fetchImage(imageName, API_KEY, URL, page, numberResults)
        .then(({ hits }) =>
          this.setState({
            images: [...prevState.images, ...hits],
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = imageName => {
    this.setState({ imageName, page: 1 });
  };
  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };
  handleClickImage = (url, alt) => {
    this.setState({ largeImage: url, altLargeImage: alt, showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { images, status, showModal, largeImage, altLargeImage } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Toaster />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loader />
        </div>
      );
    }
    if (status === 'rejected') {
      return <h1>'Something went wrong 😔. Try again later'</h1>;
    }
    if (status === 'resolved') {
      return (
        <div className={s.App}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery imagesData={images} onClick={this.handleClickImage} />
          <Button loadMore={this.handleLoadMore} />
          {showModal && (
            <Modal
              src={largeImage}
              alt={altLargeImage}
              onCloseModal={this.closeModal}
            />
          )}
          <Toaster />
        </div>
      );
    }
  }
}
