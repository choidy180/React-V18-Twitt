import { doc, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "../../components/nav";
import { dbService } from "../../firebase/firebase";
import { ChatbubbleOutline, HeartOutline, ShareSocialOutline } from "react-ionicons";

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
  return(
    <Container>
      <Nav/>
      <Box>
        <Content>
          <ImageBox>
            <img src={getData ? getData.image : ""} alt="" />
          </ImageBox>
        </Content>
        <DetailBox>
          <MakerBox>
            <ProfileImageBox>
              <img src="/images/a48eb5f4230f9a24e273cf605a2c0f24a0f691bd.gif" alt="" />
            </ProfileImageBox>
            <span>{getData && getData["email"]}</span>
          </MakerBox>
          <ContentText>{getData && getData.text}</ContentText>

          <Reply>
            <IconBox>
              <HeartOutline
                color={'#00000'}
                height="26px"
                width="26px"
                onClick={() => alert('Hi!')}
              />
              <ChatbubbleOutline
                color={'#00000'}
                height="26px"
                width="26px"
                onClick={() => alert('Hi!')}
              />
              <ShareSocialOutline
                color={'#00000'}
                height="26px"
                width="26px"
                onClick={() => alert('Hi!')}
              />
              <span>3시간 전</span>
            </IconBox>
            <LikeBox>
              <LikeProfileImage>
                 <img src="/images/0187D059-0E0E-46DB-A2E5-C93881BD8D5F_1_105_c.jpeg" alt="" />
              </LikeProfileImage>
              <LikeCount><b>hi_jjiny</b>님 외 <b>여러 명</b>이 좋아합니다.</LikeCount>
            </LikeBox>
            <PushBox>
              <input type="text" placeholder="댓글 달기..."/>
              <button>게시</button>
            </PushBox>
          </Reply>
        </DetailBox>
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
  align-items: center;
`
const Box = styled.div`
  width: 100%;
  display: flex;
`
const Content = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
  margin-top: 20px;
`
const ImageBox = styled.div`
  width: 400px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    height: 500px;
    min-width: 100%;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const ContentText = styled.p`
  width: calc(100% - 24px);
  padding: 0 12px;
  font-size: 1.4rem;
  font-family: 'NEXON Lv1 Gothic OTF';
  margin-top: 12px;
`
const DetailBox = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: calc(100% - 400px);
  padding: 8px 0;
  border: 1px solid #EFEFEF;
  border-left: 0;
  margin-top: 20px;
`
const MakerBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 24px);
  padding: 0 12px;
  font-size: 1.2rem;
  font-family: 'NEXON Lv1 Gothic OTF';
`
const ProfileImageBox = styled.div`
  width: 37px;
  height: 37px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  overflow: hidden;
  img{
    width: 100%;
    height: auto;
  }
`

const Reply = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: calc(100% - 24px);
  height: 100px;
  padding: 8px 12px;
  border-top: 1px solid #EFEFEF;
  svg{
    margin-right: 8px;
  }
`
const IconBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  font-size: 1rem;
  line-height: 1rem;
  span{
    display: flex;
    align-items: center;
    height: auto;
  }
`
const LikeBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 8px;
`
const LikeProfileImage = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;
  img{
    width: 100%;
    height: auto;
  }
`
const LikeCount = styled.p`
  font-size: 1rem;
  font-family: 'NEXON Lv1 Gothic OTF';
  b{
    font-family: 'NEXON Lv1 Gothic OTF Bold';
  }
`
const PushBox = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #EFEFEF;
  input{
    width: 100%;
    font-size: 1.4rem;
    border: none;
    outline: none;
    margin: 0;
  }
  button{
    position: absolute;
    right: 0;
    font-size: 1.2rem;
    color: #176BEF;
  }
`
export default Detail;