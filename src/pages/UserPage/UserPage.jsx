import { useEffect, useState } from "react";
import AddUser from "../../components/AddUser/AddUser";
import authService from "../../services/auth.service";
import UsersList from "../../components/UserList/UserList";

export default function UserPage() {
  const [user, setUser] = useState([]);
  const [userLogin, setUserLogin] = useState([]);

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
            {/* row 1 */}
            <tr className="hover:bg-base-300">
              <th>
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                </label>
              </th>
              <td >
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
              </td>
              <td>Purple</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            {/* row 2 */}
            <tr className="hover:bg-base-300">
              <th>
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Brice Swyre</div>
                    <div className="text-sm opacity-50">China</div>
                  </div>
                </div>
              </td>
              <td>
                Carroll Group
                <br />
                <span className="badge badge-ghost badge-sm">Tax Accountant</span>
              </td>
              <td>Red</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            {/* row 3 */}
            <tr className="hover:bg-base-300">
              <th>
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Marjy Ferencz</div>
                    <div className="text-sm opacity-50">Russia</div>
                  </div>
                </div>
              </td>
              <td>
                Rowe-Schoen
                <br />
                <span className="badge badge-ghost badge-sm">Office Assistant I</span>
              </td>
              <td>Crimson</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            {/* row 4 */}
            <tr className="hover:bg-base-300">
              <th>
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Yancy Tear</div>
                    <div className="text-sm opacity-50">Brazil</div>
                  </div>
                </div>
              </td>
              <td>
                Wyman-Ledner
                <br />
                <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
              </td>
              <td>Indigo</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
          <tbody>
            {user.length > 0 ? (
              user.map((usuario) => (
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

