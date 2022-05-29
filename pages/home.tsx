import { NextPage } from "next";
import Nav from "../components/nav";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { dbService } from "../firebase/firebase";
import Link from "next/link";

const Main: NextPage = () => {
  const [userImage, setUserImage] = useState([]);
  const [newContent, setNewContent] = useState([]);
  const usersCollectionRef = collection(dbService, "Profile");
  const getNewContent = async () => {
    const content = await getDocs(collection(dbService, "Content"));
    const responseDataList = await Promise.all(
      content.docs.map(document => {
        const contentObj = {
          ...document.data(),
          id: document.id,
        }
        const getProfileImage = async () => {
          const q = await query(
            usersCollectionRef,
            where("email", "==",contentObj["email"])
          );
          const getProfileData = await getDocs(q);
          const newData = getProfileData.docs.map((doc) => ({ 
            ...doc.data()
          }));
          
          setUserImage((prev) => [newData[0], ...prev]);
        } 
        setNewContent((prev) => [contentObj, ...prev]);
        getProfileImage();
      })
    )
  };
  useEffect(()=>{
    getNewContent();
    onSnapshot(collection(dbService, "Content"), (snapshot) => {
      const ContentArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewContent(ContentArray);
    })
  },[]);
  return(
    <Container>
      <Nav/>
      <Box>
        {newContent.map((content,i) =>(
            <ContentBox key={content.id}>
                <ImageContainer>
                  <ImageBox>
                    <img src={content && Boolean(userImage.filter(item => item.email === content.email)[0]) 
                      ? userImage.filter(item => item.email === content.email)[0]["photoUrl"]
                      : "a48eb5f4230f9a24e273cf605a2c0f24a0f691bd.gif"} alt="" />
                  </ImageBox>
                  <LoaderEmail>{content.email}</LoaderEmail>
                </ImageContainer>
                <Link href={`/detail/${content.id}`}>
                  {newContent[i]["image"] && (
                    <img src={newContent[i]["image"]} alt="" />
                  )}
                </Link>
              <p>{content.text}</p>
            </ContentBox>
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
  align-items: center;
  gap: 2px;
`
const ContentBox = styled.div`
  width: calc(100% - 38px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 10px;
  img{
    width: 100%;
    cursor: pointer;
  }
  p{
    margin-top: 12px;
    font-size: 1.4rem;
    font-family: 'NEXON Lv1 Gothic OTF';
  }
  :not(:last-of-type){
    padding-bottom: 30px;
    border-bottom: 1px solid #e9e9e9;
  }
`
const ImageContainer = styled.div`
  width: calc(100% - 24px);
  padding: 12px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const ImageBox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
`

const LoaderEmail = styled.span`
  font-size: 1.4rem;
  margin-left: 8px;
`

export default Main;
