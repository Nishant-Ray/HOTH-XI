import express from 'express'
import { app, db, auth} from "./firebase.js"
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
import {createLobby, joinLobby, findNearbyUsers} from  "./lobby.js";
import {submitAnswer, tagPlayer, askQuestion} from "./gameMechanics.js";
const router = express.Router();

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

router.put("/update-location/:playerId", updateLocation, (req, res) => {
  res.status(200).json({ message: "Location updated successfully" });
});

router.get("/check-game-area/:playerId",checkGameArea,(req, res) => {
    res.status(200).json({ message: "Player is within game area" });
  }
);
router.post("/signup", async (req, res) => {
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
router.post("/login", async (req, res) => {
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
router.post("/create-lobby", async (req, res) => {

  const {location, isPrivate} = req.body;

  try {
    const lobby = await createLobby(auth.userId, isPrivate, location);
    res.status(200).json({ message: "Lobby created successfully", lobby });
  } catch (error) {
    res.status(500).json({ message: `Failed to create lobby: ${error.message}` });
  }
});

router.post("/join-lobby", async (req, res) => {

  try {
    const { code } = req.body;
    const lobby = await joinLobby(code); 
    res.status(200).json({ message: "Joined private lobby successfully", lobby });
  } catch (error) {
    res.status(401).json({ message: "Invalid or taken invite code." });
  }
});

router.post("/find-public-lobby", async (req, res) => {
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
router.post("/start-game/:lobbyCode", async (req, res) => {
  try {
    // Implementation for starting the game
  } catch (err) {
    res.status(500).json({ message: "Failed to start game" });
  }
});

router.post("/end-game/:lobbyCode", async (req, res) => {
  try {
    // Implementation for ending the game
  } catch (err) {
    res.status(500).json({ message: "Failed to end game" });
  }
});

router.post("/submit-answer/:playerId", async (req, res) => {
  try {
      const { playerId } = req.params;
      const { answer } = req.body;
  
      // Call the controller function to submit the answer
      const result = await submitAnswer(playerId, answer);
  
      res.status(200).json({ message: "Answer submitted successfully", result });
    } 
    catch (error) {
      res.status(500).json({ message: "Failed to submit answer", error: error.message });
    }
  });

router.post("/tag-player/:taggerId/:tageeId", async (req, res) => {
  try {
      const { taggerId, tageeId } = req.params;
      // Call the controller function to tag the player
      const result = await tagPlayer(taggerId, tageeId);
  
      res.status(200).json({ message: "Player tagged successfully", result });
    } 
    catch (err) {
    res.status(500).json({ message: "Failed to tag player" });
  }
});

router.post("/ask-question/:askerId/:targetId", async (req, res) => {
  try {
    const { playerId } = req.params;
    const { question } = req.body;

    // Call the controller function to ask the question
    const result = await askQuestion(question, playerId);
    res.status(200).json({ message: "Question asked successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Failed to ask question" });
  }
});

export default router;
