import admin from "../firebase-config.js";

async function firebaseAuth(req, res, next) {
  //Check whether request contains an auth token
  if (req.headers.authorization) {
    //Remove the "Bearer" prefix on the token
    const token = req.headers.authorization.split(" ")[1];
    try {
      //Verify the user with Firebase
      const decodedToken = await admin.auth().verifyIdToken(token);
      //If authorised:
      if (decodedToken) {
        req.user = decodedToken;
        return next();
      }
      //If unauthorised/token expired
      return res.json({ message: "Unauthorized" });
    } catch (e) {
      //Prints Firebase errors
      return res.json({ message: "Internal Error", error: e });
    }
    //If no authorization header was provided
  } else {
    return res.json({ message: "Request contains no authorization header" });
  }
}

export default firebaseAuth;
