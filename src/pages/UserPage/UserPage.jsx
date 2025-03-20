import { useEffect, useState } from "react";
import AddUser from "../../components/AddUser/AddUser";
import authService from "../../services/auth.service";
import UsersList from "../../components/UserList/UserList";

export default function UserPage() {
  const [user, setUser] = useState([]);
  const [userLogin, setUserLogin] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");

  const getInitialUsers = () => {
    authService
      .users()
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getInitialUsers();

    authService
      .userProfile()
      .then(res => setUserLogin(res.data))
      .catch(err => console.log(err));
  }, []);

  const closeModal = () => {
    getInitialUsers();
    document.getElementById('my_modal_4').close();
  };

  return (
    <>
      {userLogin?.role === "admin" &&
        <div className="flex mt-20">
          <div className="mr-4">
            <div> Filter by role </div>
            <select
              className="select select-bordered"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="admin">Admin</option>
              <option value="profesor">Professor</option>
              <option value="estudiante">Student</option>
            </select>
          </div>
          <button className="btn btn-outline btn-primary mt-2 ml-auto mr-4" onClick={() => document.getElementById('my_modal_4').showModal()}>+ User</button>
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">Add new user</h3>
              <AddUser />
              <button className="btn mt-4" onClick={closeModal}>Close</button>
            </div>
          </dialog>
        </div>
      }

      <div className="overflow-x-auto mt-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {user.length > 0 ? (
              user
              .filter(usuario => roleFilter === "all" || usuario.role === roleFilter)
              .map((usuario) => (
                <UsersList key={usuario._id} usuario={usuario} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users to show
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </>
  );
}

