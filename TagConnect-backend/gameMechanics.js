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
import { master_prompts } from "./questions.js";


export const getUsers = async (lobbyId) => {
    const docRef = doc(db, "lobbies", lobbyId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data()['players']);
        return docSnap.data()['players'];
      } else {
        console.log("No such document!");
      }
};

export const getPoints = async (lobbyId) => {
  const docRef = doc(db, "lobbies", lobbyId);
  const docSnap = await getDoc(docRef); 
  if (docSnap.exists()) {
     return docSnap.data()["points"];
  } else {
    console.log(`No lobby with name ${lobbyId}`);
  }
}

export const updateLocation = async (userLocation) => {
  try {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      location: userLocation,
    });
  } catch (err) {
    res.status(500).json({ message: "Location Not Found" });
  }
};

export const getQuestions = async(lobbyID) =>{
    try {
        let index1 = Math.floor(Math.random() * master_prompts.length);
        let index2 = Math.floor(Math.random() * master_prompts.length);
        while (index2 === index1) {
            index2 = Math.floor(Math.random() * master_prompts.length);
        }
        return index1, index2;
    }
    catch (err){
        throw new Error("Failed to get questions");
    }
};
export const submitAnswer = async (playerId, answer) => {
    try {
      docRef = doc(db, "users", playerId);
      await updateDoc(docRef, {
        answer : answer
      })
    } 
    catch (error) {
      throw new Error("Failed to submit answer");
    }
  };

  export const tagPlayer = async (taggerId, taggeeId, lobbyId) => {
    try {
      docRef = doc(db, "users", taggeeId);
      const docSnap = await getDoc(doc(db, "lobbies", lobbyId));
      const allPoints = docSnap.data()['points'];
      const taggerPoints = allPoints.taggerId;
      await updateDoc(docRef, {
        tagged : true
      })
      await updateDoc(docRef, {
        points : {[taggeeId] : 0, [taggerId] : taggerPoints + 200}
      })
      return true;
    } catch (error) {
      throw new Error("Failed to tag player");
    }
  };

  export const getUserLocation = async (userId) => {
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
  export const getAllLobbies = async () => {
    const lobbies = collection(db, 'lobbies');
    let nearby = new Map();
    try {
      const querySnapshot = await getDocs(lobbies);
      querySnapshot.forEach((doc) => {
        nearby.set(doc.id, doc.data().location);
      });

      return nearby;
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  };

  export const partnerFinder = async (lobbyID) => {
    users = getUsers(lobbyID);
    alr_met = [];
    let partner =
      Math.floor(Math.random() * users.length) && !alr_met.includes(partner);
    alr_met.push(partner);
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

export {calculateDistanceInMeters}
