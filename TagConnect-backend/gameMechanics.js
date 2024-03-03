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


