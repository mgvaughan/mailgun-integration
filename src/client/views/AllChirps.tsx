import * as React from 'react';
import { useState, useEffect } from 'react';
import { IChirp } from '../../types';
import { useNavigate } from 'react-router-dom';

const AllChirps = () => {
    const [chirps, setChirps] = useState<IChirp[]>([])
    const nav = useNavigate(); 

    useEffect(() => {
        fetch('/api/chirps')
            .then(res => res.json())
            .then(data => setChirps(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="row justify-content-center">
            {chirps.map(c => (
                <div onClick={() => nav(`/api/chirps/${c.id}`)} key={`chirp-card-${c.id}`} className="col-7 my-1">
                    <div className="card bg-white shadow-lg">
                        <h1>{c.content}</h1>
                        <h6>From: {c.location}</h6>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllChirps;