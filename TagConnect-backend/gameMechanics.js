export const setRole = async (playerID) => {
    try {
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


