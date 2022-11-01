import * as React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [content, setContent] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    const nav = useNavigate();

    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!location || !content) return alert('Fill everything out.');

        fetch('/api/chirps', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ location, content })
        })
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                nav(`/api/chirps/${data.id}`);
            }
        })
        .catch(error => console.error(error));
    };


    return (
        <div className="row justify-content-center h-100 align-items-center">
            <div className="col-12 col-md-7">
                <form action="" className="p-3 bg-white shadow-lg">
                    <label>What's on your mind today?</label>
                    <textarea className="form-control" value={content} onChange={e => setContent(e.target.value)} cols={30} rows={5} />
                    <label>Where are you chirping from?</label>
                    <input className="form-control" value={location} onChange={e => setLocation(e.target.value)} type="text" />

                    <button onClick={handleSubmitButton} className="btn btn-success m-2">Submit!</button>
                </form>
            </div>
        </div>
    );
};

export default Create;