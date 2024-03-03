import { io } from "./app.js";
import { db, auth } from "./firebase.js";
import { DocumentSnapshot, arrayUnion, doc, setDoc, updateDoc, docSnap } from "firebase/firestore";
import { updateLocation, calculateDistanceInMeters, getAllLobbies } from "./gameMechanics.js";
import { updateCurrentUser } from "firebase/auth";

const user = auth.currentUser.uid;

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
    let lobbies = getAllLobbies();
    lobbies = snapshot.docs.map(doc => {
        const lobbyData = doc.data();
        const distance = calculateDistance(location, lobbyData.location);
        return {
        id: doc.id,
        location: lobbyLocation,
        distance: distance
        };
    });
    const filteredLobbies = lobbies.filter(
        (lobby) => lobby.distance <= radius
      );
    return filteredLobbies;
}

export const startGame = async (users) => {

};
