import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ListUsers = () => {
  const { user } = useSelector((state) => state);
  const userSort = user.toSorted((a, b) => b.blogs.length - a.blogs.length);

  if (!user) {
    return null;
  }
  return (
    <ul>
      <h2>Users</h2>
      <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;blogs created</span>
      {userSort.map((user) => {
        return <Users key={user.id} user={user} />;
      })}
    </ul>
  );
};

const Users = ({ user }) => {
  return (
    <li style={{ display: 'flex', maxWidth: '200px', justifyContent: 'space-between' }}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
      <span>{user.blogs.length}</span>
    </li>
  );
};

export default ListUsers;
