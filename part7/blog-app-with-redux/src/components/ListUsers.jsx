import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ListUsers = () => {
  const { user } = useSelector((state) => state);

  if (!user) {
    return null;
  }
  return (
    <ul>
      <h2>Users</h2>
      <span>&emsp;&emsp;&emsp;blogs created</span>
      {user.map((user) => {
        return <Users key={user.id} user={user} />;
      })}
    </ul>
  );
};

const Users = ({ user }) => {
  return (
    <li>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
      <span>&emsp;&emsp;&emsp;{user.blogs.length}</span>
    </li>
  );
};

export default ListUsers;
