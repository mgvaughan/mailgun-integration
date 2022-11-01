import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IChirp } from '../../types';

const EditChirp = () => {
    const [content, setContent] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/chirps/${id}`)
            .then(res => res.json())
            .then(data => {
                setContent(data.content);
                setLocation(data.location);
            })
            .catch(error => console.error(error))
    }, [id]);

    const nav = useNavigate();

    const handleUpdateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!location || !content) return alert('Fill everything out.');

        fetch(`/api/chirps/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ location, content })
        })
            .then(res => res.json())
            .then(data => {
                nav(`/api/chirps/${id}/`);
            })
            .catch(error => console.error(error));
    };

    const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!location || !content) return alert('Fill everything out.');

        fetch(`/api/chirps/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(data => {
                nav("/api/chirps");
            })
            .catch(error => console.error(error));
    };


    return (
        <div className="row justify-content-center h-100 align-items-center">
            <div className="col-12 col-md-7">
                <form action="" className="p-3 bg-white shadow-lg">
                    <h1 className="text-center">Editing chirp #{id}</h1>
                    <label>What's on your mind today?</label>
                    <textarea className="form-control" value={content} onChange={e => setContent(e.target.value)} cols={30} rows={5} />
                    <label>Where are you chirping from?</label>
                    <input className="form-control" value={location} onChange={e => setLocation(e.target.value)} type="text" />

                    <button onClick={handleUpdateButton} className="btn btn-warning m-2">Update!</button>

                    <button onClick={handleDeleteButton} className="btn btn-danger m-2">DELETE</button>
                </form>
            </div>
        </div>
    );
};

export default EditChirp;