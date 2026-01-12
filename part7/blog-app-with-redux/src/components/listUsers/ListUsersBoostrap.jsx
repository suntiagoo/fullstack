import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const ListUsersBoostrap = () => {
  const { user } = useSelector((state) => state);

  const userSort = user !== null ? user.toSorted((a, b) => b.blogs.length - a.blogs.length) : null;

  if (!userSort) {
    return null;
  }
  return (
    <Table striped>
      <tbody>
        {userSort.map((user) => {
          return (
            <tr key={user.id}>
              <Users user={user} />
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const Users = ({ user }) => {
  return (
    <>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </>
  );
};

export default ListUsersBoostrap;
