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
                                src={usuario.imageUrl}
                                alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{usuario.name}</div>
                        <div className="text-sm opacity-50">Spain</div>
                    </div>
                </div>
            </td>
            <td> {usuario.email} </td>
            <td>{usuario.role}</td>
            <th>
                <Link to={`${FrontApiURL}/users/userdetail/${usuario._id}`} style={{ textDecoration: 'none' }}>
                    <button className="btn btn-ghost btn-xs text-green-600">details</button>
                </Link>
            </th>
        </tr>
    )
}