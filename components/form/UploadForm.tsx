import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FaPlusCircle } from "react-icons/fa";
import Button from "../Button/GlobalButton";
import Loader from "../Loader";

const UploadForm = ({
  addPicture,
  uploadGalleryImage,
  image,
  uploading,
  error,
}) => {
  const router = useRouter();

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (file && types.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        uploadGalleryImage(reader.result);
      };
      reader.onerror = () => {
        console.error("something went wrong!");
      };
    } else {
      toast.error("Please select an image file (png or jpeg)");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addPicture(image);
    router.reload();
  };

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center px-2 py-2 mx-2 my-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200"
      >
        <div className="mb-4">
          <label className="flex justify-center mb-2 mr-2 text-base font-bold text-gray-700">
            {uploading ? (
              <div className="mx-auto w-full py-10">
                <Loader classes="w-6 h-6" />
              </div>
            ) : (
              <>
                <FaPlusCircle className="text-4xl" />
                <input
                  type="file"
                  onChange={uploadFileHandler}
                  className="hidden"
                />
              </>
            )}
            {error && <div className="justify-center">{error}</div>}
          </label>
        </div>
        <div className="flex justify-center">
          {image && <Image src={image} alt="" width={100} height={100} />}
        </div>
        <div className="flex items-center justify-center px-4 pt-4 mb-4 border-t-4 border-current border-gray-200">
          <Button type="submit" color="dark">
            Add Picture
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
