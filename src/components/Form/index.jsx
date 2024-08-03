import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import Loader from "../Loader";
import { upload } from "../../utils/upload";

const Form = ({ user }) => {
   const [isLoading, setIsLoading] = useState(false)
   const tweetsCollection = collection(db, "tweets")

   const handleSubmit = async (e) => {
      e.preventDefault()

      // 1- input verilerine eriş
      const text = e.target[0].value
      const file = e.target[1].files[0]

      // 2- yazı veya esim yoksa uyarı ver
      if (!text && !file) {
         return toast.warning("Lütfen içerik giriniz", { position: "bottom-right" })
      }
      try {
         setIsLoading(true)
         // 3- resim varsa storage a yükle
         const imgUrl = await upload(file)

         // 4- yeni tweet dökümanı koleksiyona ekle
         await addDoc(tweetsCollection, {
            textContent: text,
            imageContent: imgUrl,
            likes: [],
            isEdited: false,
            created_at: serverTimestamp(),
            user: {
               id: auth.currentUser.uid,
               name: auth.currentUser.displayName,
               photo: auth.currentUser.photoURL
            }
         })
         // 5- formu sıfırla
         e.target.reset()
      } catch (err) {
         toast.error("Bir sorun oluştu, tweet atılamadı" + err.code)
      }

      setIsLoading(false)

   }
   console.log("form bileşeni render oldu")
   return (
      <div className="flex gap-3 border-b border-zinc-600 p-4">
         <img className="rounded-full w-9 h-9 md:h-11 md:w-11" src={user?.photoURL} alt="userImg" />

         <form onSubmit={handleSubmit} className="w-full">
   
            <textarea name="text" id="text" rows={5} className="bg-gray-950 w-full outline-none p-2 text-md md:text-lg" placeholder="Neler oluyor?"/>

            <div className=" flex justify-between items-center">
               <label htmlFor="image" className="cursor-pointer text-xl bg-transparent outline-none rounded-full hover:bg-gray-800 p-4 transition ">
                  <BsCardImage />
               </label>
               <input type="file" id="image" hidden />
               {isLoading
                  ? <Loader />
                  : <button className="bg-blue-600 flex px-4 py-2 rounded-full transition hover:bg-blue-700">Tweetle</button>
               }
            </div>
         </form>
      </div>
   );
};

export default React.memo(Form);