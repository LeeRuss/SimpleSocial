import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px 0px 16px 16px;
`;

export default function Header() {
  return (
    <Wrapper>
      <h1>Social Platform</h1>
    </Wrapper>
  );
}
