import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import TableColumnTitle from "./TableColumnTitle";
import TableRow from "./TableRow";
import { fetchAllUsers, deleteUser } from "../../features/users/usersSlice";
import Loading from '../../components/Loading.js'
import Alert from '../../components/Alerts';

function Users() {
  const dispatch = useDispatch();
  const { data: users, loading, errors } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
  }

  if (errors?.length > 0) {
    return (
      <Alert message={errors} error={true} />
    )
  }

  if (users.length === 0) {
    return <Alert message="No user data" error={true} />
  }

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        {loading && <Loading />}
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <TableColumnTitle text="Name" />
              <TableColumnTitle text="SurName" />
              <TableColumnTitle text="Email" />
              <TableColumnTitle text="Actions" />
            </tr>
          </thead>
          <tbody>
            {
              users && users.map(user => <TableRow key={user.id} {...user} actions={{ handleDelete }} />)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users;