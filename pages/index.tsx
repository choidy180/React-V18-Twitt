import { 
  createUserWithEmailAndPassword, 
  GithubAuthProvider, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { authService, dbService } from "../firebase/firebase";

const Home: NextPage = (isLoggedIn) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target : {name, value},
    } = event;
    if(name === "email"){
      setEmail(value);
    } else if(name === "password"){
      setPassword(value);
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if(newAccount){
        // 회원가입
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        )
      } else {
        // 로그인
        data = await signInWithEmailAndPassword(
          authService,
          email,
          password
        )
      }
      await router.push("/home");
    } catch (error) {
      setError(error.message);
    }
  }
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: {name},
    } = event;
    let provider;
    let result;
    const dataBase = collection(dbService, "Profile");
    if(name === "google"){
      provider = new GoogleAuthProvider();
      result = await signInWithPopup(authService, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
    }
    if(name === "github"){
      provider = new GithubAuthProvider();
      result = await signInWithPopup(authService, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
    }
    let getUserEmail = String(result["user"]["reloadUserInfo"]["email"]);
    const usersCollectionRef = collection(dbService, "Profile");
    const q = await query(
      usersCollectionRef,
      where("email", "==",getUserEmail)
    );
    const getProfileData = await getDocs(q);
    const newData = getProfileData.docs.map(doc => ({ ...doc.data() }));
    if(newData[0] === undefined){
      await addDoc(dataBase, {
        email : result["user"]["email"],
        displayName: result["user"]["displayName"],
        photoUrl: result["user"]["photoURL"],
        createAt: Date.now(),
        updateAt: Date.now(),
      })
    } else {
      console.log("유저 정보 존재함");
    }
    // router.push("/home");
  }
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}

        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <Input
          type="submit"
          value={newAccount ? "회원가입" : "로그인"}
        />
      </Form>
      {error}
      <BtnDiv>
        <SNSBtn name="google" onClick={onSocialClick}>Continew with Google</SNSBtn>
        <SNSBtn name="github" onClick={onSocialClick}>Continew with Github</SNSBtn>
        <SNSBtn
          onClick={toggleAccount}
        >Type Change</SNSBtn>
      </BtnDiv>
    </Container>
  )
}

const Container = styled.div`
`
const Form = styled.form`
  padding-top: 20px;
  display: flex;
  gap: 10px;
`
const Input = styled.input`
  width: auto;
  font-family: 'NEXON Lv1 Gothic OTF';
  border: 1px solid ${props => props.theme.color.dark};
  padding: 12px;
  font-size: 1.5rem;
  :focus {
    border: 1px solid ${props => props.theme.color.green};
  }
`
const BtnDiv = styled.div`
  display: flex;
  gap: 6px;
`
const SNSBtn = styled.button`
  padding: 8px 12px;
  font-size: 1.5rem;
  font-family: 'NEXON Lv1 Gothic OTF';
  background-color: ${props => props.theme.color.lightGreen};
  border: 1px solid ${props => props.theme.color.green};
`

export default Home;
