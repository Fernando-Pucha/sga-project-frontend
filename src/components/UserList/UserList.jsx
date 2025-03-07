import { Link } from "react-router-dom";
const FrontApiURL = `${process.env.REACT_APP_FRONT_URL}`;

export default function UsersList({ usuario }) {

    return (
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
                        <div className="font-bold">{usuario.name}</div>
                        <div className="text-sm opacity-50">United States</div>
                    </div>
                </div>
            </td>
            <td>
                {usuario.email}
                <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>{usuario.role}</td>
            <th>
                <Link to={`${FrontApiURL}/users/userdetail/${usuario._id}`} style={{ textDecoration: 'none' }}>
                    <button className="btn btn-ghost btn-xs">details</button>
                </Link>
            </th>
        </tr>
    )
}