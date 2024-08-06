import { deleteObject, ref } from "firebase/storage"
import { storage } from "../firebase/config"

// resmi storage den silme
export const deleteImageFromStorage = async (filePath) => {
   const lastIndex = filePath?.lastIndexOf("/")
   const Index = filePath?.indexOf("?")
   let fileName = filePath?.slice(lastIndex + 1, Index)
   fileName = decodeURIComponent(fileName)

   await deleteObject(ref(storage, fileName))
     .then(() => console.log("Resim storageden kaldırıldı"))
     .catch((err) => console.log("Resim storageden silinemedi " + err.code))
 }