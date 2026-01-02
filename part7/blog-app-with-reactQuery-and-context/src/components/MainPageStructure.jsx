import { useContext } from 'react';
import userContext from '../UserContext';

const MainPageStructure = (props) => {
  const { userDispatch, user, notificationDispatch } = useContext(userContext);

  const hadleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    userDispatch({ type: 'SET_USER', payload: null });
    notificationDispatch({ type: 'RESET' });
  };

  return (
    <div>
      <h2>BlogApp</h2>
      {/*props.blogForm*/}
      <div>
        <p>
          {`${user.name} logged in `}
          <button
            onClick={() => {
              hadleLogOut();
            }}
          >
            logout
          </button>{' '}
        </p>
      </div>
      {props.children}
    </div>
  );
};

export default MainPageStructure;
