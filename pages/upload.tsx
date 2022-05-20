import { NextPage } from "next";
import Nav from "../components/nav";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "../firebase/firebase";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const _Swal = withReactContent(Swal)

const Upload: NextPage = (props) => {
  const [attachment, setAttachment] = useState();
  const [text, setText] = useState("");
  const router = useRouter();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if(name === "content"){
      setText(value);
    }
  }
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const reader = new FileReader();
    // 완료되면 finishedEvent 받음
    reader.onloadend = (finishedEvent) => {
      setAttachment(finishedEvent.currentTarget["result"]);
    }
    reader.readAsDataURL(files[0]);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    const dataBase = collection(dbService, "Content");
    let uploadImage = "";
    if(attachment != ""){
      // 파일 참조 경로 만들기
      const ImageRef = ref(storageService, `${props["email"]}/${uuidv4()}}`);
      // storage 참조 경로로 파일 업로드 하기
      const imageUpload = await uploadString(ImageRef, attachment, "data_url");
      uploadImage = await getDownloadURL(imageUpload.ref);
    }
    await addDoc(dataBase, {
      email: props["email"],
      text: text,
      createAt: Date.now(),
      image: uploadImage,
    })
    await _Swal.fire({
      icon: 'success',
      title: '게시글 등록이 완료되었습니다',
      showConfirmButton: false,
      timer: 1500
    })
    router.push("/home");
  }
  return(
    <Container>
      <Nav/>
      <Box>
        <Form onSubmit={onSubmit}>
          <Content>
            <ImageBox htmlfor="inputImage">
              <Image
                src={
                  attachment ? attachment : "/images/undraw_images_re_0kll.svg"
                }
                layout="fill"
                objectFit={attachment ? "cover" : "contain"}
              />
              <ImgButton
                id="inputImage"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
            </ImageBox>
            <Input
              name="content"
              type="text"
              placeholder="무슨 생각을 하고 계신가요??"
              maxLength={500}
              value={text}
              onChange={onChange}
            />
          </Content>
          <Button type="submit">작성하기</Button>
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
const Form = styled.form`
  width: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 8px;
`
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
`
const ImageBox = styled.label`
  position: relative;
  width: 400px;
  height: 450px;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 20px;
`
const ImgButton = styled.input`
  display: none;
`
const Input = styled.textarea`
  padding: 12px;
  width: calc(100% - 24px);
  min-width: 376px;
  font-size: 1.6rem;
  min-height: 150px;
  border: 1px solid ${props => props.theme.color.blue};
  resize: none;
  border-radius: 8px;
  margin-top: 20px;
  letter-spacing: -0.4px;
  ::placeholder{
    letter-spacing: -0.4px;
  }
  font-family: 'NEXON Lv1 Gothic OTF';
`
const Button = styled.button`
  padding: 12px;
  width: calc(100%);
  min-width: 376px;
  font-size: 1.4rem;
  background-color: ${props => props.theme.color.blue};
  color: white;
  border-radius: 8px;
  margin-top: 12px;
`

export default Upload;
