
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyDam8hDxPIK32eA_d6x2HUsryfGcYGEEso",
      authDomain: "examroute-2c382.firebaseapp.com",
      projectId: "examroute-2c382",
      storageBucket: "examroute-2c382.appspot.com",
      messagingSenderId: "9052235272",
      appId: "1:9052235272:web:ea06ccdb07a8a6ed093bd"
    };

    const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app);