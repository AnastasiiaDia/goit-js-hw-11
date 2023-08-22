export function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" width="320" loading="lazy"
  /></a>
  <div class="info">
    <p class="info-item">
      ${likes}
      <b>Likes</b>
    </p>
    <p class="info-item">
      ${views}
      <b>Views</b>
    </p>
    <p class="info-item">
      ${comments}
      <b>Comments</b>
    </p>
    <p class="info-item">
      ${downloads}
      <b>Downloads</b>
    </p>
  </div>
</div>
`;
      }
    )
    .join('');
}
