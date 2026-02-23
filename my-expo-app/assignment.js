/* ================= FIREBASE IMPORTS ================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { get, getDatabase, ref, remove, set, update } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

/* ================= FIREBASE CONFIG ================= */
const firebaseConfig = {
    apiKey: "AIzaSyB7CB8UArESESm64Cd87xGKMv3P_ZYLD0E",
    authDomain: "mobile-app-ecdc6.firebaseapp.com",
    databaseURL: "https://mobile-app-ecdc6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mobile-app-ecdc6",
    storageBucket: "mobile-app-ecdc6.firebasestorage.app",
    messagingSenderId: "215812949693",
    appId: "1:215812949693:web:02a3a441ec72e756f819d4",
    measurementId: "G-5GLBE247XC"
};

/* ================= INITIALIZE ================= */
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log("Firebase DB connected:", database);

/* ================= GET INPUT DATA ================= */
function getInputData() {
    return {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        country: document.getElementById("country").value,
        gender: document.getElementById("gender").value,
        profession: document.getElementById("profession").value,
        bio: document.getElementById("bio").value
    };
}

/* ================= CREATE ================= */
window.saveUser = function() {
    const userId = document.getElementById("userId").value.trim();
    if (!userId) return alert("User ID cannot be empty!");

    set(ref(database, "users/" + userId), getInputData())
    .then(() => alert("User saved successfully"))
    .catch(err => alert("Error: " + err.message));
}

/* ================= READ ================= */
window.readUser = function() {
    const userId = document.getElementById("userId").value.trim();
    if (!userId) return alert("User ID cannot be empty!");

    get(ref(database, "users/" + userId))
    .then(snapshot => {
        if (snapshot.exists()) {
            document.getElementById("output").textContent = JSON.stringify(snapshot.val(), null, 2);
        } else {
            document.getElementById("output").textContent = "No user found";
        }
    })
    .catch(err => alert("Error: " + err.message));
}

/* ================= UPDATE ================= */
window.updateUser = function() {
    const userId = document.getElementById("userId").value.trim();
    if (!userId) return alert("User ID cannot be empty!");

    update(ref(database, "users/" + userId), getInputData())
    .then(() => alert("User updated successfully"))
    .catch(err => alert("Error: " + err.message));
}

/* ================= DELETE ================= */
window.deleteUser = function() {
    const userId = document.getElementById("userId").value.trim();
    if (!userId) return alert("User ID cannot be empty!");

    remove(ref(database, "users/" + userId))
    .then(() => {
        alert("User deleted successfully");
        document.getElementById("output").textContent = "";
    })
    .catch(err => alert("Error: " + err.message));
}
