import { NextPage } from "next";
import Nav from "../components/nav";
import styled from "styled-components";

const Main: NextPage = () => {
  return(
    <Container>
      <Nav/>
      <Box>

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
