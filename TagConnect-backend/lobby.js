import { db, auth } from "./firebase.js";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { updateLocation, calculateDistanceInMeters, getAllLobbies } from "./gameMechanics.js";
import { updateCurrentUser } from "firebase/auth";

export const createLobby = async (user, isPrivate, location) => {
  let code = Math.floor(100000 + Math.random() * 900000);
  await setDoc(doc(db, "lobbies", code), {
    location: [location["latitude"], location["longitude"]],
    players: [user],
    private: isPrivate,
  });
};

export const joinLobby = async (user) => {
  // Implementation for joining a private lobby in the database
  await updateDoc(doc(db, "lobbies", code), {
     players : arrayUnion(user)
  });

};

export const findNearbyLobbies = async (location, radius) => {
     try {
       const lobbiesMap = await getAllLobbies();
       const filteredLobbies = [];
       lobbiesMap.forEach((lobbyLocation, id) => {
         const coordinatesMap = {longitude : lobbyLocation[1], latitude: lobbyLocation[0]};
         if (calculateDistanceInMeters(location,coordinatesMap) <= radius) {
           filteredLobbies.push(id);
         }
       });
       console.log(filteredLobbies);
       return filteredLobbies;
     } catch (error) {
       console.error("Error finding nearby lobbies: ", error);
       throw error; // Rethrow the error to handle it in the calling code
     }
}

export const startGame = async (users) => {

};
