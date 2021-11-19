import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
apiKey: "AIzaSyCZhwPx_iPPBuRwKZ9UvD6obbOgyiaY6AI",
authDomain: "todo1-ed71e.firebaseapp.com",
projectId: "todo1-ed71e",
storageBucket: "todo1-ed71e.appspot.com",
messagingSenderId: "409054214275",
appId: "1:409054214275:web:c5088713eabeaecdac03b6",
measurementId: "G-QNYQCZ3XS7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

---

(npm ci && npm run build)
