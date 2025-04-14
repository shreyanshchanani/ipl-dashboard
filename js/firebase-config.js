// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEk2Z6zKtUsq4i4_9mSHm352IkxH1AFtk",
  authDomain: "some-shite.firebaseapp.com",
  databaseURL: "https://some-shite-default-rtdb.firebaseio.com",
  projectId: "some-shite",
  storageBucket: "some-shite.appspot.com",
  messagingSenderId: "219023659434",
  appId: "1:219023659434:web:141e46e8b224bb56585bd3"
};

// Initialize Firebase with retry
let database = null;
let dbRefs = null;
let initAttempts = 0;
const maxAttempts = 3;

function initializeFirebase() {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    // Get a reference to the database service
    database = firebase.database();
    
    // Database references for easy access
    dbRefs = {
      players: database.ref('players'),
      teams: database.ref('teams'),
      currentAuction: database.ref('currentAuction'),
      bidHistory: database.ref('bidHistory')
    };
    
    console.log("Firebase initialized successfully");
    
    // Test database connection
    database.ref('.info/connected').on('value', (snap) => {
      if (snap.val() === true) {
        console.log("Connected to Firebase");
      } else {
        console.log("Disconnected from Firebase");
      }
    });
    
    return true;
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    
    if (initAttempts < maxAttempts) {
      console.log(`Retrying Firebase initialization (attempt ${initAttempts + 1}/${maxAttempts})...`);
      initAttempts++;
      setTimeout(initializeFirebase, 1000); // Retry after 1 second
    } else {
      alert("Error connecting to the database. Some features may not work properly.");
    }
    
    return false;
  }
} 