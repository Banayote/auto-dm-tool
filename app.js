// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmCn-NTHpWNf-XkXPUeDxmESy1XzFm9Z0",
  authDomain: "auto-dm-tool.firebaseapp.com",
  projectId: "auto-dm-tool",
  storageBucket: "auto-dm-tool.appspot.com",
  messagingSenderId: "311728143798",
  appId: "1:311728143798:web:b1e85d8893dfa60492d517",
  measurementId: "G-ETYVFJ8XM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to handle user login
function logInUser() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Sign in the user with Firebase Authentication
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Logged in:', user);
      
      // Hide the login section and show the DM template section after successful login
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('dm-section').style.display = 'block';
      
      // Optionally load templates after login
      loadDMTemplates();
    })
    .catch((error) => {
      console.error('Login error:', error.message);
    });
}

// Function to add a DM template to Firestore
async function addDMTemplate() {
  const title = document.getElementById('title').value;
  const message = document.getElementById('message').value;

  try {
    // Add a new document to the "dmTemplates" collection
    await addDoc(collection(db, "dmTemplates"), {
      title: title,
      message: message,
      timestamp: new Date(),
    });

    alert('Template saved!');
    loadDMTemplates();  // Reload templates after saving a new one
  } catch (e) {
    console.error("Error adding template: ", e);
  }
}

// Function to load all DM templates from Firestore
async function loadDMTemplates() {
  const querySnapshot = await getDocs(collection(db, "dmTemplates"));
  const templateList = document.getElementById('template-list');
  templateList.innerHTML = '';  // Clear the list before loading new templates

  querySnapshot.forEach((doc) => {
    const template = doc.data();
    templateList.innerHTML += `<p><strong>${template.title}</strong><br>${template.message}</p>`;
  });
}

// Optionally, load templates when the page loads
loadDMTemplates();
