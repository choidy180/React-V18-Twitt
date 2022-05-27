import { collection, doc, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Interface } from "readline";
import styled from "styled-components";
import Nav from "../../components/nav";
import { dbService } from "../../firebase/firebase";

const Detail: NextPage = props => {
  const [getData, setGetData] = useState<any>();
  const router = useRouter();
  const idx = String(router.query.idx);
  const getContent = async () => {
    const data = doc(dbService, "Content", idx);
    const dataSnap = await getDoc(data);
    setGetData(dataSnap.data());
  }
  useEffect(()=>{
    getContent();
  })
  const getInfo = () => {
    console.log(getData);
  }
  return(
    <Container>
      <Nav/>
      <button onClick={getInfo}>정보 보기</button>
      <Content>
        <ImageBox>
          <img src={getData ? getData.image : ""} alt="" />
        </ImageBox>
        <ContentText>{getData && getData.text}</ContentText>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  max-width: 768px;
  min-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Content = styled.div`
  width: calc(100% - 38px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
`
const ImageBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const ContentText = styled.p`
  font-size: 1.4rem;
  font-family: 'NEXON Lv1 Gothic OTF';
  margin-top: 20px;
`
export default Detail;