import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 24px 0px 0px 0px;
  color: #242424;
`;
export default function SignInHeader() {
  return (
    <h2>
      <Wrapper>Sign in to your account</Wrapper>
    </h2>
  );
}
