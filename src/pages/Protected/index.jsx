// alt route in içeriğini parent route aktarır
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../firebase/config";

const Protected = () => {
   const [isAuth, setIsAuth] = useState()

   useEffect(() => {
      // kullanıcı oturumunu izler, değişim old. callback fonk tetiklenir
      onAuthStateChanged(auth, (user) => {
         setIsAuth(user ? true : false)
      })
   }, [])

   // yetki yoksa anasayfaya yönlendir
   if (isAuth === false) {
      // useNavigate kullanınca hata oluşuyor,
      return <Navigate to="/" />
   }

   return (
      <div className="h-screen grid place-items-center">
         {
            isAuth && <Outlet />
         }
      </div>
   );
};

export default Protected;