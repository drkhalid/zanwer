import Firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBmvQ6f1FyPbHcWtiIbc-WqPpCuXM1FErQ",
    authDomain: "my-test-fd219.firebaseapp.com",
    databaseURL: "https://my-test-fd219.firebaseio.com",
    projectId: "my-test-fd219",
    storageBucket: "",
    messagingSenderId: "938347507599"
  };
export const FireApp = Firebase.initializeApp(config)
