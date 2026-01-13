import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";

const form = document.getElementById("addStayForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop page reload

  // 👉 THIS IS WHERE YOUR CODE GOES 👇
  const data = {
    examType: document.getElementById("examType").value,
    city: document.getElementById("city").value,
    centre: document.getElementById("centre").value,
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    area: document.getElementById("area").value,
    distance: document.getElementById("distance").value,
    price: document.getElementById("price").value,
    phone: document.getElementById("phone").value,
    mapLink: document.getElementById("mapLink").value || "",
    status: "pending",
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "stays"), data);
    alert("PG / Hostel added successfully!");
    form.reset();
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error adding data");
  }
});