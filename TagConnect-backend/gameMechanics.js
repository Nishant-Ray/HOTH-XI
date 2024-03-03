import { app, db } from "./firebase.js"
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
  } from "firebase/firestore";

export const getUsers = async (lobbyID) => {
    const docRef = doc(db, "lobbies", lobbyID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data()['players']);
      } else {
        console.log("No such document!");
      }
};

export const updateLocation = async (userLocation) => {
  try {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      location: userLocation,
    });
  } catch (err) {
    res.status(500).json({ message: "Location Not Found" });
  }
};

export const setRole = async (lobbyID) => {
    try {
        players = getUsers(lobbyID);
        // Randomly select a player to be the tagger
        const taggerIndex = Math.floor(Math.random() * players.length);
        const taggerId = players[taggerIndex];
    
        // Assign the tagger role to the selected player
        const roles = {};
        roles[taggerId] = "tagger";
        
    
        // Assign the taggee role to the rest of the players
        players.forEach((playerId, index) => {
          if (index !== taggerIndex) {
            roles[playerId] = "taggee";
          }
        });
    
        // Implementation for setting roles in the database
        // Example using Firebase Realtime Database
        // await firebaseDatabase.ref(`lobbies/${lobbyId}/roles`).set(roles);
    
        return roles;//temp
      } 
    catch (error) {
        throw new Error("Failed to set roles");
    }
};
export const submitAnswer = async (playerId, answer) => {
    try {
      // Implementation for submitting the answer in the database
      // Example using Firebase Realtime Database
      // await firebaseDatabase.ref(`players/${playerId}/answer`).set(answer);
  
      return { playerId, answer };//temp
    } 
    catch (error) {
      throw new Error("Failed to submit answer");
    }
  };

  export const tagPlayer = async (taggerId, tageeId) => {
    try {
      // Implementation for tagging a player in the database
      // Example using Firebase Realtime Database
      // await firebaseDatabase.ref(`players/${tageeId}/taggedBy`).push(taggerId);
  
      return { taggerId, tageeId };//temp
    } catch (error) {
      throw new Error("Failed to tag player");
    }
  };

  export const askQuestion = async (question, playerId) => {
    try {
      // Implementation for asking a question in the database
      // Example using Firebase Realtime Database
      // await firebaseDatabase.ref(`players/${playerId}/question`).set(question);
  
      return { question, playerId };//temp
    } catch (error) {
      throw new Error("Failed to ask question");
    }
  };

  export const findClosestLobby = async (userId) => {
    try {
      // Get the user's location from the database
      const userLocation = await getUserLocation(userId);
  
      // Query the database to get a list of all lobbies
      const allLobbies = await getAllLobbies();
  
      let closestLobby;
      let closestDistance = Infinity;
  
      allLobbies.forEach((lobby) => {
        const distance = calculateDistance(userLocation, lobby.location);
          if (distance < closestDistance) {
          closestLobby = lobby;
          closestDistance = distance;
        }
      });
  
      return closestLobby;
    } 
    catch (error) {
      throw new Error("Failed to find closest lobby");
    }
  };
  
  const getUserLocation = async (userId) => {
    // Implementation for getting user's location from the database

  };
  
  // Example function to get all lobbies from the database
  const getAllLobbies = async () => {
    // Implementation for getting all lobbies from the database
  };
  
  const calculateDistance = (location1, location2) => {
    return  Math.sqrt(Math.pow(location2.latitude - location1.latitude,  2) + Math.pow(location2.longitude - location1.longitude, 2));
  };
