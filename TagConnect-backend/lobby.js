import { io } from "./app.js";
import { db } from "./firebase.js";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";

export const createLobby = async (user, isPrivate, location) => {
  let code = "123"; //create function for generating code
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

export const findNearbyUsers = async (userId, radius) => {
  // Implementation for finding nearby users based on user location and radius in the database
};

export const startGame = async (users) => {};
