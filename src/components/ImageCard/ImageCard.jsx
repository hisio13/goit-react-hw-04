import css from './ImageCard.module.css';

export default function ImageCard({ image, onClick }) {
  return (
    <li className={css.item}>
      <div className={css.wrapper} onClick={() => onClick(image)}>
        <img src={image.urls.small} alt={image.alt_description} />
      </div>
    </li>
  );
}
