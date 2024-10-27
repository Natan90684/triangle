// main.js

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Sign Up Functionality
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const username = document.getElementById("username").value;
        const birthday = document.getElementById("birthday").value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return db.collection('users').doc(user.uid).set({
                    username: username,
                    birthday: birthday,
                    email: email
                });
            })
            .then(() => {
                alert("Sign up successful!");
                window.location.href = "login.html";
            })
            .catch((error) => {
                console.error("Error signing up: ", error);
                alert("Error signing up: " + error.message);
            });
    });
}

// Log In Functionality
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert("Login successful!");
                window.location.href = "explore.html";
            })
            .catch((error) => {
                console.error("Error logging in: ", error);
                alert("Error logging in: " + error.message);
            });
    });
}
// Initialize Netlify Identity
if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        console.log("Netlify Identity initialized:", user);
    });

    window.netlifyIdentity.on("login", user => {
        console.log("Logged in as:", user);
        window.location.href = "explore.html";
    });

    window.netlifyIdentity.on("logout", () => {
        console.log("Logged out");
    });
}

// Sign up event listener (on signup.html)
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        netlifyIdentity.signup({
            email: email,
            password: password
        }).then(user => {
            console.log('User signed up:', user);
            window.location.href = "login.html";
        }).catch(error => {
            console.error('Sign-up error:', error);
        });
    });
}

// Login event listener (on login.html)
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        netlifyIdentity.login({
            email: email,
            password: password
        }).then(user => {
            console.log('User logged in:', user);
            window.location.href = "explore.html";
        }).catch(error => {
            console.error('Login error:', error);
        });
    });
}
// Search functionality for Explore page
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

if (searchBtn) {
    searchBtn.addEventListener('click', function () {
        const query = searchInput.value;
        console.log('Searching for:', query);
        // In future, this is where you'd search the database
    });
}
triangle/
├── index.html              # Homepage for logged-out users
├── explore.html            # Explore page, where top users and posts will display
├── login.html              # Login page
├── signup.html             # Signup page for new users
├── profile.html            # Profile page (placeholder if no users)
├── banned.html             # Page shown to banned users with details
├── privacy.html            # Privacy policy page
├── rules.html              # Community rules page
├── CNAME                   # File containing "triangle.dev" for GitHub custom domain
├── css/                    # Folder for CSS files
│   ├── styles.css          # Main CSS styles for the website
│   └── dark-mode.css       # Optional CSS for dark mode (if needed)
├── js/                     # Folder for JavaScript files
│   ├── main.js             # General JavaScript for the site
│   └── auth.js             # JavaScript for login/signup and authentication
└── assets/                 # Folder for assets like images or logos
    └── logo.png            # Logo image for navbar, favicon, etc.
