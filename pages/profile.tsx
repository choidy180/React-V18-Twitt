import { updateProfile } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "../components/nav";
import { authService } from "../firebase/firebase";

const Profile: NextPage = ({props}:any) => {
  const [attachment,setAttachment] = useState<String>("");    // 변경할 이미지
  const [displayName, setDisplayName] = useState<any>(""); // 변경할 이름
  const [phoneNumber, setPhoneNumber] = useState<String>(""); // 변경할 번호
  const [getImageUrl, setGetImageUrl] = useState(""); // 이미지
  const [getEmail, setGetEmail] = useState<String>("");       // 이메일
  const [getName, setGetName] = useState<String>("");         // 이름
  const [getNumber, setGetNumber] = useState<String>("");     // 휴대폰 번호
  const [userInfo, setUserInfo] = useState<any>(); // 유저 정보
  const router = useRouter();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if(name === "displayName"){
      setDisplayName(value);
    }
    if(name === "phoneNumber"){
      setPhoneNumber(value);
    }
  }
  const onSubmit = (event) => {
    event.preventDefault();
    updateProfile(userInfo,{
      displayName: displayName,
    });
    router.replace("/home");
  }
  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      setUserInfo(user);
      setGetImageUrl(user.photoURL);
      setGetEmail(user.email)
      setGetName(user.displayName);
      setGetNumber(user.phoneNumber);
    });
  },[]);
  return(
    <Container>
      <Nav/>
      <Box>
        <Form>
          <ImageBox htmlfor="inputImage">
            <img 
              src={
                getImageUrl ? getImageUrl : "images/undraw_female_avatar_w3jk.svg"
              } 
              alt="" />
          </ImageBox>
          <InfoBox>
            <Info>
              <InfoText>
                <InfoTitle>이메일</InfoTitle>
                <InfoValue
                  type="text"
                  name="email"
                  placeholder={getEmail ? getEmail +" [변경불가]" : "이메일이 존재하지 않습니다."}
                  disabled
                  readonly
                />
              </InfoText>
              <InfoText>
                <InfoTitle>이름</InfoTitle>
                <InfoValue
                  type="text"
                  name="displayName"
                  placeholder={getName ? getName : "이름이 존재하지 않습니다."}
                  value={displayName}
                  onChange={onChange}
                />
              </InfoText>
              <InfoText>
                <InfoTitle>연락처</InfoTitle>
                <InfoValue
                  type="text"
                  name="phoneNumber"
                  placeholder={getNumber ? getNumber : "연락처가 존재하지 않습니다."}
                  value={phoneNumber}
                  onChange={onChange}
                />
              </InfoText>
              <ProfileUpdateBtn
                onClick={onSubmit}
              >프로필 업데이트
              </ProfileUpdateBtn>
            </Info>
          </InfoBox>
        </Form>
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
  justify-content: center;
`
const Form = styled.div`
  width: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 8px;
`
const ImageBox = styled.label`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 20px;
  img {
    width: 100%;
  }
`
const ImgButton = styled.input`
  display: none;
`
const InfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Info = styled.div`
  width: calc(100% - 40px);
  max-width: 500px;
  padding: 20px;
  border: 1px solid ${props => props.theme.color.blue};
  margin-top: 20px;
`
const InfoText = styled.div`
  width: 100%;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  padding: 8px 0;
`
const InfoTitle = styled.div`
  width: 160px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const InfoValue = styled.input`
  width: calc(100% - 160px);
  font-size: 1.4rem;
  border: none;
  outline: none;
`
const ProfileUpdateBtn = styled.button`
  width: 100%;
  padding: 12px 0;
  font-size: 1.2rem;
  background-color: ${props => props.theme.color.blue};
  margin-top: 20px;
  color: white;
  border-radius: 8px;
`
export default Profile;