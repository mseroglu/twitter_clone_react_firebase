import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase/config"
import { v4 } from "uuid"
import { toast } from "react-toastify"


export const upload = async (file) => {
   // dosya resim değilse veya yoksa durdur
   if (!file?.type.startsWith("image") || !file) return null

   const imageRef = ref(storage, v4() + file.name)

   try {
      await uploadBytes(imageRef, file)

      return await getDownloadURL(imageRef)
   } catch (err) {
      toast.error("Fotoğraf yüklenirken bir hata oluştu " + err.code)
   }
}