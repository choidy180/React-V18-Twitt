import type { NextPage } from "next";
import { app } from "../firebase/firebase";

const Home: NextPage = (isLoggedIn) => {
  console.log(isLoggedIn);
  return (
    <div>Next-basics</div>
  )
}

export default Home;
