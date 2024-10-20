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
