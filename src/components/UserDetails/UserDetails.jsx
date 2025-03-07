import { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { useParams } from 'react-router-dom';

export default function UserDetails() {
    const { userId } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        authService
            .userDetails(userId)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, [userId]);

    return (
        <div className="hero bg-base-200 min-h-[91vh]">
            <div className="hero-content flex-col lg:flex-row gap-44">
                <img
                    src="https://img.freepik.com/free-photo/man-with-photo-camera-his-holidays_23-2149373965.jpg?semt=ais_hybrid"
                    alt=""
                    className="max-w-sm rounded-lg shadow-2xl" />

                <div className="text-left">
                    <h1 className="text-5xl mb-4">Details</h1>

                    <h2 className="text-2xl font-bold mb-2">Name</h2>
                    <p className="mb-4">{user.name}</p>

                    <h2 className="text-2xl font-bold mb-2">Email</h2>
                    <p className="mb-4">{user.email}</p>

                    <h2 className="text-2xl font-bold mb-2">Role</h2>
                    <p className="mb-6">{user.role}</p>

                    {/*  <button className="btn btn-primary w-32">Edit</button> */}
                    <div className="flex">
                        <button className="btn btn-primary">Update</button>
                        {/* <button className="btn btn-secondary">Secondary</button> */}
                        <button className="btn btn-accent">Delete</button>
                    </div>

                </div>
            </div>
        </div>
    )
}