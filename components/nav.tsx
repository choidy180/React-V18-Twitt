import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { authService } from "../firebase/firebase";

const Nav: NextPage = () => {
  const router = useRouter();
  const onLogOutClick = async () => {
    await authService.signOut();
    await router.push("/");
  }
  return (
    <Container>
      <Ul>
        <Li>
          <Link href={"/"}>
            <Tag>HOME</Tag>
          </Link>
        </Li>
        <Li>
          <Link href={"/upload"}>
            <Tag>UPLOAD</Tag>
          </Link>
        </Li>
        <Li>
          <Link href={"/profile"}>
            <Tag>PROFILE</Tag>
          </Link>
        </Li>
        <Li>
          <LogOut
            onClick={onLogOutClick}
          >LOGOUT</LogOut>
        </Li>
      </Ul>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`
const Ul = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  padding: 12px 0;
`
const Li = styled.li`
  font-family: 'NEXON Lv2 Gothic';
  font-size: 1.2rem;
  transition: all .15s ease-in-out;
  cursor: pointer;
  :hover{
    color: ${props => props.theme.color.pink};
  }
`
const Tag = styled.span`
`
const LogOut = styled.span`
  cursor: pointer;
`

export default Nav;
