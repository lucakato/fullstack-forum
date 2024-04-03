"use client";

import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Toaster, toast } from "react-hot-toast";

type updateParams = {
    title: string;
    description: string;
    id: number;
};

const updatePost = async (data: updateParams) => {
    const res = await fetch(`http://localhost:3000/api/forum/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: data.title, description: data.description }),
    });

    return res.json();
};

const getPostByID = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/forum/${id}`);
    const data = await res.json();
    return data.post;
};


const EditPost = ({ params }: { params: { id: number } }) => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        toast.loading("Loading...", {id: "1"});

        if (titleRef.current && descriptionRef.current){
            toast.loading("updating!", { id: "1" });

            await updatePost({
                title: titleRef.current?.value, 
                description: descriptionRef.current?.value,
                id: params.id,
            });
    
            toast.loading("Success!", {id: "1"});
            
            router.push("/");
            router.refresh();
        }
    };

    useEffect(() => {
        toast.loading("Fetching Post Details 🚀", { id: "1" });
        getPostByID(params.id)
            .then((data) => {
                if (titleRef.current && descriptionRef.current) {
                    titleRef.current.value = data.title;
                    descriptionRef.current.value = data.description;
                    console.log(params.id)
                    toast.success("Fetching Completed", { id: "1" });
                }
            }).catch((err) => {
                toast.error("Error!", { id: "1" });
            });
    }, []);

    return (
        <>
            <Toaster />
            <div className="w-full m-auto flex my-4">
            <div className="flex flex-col justify-center items-center m-auto">
                <p className="text-2xl text-slate-200 font-bold p-3">edit thought 🚀</p>
                <form onSubmit={handleSubmit}>
                <input
                    ref={titleRef}
                    placeholder="enter title"
                    type="text"
                    className="rounded-md px-4 w-full py-2 my-2"
                />
                <textarea
                    ref={descriptionRef}
                    placeholder="enter thoughts"
                    className="rounded-md px-4 py-2 w-full my-2"
                ></textarea>
                <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                    Update
                </button>
                <button className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
                    Delete
                </button>
                </form>
            </div>
            </div>
        </>
    );
};

export default EditPost;