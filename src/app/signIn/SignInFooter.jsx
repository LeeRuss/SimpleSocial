import { useAuthenticator, Link } from '@aws-amplify/ui-react';
import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px 0px 24px 0px;
`;

export default function SignInFooter() {
  const { toResetPassword } = useAuthenticator();
  return (
    <Wrapper>
      <Link onClick={toResetPassword}>Reset your password</Link>
    </Wrapper>
  );
}
