function fetchImage(imageName, API_KEY, URL, page, numberResults) {
  return fetch(
    `${URL}?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${numberResults}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error('Something went wrong 😔. Try again later')
    );
  });
}

const api = { fetchImage };

export default api;
