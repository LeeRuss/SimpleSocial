import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { useContext } from 'react';

const UserDescriptionContainer = styled.div`
  grid-row-start: profile-start;
  grid-row-end: posts-start;
  grid-column-start: desc-start;
  grid-column-end: profile-end;
  display: flex;
  flex-direction: column;
  border-left: solid 1px hsla(210, 10%, 40%, 0.5);
  color: hsl(210, 25%, 25%);
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NicknameSpan = styled.span`
  margin-top: 1vh;
  font-size: 2em;
  font-weight: bold;
`;

const UserDescriptionSpan = styled.span`
  font-size: 1.2em;
  justify-self: center;
  text-align: center;
  width: 100%;
`;

const EditButton = styled.button`
  align-self: flex-end;
  display: flex;
  align-self: ${(props) => (props.$baseline ? 'baseline' : '')};
  justify-content: center;
  align-items: center;
  margin-right: 1%;
  width: 20px;
  font-size: 20px;
  color: hsl(220, 50%, 50%);
  background-color: rgba(255, 255, 255, 0);
`;

const TextArea = styled.textarea`
  width: 98% !important;
  height: 100%;
  font-size: 1.1em;
  text-align: center;
  align-self: center;
  margin-bottom: 1%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 3px solid hsl(220, 50%, 50%);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
  resize: none;
`;

const FormButtonsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const ErrorSpan = styled.span`
  color: #c50404;
  width: 100%;
`;

function getUser(user) {
  return `query GetUser {
    getUsers(id: "${user}") {
        id
        nickname
        description
    }
  }`;
}

function updateDescription(user, description) {
  return `mutation MyMutation {
    updateUsers(input: {id: "${user}", description: "${description}"}) {
      id
      nickname
      description
    }
  }`;
}

export default function UserDescription({ user }) {
  const userContext = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
    reset,
  } = useForm();

  const changeEditing = () => {
    if (isEditing) {
      reset();
      setIsEditing(false);
    } else setIsEditing(true);
  };

  const onSubmit = async (data) => {
    try {
      const operation = await API.graphql(
        graphqlOperation(updateDescription(userData.id, data.description))
      );
      if (operation.data.updateUsers.description === userData.description) {
        throw new Error(
          'Record updated but value stayed the same, server error.'
        );
      }
      setUserData(operation.data.updateUsers);
      clearErrors();
      changeEditing();
    } catch (error) {
      console.log(error);
      setError('server', {
        type: 'serverError',
        message: 'We are not able to update description. Try again later.',
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await API.graphql(graphqlOperation(getUser(user)));
        setUserData(data.data.getUsers);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (isLoading) {
    return <UserDescriptionContainer></UserDescriptionContainer>;
  }

  return (
    <UserDescriptionContainer>
      <NicknameSpan>{userData.nickname}</NicknameSpan>
      <Container>
        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <TextArea
              {...register('description', {
                required: true,
                maxLength: 200,
              })}
              defaultValue={userData.description}
            ></TextArea>
            <FormButtonsContainer>
              <EditButton
                title="Confirm"
                type="submit"
                className="material-symbols-outlined link"
                $baseline
              >
                done
              </EditButton>
              <EditButton
                title="Cancel"
                onClick={changeEditing}
                className="material-symbols-outlined link"
                $baseline
              >
                close
              </EditButton>
              {errors.description?.type === 'maxLength' && (
                <ErrorSpan role="alert">
                  Description only take 200 characters.
                </ErrorSpan>
              )}
              {errors.server?.type === 'serverError' && (
                <ErrorSpan role="alert">{errors.server?.message}</ErrorSpan>
              )}
            </FormButtonsContainer>
          </form>
        ) : (
          <>
            <UserDescriptionSpan>{userData.description}</UserDescriptionSpan>
            {userContext.user.username === user && (
              <EditButton
                title="Change description"
                onClick={changeEditing}
                className="material-symbols-outlined link"
                settings
              >
                settings
              </EditButton>
            )}
          </>
        )}
      </Container>
    </UserDescriptionContainer>
  );
}
