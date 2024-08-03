import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Post from "../../components/Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/Loader";

const Main = ({ user }) => {
   const [tweets, setTweets] = useState(null)

   useEffect(() => {
      // collection un referansı
      const tweetsCol = collection(db, "tweets")

      // sorgu ayarları
      const q = query(tweetsCol, orderBy("created_at", "desc"))

      onSnapshot(q, (snapshot) => {
         const tempTweets = []
         snapshot.docs.forEach(doc => tempTweets.push({ ...doc.data(), id: doc.id }))

         setTweets(tempTweets)
      })
   }, [])

   return (
      <div className="border border-zinc-600">
         <header className="border-b border-zinc-600 p-4 font-bold">Anasayfa</header>

         <Form user={user} />

         {
            tweets === null
               ? (<div className="grid place-items-center h-60">
                  <Loader />
               </div>)
               : tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
         }
      </div>
   );
};

export default Main;