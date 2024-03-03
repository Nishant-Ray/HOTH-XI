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
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data()['location']);
      } else {
        console.log("No such document!");
      }
  };
  
  // Example function to get all lobbies from the database
  const getAllLobbies = async () => {
    // Implementation for getting all lobbies from the database
  };

function calculateDistanceInMeters(location1, location2) {
    const earthRadius = 6371000; // Radius of the Earth in meters
    
    // Convert latitude and longitude from degrees to radians
    const lat1Rad = toRadians(location1.latitude);
    const lon1Rad = toRadians(location1.longitude);
    const lat2Rad = toRadians(location2.latitude);
    const lon2Rad = toRadians(location2.longitude);
    
    // Calculate the differences between the latitudes and longitudes
    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;
    
    // Calculate the distance using the Haversine formula
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    
    return distance;
}

// Function to convert degrees to radians
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
