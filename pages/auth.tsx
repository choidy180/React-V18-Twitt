import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";

const Auth: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const onSubmit = (event) => {
    event.preventDefault();
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
          value="Login"
        />
      </Form>
      <BtnDiv>
        <SNSBtn>Continew with Google</SNSBtn>
        <SNSBtn>Continew with Github</SNSBtn>
      </BtnDiv>
    </Container>
  )
}

const Container = styled.div`
`
const Form = styled.form`
  padding-top: 20px;
  display: flex;
  gap: 4px;
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
`
const SNSBtn = styled.button`
  padding: 8px 12px;
  font-size: 1.5rem;
  font-family: 'NEXON Lv1 Gothic OTF';
  background-color: ${props => props.theme.color.lightGreen};
  border: 1px solid ${props => props.theme.color.green};
`

export default Auth;
