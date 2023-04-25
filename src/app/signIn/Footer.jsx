import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px 0px 16px 16px;
`;

export default function Footer() {
  return (
    <Wrapper>
      <p>Made by Dariusz Russek</p>
    </Wrapper>
  );
}
