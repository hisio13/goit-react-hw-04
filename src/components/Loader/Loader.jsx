import { PuffLoader } from 'react-spinners';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <PuffLoader color="#36d7b7" />
    </div>
  );
}

