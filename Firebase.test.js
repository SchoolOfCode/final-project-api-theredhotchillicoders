import { app } from "./firebaseApp-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const username = process.env.TEST_USER;
const password = process.env.TEST_PASSWORD;
export async function login(username, password) {
  const authentication = getAuth();
  //Test login with .env username and password
  const res = await signInWithEmailAndPassword(
    authentication,
    username,
    password
  );
  //If successfully logged in the response should include the username
  if (res.user) {
    return res.user;
  } else {
    return "Login failed";
  }
}

describe("Check Firebase login works correctly", () => {
  it("successfully logs in", async () => {
    const req = await login(username, password);
    // console.log(req.accessToken);
    // console.log(req.uid);
    const actual = req.email;
    const expected = process.env.TEST_USER;
    expect(actual).toEqual(expected);
  });
});
