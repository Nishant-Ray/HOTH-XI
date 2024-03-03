import { io } from "./app.js"
import {db} from "./firebase.js"
import { setDoc } from "firebase/firestore";

export const createLobby = async (user, isPrivate, location) => {
    console.log(
        location
    );
    let code = "123" //create function for generating code
    await setDoc(doc(db, "lobbies", code)),
      {
        location: location,
        players: [user],
        private: isPrivate,
      };
    const newLobby = io.of(`/${code}`);
    newLobby.on('connection', (socket) => {
        console.log(`User connected to ${socket}`);
    });
    return newLobby; 
};
  
export const joinLobby = async (code) => {
    // Implementation for joining a private lobby in the database
};
  
export const findNearbyUsers = async (userId, radius) => {
    // Implementation for finding nearby users based on user location and radius in the database
};

export const startGame = async (users) => {
    
}