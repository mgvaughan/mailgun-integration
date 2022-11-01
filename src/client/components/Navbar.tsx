import * as React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return <div className="bg-dark">
        <Link className="btn btn-outline-info m-2" to={"/"}>Home</Link>
        <Link className="btn btn-outline-info m-2" to={"/api/create"}>Create a chirp</Link>
        <Link className="btn btn-outline-info m-2" to={"/api/chirps"}>View all Chirps</Link>
        <Link className="btn btn-outline-info m-2" to={"/api/donate"}>Donations</Link>
        <Link className="btn btn-outline-info m-2" to={"/api/contact"}>Contact</Link>
    </div>
}

export default Navbar;