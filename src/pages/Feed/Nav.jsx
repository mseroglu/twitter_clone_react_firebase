import { BiSolidDoorOpen } from "react-icons/bi";
import { navSections } from "../../utils/constants";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";


const Nav = ({ user }) => {

   const handleSignOut = ()=>{
      signOut(auth)
      .then(() => toast.success("Çıkış yapıldı"))
      .catch(err => toast.error("Çıkış yapılmadı "+ err.code))
   }

   return (
      <nav className="flex flex-col justify-between px-2 py-4 h-screen">
         <div>
            <img className="max-w-20" src="/x-logo.webp" alt="logo" />
            {navSections.map((item, key) => (
               <div key={key} className="flex items-center gap-3 p-3 cursor-pointer rounded-lg transition hover:bg-[#50505b] max-md:justify-center ">
                  <span className="text-2xl max-md:text-3xl">{ item.icon }</span>
                  <span className="whitespace-nowrap max-md:hidden text-md">{item.title}</span>
               </div>
            ))}
         </div>

         <div className="grid place-items-center">
            {
               !user
                  ? (<div className="w-16 h-16 bg-gray-400 rounded-full animate-bounce"></div>)
                  : (
                     <div className="flex flex-col gap-5">
                        <div className="grid place-items-center">
                           <img className="rounded-full w-12 h-12 md:w-14 md:h-14" src={user.photoURL} alt="userImg" />
                           <p className="max-md:hidden text-center">{user.displayName}</p>
                        </div>
                        <button onClick={handleSignOut} className="flex justify-center gap-2 p-1 items-center bg-zinc-700 rounded text-xl md:text-[15px] transition hover:bg-zinc-600">
                           <BiSolidDoorOpen className="text-3xl" />
                           <span className="max-md:hidden">Çıkış Yap</span>
                        </button>
                     </div>
                  )
            }
         </div>
      </nav>
   );
};

export default Nav;