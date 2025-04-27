// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAmCn-NTHpWNf-XkXPUeDxmESy1XzFm9Z0",
  authDomain: "auto-dm-tool.firebaseapp.com",
  projectId: "auto-dm-tool",
  storageBucket: "auto-dm-tool.appspot.com",
  messagingSenderId: "311728143798",
  appId: "1:311728143798:web:b1e85d8893dfa60492d517",
  measurementId: "G-ETYVFJ8XM9"
};

firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Login function
function logInUser() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log('User logged in:', userCredential.user.email);
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
    })
    .catch((error) => {
      console.error('Login failed:', error.message);
      alert('Login failed: ' + error.message);
    });
}

// Save DM Template function
function saveTemplate() {
  const title = document.getElementById('dm-title').value;
  const message = document.getElementById('dm-message').value;

  if (!title || !message) {
    alert("Please fill in both fields!");
    return;
  }

  db.collection('templates').add({
    title: title,
    message: message,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert('DM Template saved!');
    document.getElementById('dm-title').value = '';
    document.getElementById('dm-message').value = '';
  })
  .catch((error) => {
    console.error('Error saving template:', error.message);
    alert('Error saving template: ' + error.message);
  });
}

// Logout function
function logOutUser() {
  auth.signOut()
    .then(() => {
      console.log('User logged out');
      document.getElementById('dashboard').style.display = 'none';
      document.getElementById('login-form').style.display = 'block';
    })
    .catch((error) => {
      console.error('Logout error:', error.message);
    });
}
