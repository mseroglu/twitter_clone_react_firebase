import { deleteDoc, doc } from "firebase/firestore";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase/config";
import Modal from "../Modal";
import { useRef, useState } from "react";
import { deleteObject, ref } from "firebase/storage";

const Dropdown = ({ tweet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const refDropDown = useRef()

  const handleDelete = () => {
    // silinecek elemanın referansı
    const refDoc = doc(db, "tweets", tweet.id)

    //const filePath = tweet.imageContent
    // tweeti sildikten sonra dosyayı da silmek için dosya adını elde ediyoruz
    const filePath = tweet.imageContent

    const lastIndex = filePath?.lastIndexOf("/")
    const Index = filePath?.indexOf("?")
    let fileName = filePath?.slice(lastIndex + 1, Index)
    fileName = decodeURIComponent(fileName)
    // dökümanı sil
    deleteDoc(refDoc)
      .then(() => {
        toast.info("Tweet silindi")
        // resmi storageden kaldırıyoruz
        deleteObject(ref(storage, fileName))
          .then(() => console.log("Resim storageden kaldırıldı"))
          .catch((err) => console.log("Resim storageden silinemedi " + err.code))
      })
      .catch((err) => toast.error("Bir sorun oluştu " + err.code))
  }

  const handleEdit = () => {
    setIsModalOpen(true)

  }

  return (
    <div>
      <label ref={refDropDown} className="popup ">
        <input type="checkbox" />
        <div className="burger" tabIndex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Aksiyonlar</legend>
          <hr />
          <ul>
            <li>
              <button onClick={handleEdit}>
                <MdEdit />
                <span>Edit</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <MdDelete />
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>

      {isModalOpen && <Modal tweet={tweet} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Dropdown;