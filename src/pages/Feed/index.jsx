import { useEffect, useState } from "react";
import Main from "./Main";
import Nav from "./Nav";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";


const Feed = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    })

    //! component kapanınca takibi bırak 
    //? unsub direk return edilmez bir foksiyon içinde çağırılır
    return () => unsub()
  }, [])

  console.log(user)

  return (
    <div className="feed  h-min overflow-hidden bg-black">

      <Nav user={user} />

      <Main user={user} />

    </div>
  );
};

export default Feed;