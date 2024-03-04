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
import {createLobby, joinLobby, findNearbyLobbies} from  "./lobby.js";
import {submitAnswer, tagPlayer, getUsers, getPoints, getQuestions, startGame} from "./gameMechanics.js";
const router = express.Router();

const checkGameArea = async (req, res, next) => {
  try {
    // implementation
  }
  catch (err) {
    res.status(500).json({ message: "Game Area Check Failed" });
  }
};

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
          fullname: fullname,
          location: [0,0],
          points: 0,
          answer : "",
          partner : "",
          tagged : false
      };
      setDoc(doc(db, "users", user.uid), newUserData);

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
    const code = await createLobby(auth.currentUser.uid, isPrivate, location);
    console.log(code);
    res.status(200).json({ message: "Lobby created successfully", lobby : code });
  } catch (error) {
    res.status(500).json({ message: `Failed to create lobby: ${error.message}` });
  }
});

router.post("/join-lobby", async (req, res) => {
  try {
    const { code } = req.body;
    const lobby = await joinLobby(auth.currentUser.uid, code); 
    res.status(200).json({ message: "Joined private lobby successfully", lobby });
  } catch (error) {
    res.status(401).json({ message: "Invalid or taken invite code." });
  }
});

router.post("/find-lobby", async (req, res) => {
  try {
    const { location, radius } = req.body;
    const lobbies = await findNearbyLobbies(location, radius); // Find nearby users within the specified radius
    res.status(200).json({ message: "Found public lobbies successfully", lobbies});

  } catch (error) {
    res.status(500).json({ message: "Failed to find public lobby" });
  }
});
router.post("/start-game/", async (req, res) => {
  try {
    // Implementation for starting the game
  } catch (err) {
    res.status(500).json({ message: "Failed to start game" });
  }
});

router.post("/end-game/", async (req, res) => {
  try {
    // Implementation for ending the game
  } catch (err) {
    res.status(500).json({ message: "Failed to end game" });
  }
});

router.post("/submit-answer", async (req, res) => {
  try {
      const { playerId, answer } = req.body;
  
      // Call the controller function to submit the answer
      const result = await submitAnswer(playerId, answer);
  
      res.status(200).json({ message: "Answer submitted successfully", result });
    } 
    catch (error) {
      res.status(500).json({ message: "Failed to submit answer", error: error.message });
    }
  });

router.post("/start-game", async (req, res) => {
  try {
    const {lobbyId} = req.body;

    const result = await startGame(lobbyId);
      res.status(200).json({ message: "Game started successfully", result });
  } catch (error) {
          res
            .status(500)
            .json({ message: "Failed to start game", error: error.message });

  }
})

router.post("/check-if-game-started", async (req, res) => {
  try {
    const { lobbyId } = req.body;

    const result = await checkGameStarted(lobbyId);
    res.status(200).json({ message: "Game started successfully", value: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to start game", error: error.message });
  }
});



router.post("/tag-player", async (req, res) => {
  try {
      const { taggerId, taggeeId, lobbyId } = req.body;
      // Call the controller function to tag the player
      const result = await tagPlayer(tageeId);
  
      res.status(200).json({ message: "Player tagged successfully", result });
    } 
    catch (err) {
    res.status(500).json({ message: "Failed to tag player" });
  }
});

router.post("/ask-question", async (req, res) => {
  try {
    const { taggee1_id, taggee2_id } = req.body;
    // Call the controller function to ask the question
    const result = await getQuestions();
    res.status(200).json({ message: "Question asked successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Failed to ask question" });
  }
});

router.get("/get-users-in-lobby", async (req, res) => {
  try {
    const { lobbyId } = req.body;

    // Call the controller function to get the lobby by its ID
    const users = await getUsers(lobbyId);

    if (!users) {
      return res.status(404).json({ message: "Lobby not found" });
    }
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: "Failed to get users in lobby", error: error.message });
  }
});

router.post("/get-points", async (req, res) => {
  try {
    const { lobbyId } = req.body;
    
    const points = await getPoints(lobbyId);
    if (!points) {
      return res.status(404).json({ message: "Lobby not found" });
    }
    res.status(200).json({ points });
  } catch (error) {
        res.status(500).json({ message: "Failed to get points of lobby", error: error.message });
  }
})


export default router;
