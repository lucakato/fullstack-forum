"use client";

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation';
import { Toaster, toast } from "react-hot-toast";

const sendPost = async (title: string | undefined, description: string | undefined) => {
    const res = await fetch('http://localhost:3000/api/forum', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
    });

    return res.json();
};

const MakePost = () => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        toast.loading("Loading...", {id: "1"});

        await sendPost(titleRef.current?.value, descriptionRef.current?.value);
        toast.loading("Success!", {id: "1"});
        
        router.push("/");
        router.refresh();
    };

    return (
        <>
            <Toaster />
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                <p className="text-2xl text-slate-200 font-bold p-3">leave a new thought 🚀</p>
                <form onSubmit={handleSubmit}>
                    <input
                    ref={titleRef}
                    placeholder="enter title"
                    type="text"
                    className="rounded-md px-4 w-full py-2 my-2"
                    />
                    <textarea
                    ref={descriptionRef}
                    placeholder="enter details of your thoughts"
                    className="rounded-md px-4 py-2 w-full my-2"
                    ></textarea>
                    <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                    submit
                    </button>
                </form>
                </div>
            </div>
        </>
    );
};

export default MakePost;