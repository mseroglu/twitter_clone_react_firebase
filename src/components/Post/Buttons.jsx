import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { auth, db } from "../../firebase/config";

const Buttons = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false)


  useEffect(() => {
    const found = tweet?.likes.includes(auth.currentUser.uid)
    setIsLiked(found)

  }, [tweet])



  const toggleLike = () => {
    const userId = auth.currentUser.uid
    const found = tweet?.likes.includes(userId)

    setIsLiked(!isLiked)
    //güncellenecek docümanı belirle "tweets" koleksiyonun "tweet.id" dökümanı  
    const docRef = doc(db, "tweets", tweet.id)

    updateDoc(docRef, {
      likes: found 
      ? tweet.likes = arrayRemove(userId) 
      : tweet.likes = arrayUnion(userId)
    })
  }

  return (
    <div className="flex justify-around mt-5">
      <button className="p-3 rounded-full transition hover:bg-gray-500">
        <LuMessageCircle />
      </button>

      <button className="p-3 rounded-full transition hover:bg-gray-500">
        <FaRetweet />
      </button >

      <button onClick={toggleLike}
        className="flex gap-2 items-center p-3 rounded-full transition hover:bg-gray-500">
        {isLiked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}{tweet.likes.length}
      </button >

      <button className="p-3 rounded-full transition hover:bg-gray-500">
        <CiShare2 />
      </button >
    </div>
  );
};

export default Buttons;