import * as React from 'react';
import { useState, useEffect } from 'react';
import { IChirp } from '../../types';
import { useParams, Link } from 'react-router-dom';

const SingleChirp = () => {
    const [chirp, setChirp] = useState<IChirp>()
    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/chirps/${id}`)
            .then(res => res.json())
            .then(data => setChirp(data))
            .catch(error => console.error(error));
    }, [id]);

    return (
        <div className="row justify-content-center">
            <div className="col-7 my-1">
                <div className="card bg-white shadow-lg">
                    <h1>{chirp?.content}</h1>
                    <h6>From: {chirp?.location}</h6>
                    <Link className="btn btn-outline-warning" to={`/api/chirps/${id}/edit`}>Edit me</Link>
                </div>
            </div>
        </div>
    )
}

export default SingleChirp;