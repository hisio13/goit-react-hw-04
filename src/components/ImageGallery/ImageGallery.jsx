import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ images, onCardClick }) {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <li key={image.id} className={css.galleryItem}>
          <ImageCard image={image} onClick={() => onCardClick(image)} />
        </li>
      ))}
    </ul>
  );
}
