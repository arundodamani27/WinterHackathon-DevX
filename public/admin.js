import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDam8hDxPIK32eA_d6x2HUsryfGcYGEEso",
        authDomain: "examroute-2c382.firebaseapp.com",
        projectId: "examroute-2c382",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const pendingDiv = document.getElementById("pendingList");

// Fetch pending entries
const q = query(collection(db, "stays"), where("status", "==", "pending"));
const snapshot = await getDocs(q);

snapshot.forEach((docSnap) => {
  const d = docSnap.data();

  const div = document.createElement("div");
  div.innerHTML = `
    <h4>${d.name}</h4>
    <p>${d.city} – ${d.centre}</p>
    <p>Phone: ${d.phone}</p>
    <button onclick="approve('${docSnap.id}')">Approve</button>
    <button onclick="reject('${docSnap.id}')">Reject</button>
    <hr/>
  `;

  pendingDiv.appendChild(div);
});

// Approve function
window.approve = async (id) => {
  await updateDoc(doc(db, "stays", id), {
    status: "approved"
  });
  alert("Approved!");
  location.reload();
};

// Reject function
window.reject = async (id) => {
  await updateDoc(doc(db, "stays", id), {
    status: "rejected"
  });
  alert("Rejected!");
  location.reload();
};