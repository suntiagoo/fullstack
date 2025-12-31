import { useDispatch } from "react-redux";

const MainPageStructure = (props) => {
  const dispatch = useDispatch();

  const hadleLogOut = () => {
    console.log(window.localStorage.removeItem("loggedBlogappUser"));
    dispatch({
      type: "users/setUser",
      payload: null,
    });
  };

  return (
    <div>
      <h2>BlogApp</h2>
      {/*props.blogForm*/}
      <div>
        <p>
          {`${props.user.name} logged in `}
          <button
            onClick={() => {
              hadleLogOut();
            }}
          >
            logout
          </button>{" "}
        </p>
      </div>
      {props.children}
    </div>
  );
};

export default MainPageStructure;
