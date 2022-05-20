import { NextPage } from "next";
import Nav from "../components/nav";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { dbService } from "../firebase/firebase";

const Main: NextPage = () => {
  const [content, setContent] = useState("");
  const [newContent, setNewContent] = useState([]);
  const getNewContent = async () => {
    const content = await getDocs(collection(dbService, "Content"));
    content.forEach((document) => {
      const contentObj = {
        ...document.data(),
        id: document.id,
      };
      setNewContent((prev) => [contentObj, ...prev]);
    });
  }
  const clickTest = () => {
    console.log(newContent);
  }
  useEffect(()=>{
    getNewContent();
    onSnapshot(collection(dbService, "Content"), (snapshot) => {
      const ContentArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewContent(ContentArray);
    })
  },[])
  return(
    <Container>
      <Nav/>
      <button onClick={clickTest}>테스트</button>
      <Box>
        {newContent.map((content,i) =>(
          <div key={content.id}>
            <p>{content.text}</p>
          </div>
        ))}
      </Box>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  max-width: 768px;
  min-width: 480px;
  display: flex;
  flex-direction: column;
`
const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export default Main;
