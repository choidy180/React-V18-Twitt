import { NextPage } from "next";
import Nav from "../components/nav";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
const Upload: NextPage = () => {
  const [attachment, setAttachment] = useState();
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
  return(
    <Container>
      <Nav/>
      <Box>
        <Form>
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
              type="text"
              placeholder="무슨 생각을 하고 계신가요??"
              maxLength={500}
            />
          </Content>
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
`
const Form = styled.form`
  width: calc(100% - 24px);
  display: flex;
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
  width: calc(70% - 24px);
  min-width: 376px;
  font-size: 1.3rem;
  min-height: 150px;
  border: 1px solid ${props => props.theme.color.lightGreen};
  resize: none;
  border-radius: 8px;
  margin-top: 20px;
`

export default Upload;
