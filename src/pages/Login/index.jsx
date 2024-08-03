import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, provider } from "../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = () => {
   const [isSignUp, setIsSignUp] = useState(false)
   const [email, setEmail] = useState("")
   const [pass, setPass] = useState("")
   const [error, setError] = useState(null)
   const navigate = useNavigate()

   const handleSubmit = (e) => {
      e.preventDefault()

      if (isSignUp) {
         createUserWithEmailAndPassword(auth, email, pass)
            .then((res) => {
               toast.success("Kayıt Başarılı")
               setIsSignUp(false)
            })
            .catch(err => {
               toast.error("Kayıt Başarısız " + err.code)
            })
      } else {
         signInWithEmailAndPassword(auth, email, pass)
            .then((res) => {
               toast.success("Giriş Başarılı")
               navigate("/home")
               setError(null)
            })
            .catch(err => {
               toast.error("Giriş Başarısız " + err.code)
               setError(err.code)
            })
      }
   }

   const handleReset = () => {
      sendPasswordResetEmail(auth, email)
         .then((res) => {
            toast.success("Şifre sıfırlama maili yollandı")
         })
         .catch(err => {
            toast.error("Giriş Başarısız " + err.code)
         })
   }

   const handleGoogle = () => {
      signInWithPopup(auth, provider)
         .then((res) => {
            toast.success("Giriş Başarılı")
            navigate("/home")
         })
         .catch(err => {
            toast.error("Giriş Başarısız " + err.code)
         })
   }


   return (
      <div className="h-screen grid place-items-center">
         <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
            <div className="flex justify-center">
               <img className="h-[60px]" src="/x-logo.webp" alt="logo" />
            </div>
            <h1 className="text-lg font-bold text-center">Twitter'a Giriş Yap</h1>

            <button
               onClick={handleGoogle}
               className="bg-white flex font-semibold items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300 text-black whitespace-nowrap">
               <img className="h-[30px]" src="/google-logo.svg" alt="" />
               Google ile Giriş Yap
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
               <div className="flex flex-col">
                  <label htmlFor="">Email</label>
                  <input
                     onChange={(e) => setEmail(e.target.value)}
                     className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]" type="text" />
               </div>
               <div className="flex flex-col">
                  <label htmlFor="">Şifre</label>
                  <input
                     onChange={(e) => setPass(e.target.value)}
                     className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]" type="password" />
               </div>

               <button className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300">{
                  isSignUp ? "Kaydol" : "Giriş Yap"
               }</button>
            </form>
            <p>
               <span className="text-gray-500">{
                  isSignUp ? "Hesabınız varsa" : "Hesabınız yoksa"
               }   </span>
               <span
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ms-2 text-blue-500 cursor-pointer"> {
                     isSignUp ? "Giriş Yapın" : "Kaydolun"
                  } </span>
            </p>
            {
               error && <button onClick={handleReset} className="text-red-600 text-center" >Şifrenizi mi unuttunuz?</button>
            }
         </div>
      </div>
   );
};

export default Login;