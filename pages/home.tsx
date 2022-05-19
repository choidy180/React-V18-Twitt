import { NextPage } from "next";
import Nav from "../components/nav";
import styled from "styled-components";

const Main: NextPage = () => {
  return(
    <Container>
      <Nav/>
      <Box>
        <Form>
          <Content>
            <ImageBox>

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
  border: 1px solid ${props => props.theme.color.lightGreen};
  padding: 8px;
`
const Content = styled.div`
  width: 100%;
  display: flex;
`
const ImageBox = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Input = styled.textarea`
  width: 70%;
  font-size: 1.2rem;
  min-height: 150px;
  resize: none;
  border: none;
`

export default Main;
