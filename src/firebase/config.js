import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbrJi9AOQQgxVm1G9XhREg2TkoYRb5ePc",
  authDomain: "twitter-clone-b606d.firebaseapp.com",
  projectId: "twitter-clone-b606d",
  storageBucket: "twitter-clone-b606d.appspot.com",
  messagingSenderId: "958891027330",
  appId: "1:958891027330:web:b29d7bed7e743e0faefd9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth hizmetinin referansı
export const auth = getAuth(app)

// sağlayıcının referansınıı al
export const provider = new GoogleAuthProvider()

// veritabanının referansını alıyoruz
export const db = getFirestore(app)

// dosyaları saklayacağımız storage ın referansını alıyoruz
export const storage = getStorage(app)


