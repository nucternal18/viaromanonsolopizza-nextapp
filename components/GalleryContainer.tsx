import { IPicture } from "../lib/types";
import Table from "./GalleryTable";
import Loader from "./Loader";
import PageBtnContainer from "./Pagination";

interface GalleryContainerProps {
  gallery: IPicture;
  isLoading: boolean;
  deleteHandler: (id: string) => void;
}
const GalleryContainer: React.FC<GalleryContainerProps> = ({
  gallery,
  isLoading,
  deleteHandler,
}: GalleryContainerProps): JSX.Element => {
  const { pictures, totalPictures, numberOfPages } = gallery;

  if (isLoading) {
    <Loader classes="w-8 h-8" />;
  }

  if (pictures.length === 0) {
    return <div>Nessuna immagine da visualizzare</div>;
  }

  return (
    <div className="mt-5 text-gray-900 dark:text-gray-200 max-w-screen-2xl mx-1 sm:mx-auto ">
      <h5 className="text-2xl font-semibold font-mono capitalize ml-1 ">
        {totalPictures} immagine{pictures.length > 1 && "s"} trovata
      </h5>
      <div className="w-full mx-auto overscroll-hidden my-4">
        <Table data={pictures} handleDelete={deleteHandler} />
      </div>
      {numberOfPages > 1 && <PageBtnContainer numberOfPages={numberOfPages} />}
    </div>
  );
};

export default GalleryContainer;
