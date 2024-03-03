import { app, db, auth} from "firebase.js"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const userRouter = express.Router();

const updateLocation = async (req, res, next) => {
  try {
   // implementation
  } 
  catch (err) {
    res.status(500).json({ message: "Location Not Found" });
  }
};
const checkGameArea = async (req, res, next) => {
  try {
    // implementation
  }
  catch (err) {
    res.status(500).json({ message: "Game Area Check Failed" });
  }
};

userRouter.put("/update-location/:playerId", updateLocation, (req, res) => {
  res.status(200).json({ message: "Location updated successfully" });
});

userRouter.get("/check-game-area/:playerId",checkGameArea,(req, res) => {
    res.status(200).json({ message: "Player is within game area" });
  }
);
userRouter.post("/signup", async (req, res) => {
  console.log("Signing up");

  const { email, username, password } = req.body;

  if (
      email === undefined ||
      username === undefined ||
      password === undefined
  ) {
      return res
          .status(401)
          .json({
              success: false,
              message:
                  "Missing email, username, and/or password in request body.",
          });
  }
  try {
      const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
      );
      // Signed up
      const user = userCredential.user;
      const newUserData = {
          username: username,
          email: email,
          fullname: fullname
      };
      setDoc(doc(database, "users", user.uid), newUserData);

      return res
          .status(200)
          .json({
              success: true,
              message: "Signed up successfully!",
              uid: user.uid,
          });
  } catch (error) {
      console.log(error);
      return res.status(401).json({ success: false, message: error.message });
  }
});
userRouter.post("/login", async (req, res) => {
  console.log("Logging in");

  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
      return res
          .status(401)
          .json({
              success: false,
              message: "Missing email and/or password in request body.",
          });
  }

  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Logged in
          const user = userCredential.user;
          return res
              .status(200)
              .json({
                  success: true,
                  message: "Logged in successfully!",
                  uid: user.uid,
              });
      })
      .catch((error) => {
          return res
              .status(401)
              .json({ success: false, message: error.message });
      });
});
userRouter.post("/create-private-lobby", async (req, res) => {
  try {
    const code = generateRandomCode(6); // Generate a 6-digit random alphanumeric code
    const lobby = await createLobby(code, true);
    res.status(200).json({ message: "Private lobby created successfully", lobby });
  } catch (error) {
    res.status(500).json({ message: "Failed to create private lobby" });
  }
});

userRouter.post("/join-private-lobby", async (req, res) => {
  try {
    const { code } = req.body;
    const lobby = await joinPrivateLobby(code); 
    res.status(200).json({ message: "Joined private lobby successfully", lobby });
  } catch (error) {
    res.status(401).json({ message: "Invalid or taken invite code." });
  }
});

userRouter.post("/find-public-lobby", async (req, res) => {
  try {
    const { userId, radius } = req.body;
    const nearbyUsers = await findNearbyUsers(userId, radius); // Find nearby users within the specified radius
    if (nearbyUsers.length < 9) {
      throw new Error("Not enough nearby users to create a public lobby");
    }
    const lobby = await createLobby(null, false, nearbyUsers);
    res.status(200).json({ message: "Public lobby created successfully", lobby });
  } catch (error) {
    res.status(500).json({ message: "Failed to find public lobby" });
  }
});
userRouter.post("/start-game/:lobbyCode", async (req, res) => {
  try {
    // Implementation for starting the game
  } catch (err) {
    res.status(500).json({ message: "Failed to start game" });
  }
});

userRouter.post("/end-game/:lobbyCode", async (req, res) => {
  try {
    // Implementation for ending the game
  } catch (err) {
    res.status(500).json({ message: "Failed to end game" });
  }
});

userRouter.post("/submit-answer/:playerId", async (req, res) => {
  try {
    // Implementation for submitting an answer
  } catch (err) {
    res.status(401).json({ message: "Incorrect Answer" });
  }
});

userRouter.post("/tag-player/:taggerId/:tageeId", async (req, res) => {
  try {
    // Implementation for tagging a player
  } catch (err) {
    res.status(500).json({ message: "Failed to tag player" });
  }
});

userRouter.post("/ask-question/:askerId/:targetId", async (req, res) => {
  try {
    // Implementation for asking a question
  } catch (err) {
    res.status(500).json({ message: "Failed to ask question" });
  }
});

export default userRouter;
