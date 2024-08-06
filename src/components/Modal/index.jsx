import { doc, updateDoc } from "firebase/firestore";
import { IoMdClose } from "react-icons/io";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { upload } from "../../utils/upload";
import { useState } from "react";
import Loader from "../Loader";
import { deleteImageFromStorage } from "../../utils/deleteImageFromStorage";

const Modal = ({ tweet, setIsModalOpen }) => {
   const [isLoading, setIsLoading] = useState(false)

  
   const handleSubmit = async (e) => {
      e.preventDefault()

      setIsLoading(true)
      // forma erişelim
      const text = e.target.text.value
      const file = e.target.file.files[0]
      // slinecek eski foto
      const filePath = tweet.imageContent
      // güncellenecek dökümanın referansı
      const refDoc = doc(db, "tweets", tweet.id)

      if (!file && !file?.type.startsWith("image")) {
         // foto seçilmediyse
         await updateDoc(refDoc, { textContent: text, isEdited: true })
            .then(() => {
               toast.success("Güncelleme başarılı")
            })
            .catch((err) => toast.error("Güncelleme başarısız.." + err.code))

      } else {
         // foto seçildiyse
         const fileUrl = await upload(file)

         await updateDoc(refDoc, {
            textContent: text,
            isEdited: true,
            imageContent: fileUrl,
         })
         .then(() => {
            toast.success("Güncelleme başarılı")
            
            // varsa eski fotoyu sil
            filePath && deleteImageFromStorage(filePath)
            })
            .catch((err) => toast.error("Güncelleme başarısız.." + err.code))

         setIsLoading(false)
      }

      setIsModalOpen(false)


   }

   return (
      <div className="bg-white bg-opacity-30 w-full h-full fixed inset-0 grid place-items-center ">
         <div className="bg-black w-3/4 max-h-fit relative p-5 rounded-3xl max-w-[600px]">

            <button
               onClick={() => setIsModalOpen(false)}
               className="absolute text-3xl top-1 right-1 transition rounded-full p-1 hover:bg-gray-700 border border-slate-500" >
               <IoMdClose />
            </button>
            <h2 className="text-3xl text-center ">Tweet'i Düzenle</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10 mt-10 justify-center items-center">
               <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="text">İçerik</label>
                  <textarea name="text" id="text" defaultValue={tweet.textContent} rows={5} className="bg-gray-900 outline-none p-2 text-lg" />
               </div>
               <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="file">Resim Ekle</label>
                  <input type="file" name="file" id="file" />
               </div>
               {
                  isLoading
                     ? <Loader />
                     : <button type="submit" className="bg-blue-600 p-5 w-[150px] rounded-full hover:bg-blue-700">Kaydet</button>
               }

            </form>
         </div>

      </div>
   );
};

export default Modal;