import Image from "next/image";
import type { GetServerSideProps } from 'next'
import Link from "next/link";
import { PostType } from "./types";

async function getAllPosts(){
  const res = await fetch(`http://localhost:3000/api/forum`, { cache: 'no-store' })
  const data = await res.json()
  if (!data){
    throw new Error('Failed to fetch data')
  }
  return data.posts;
}

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-blue-900 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold">
          flow for thought 📝
        </h1>
      </div>
      {/* Link */}
      <div className="flex my-5">
        <Link
          href={"/forum/add"}
          className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-300 font-semibold"
        >
          leave a note
        </Link>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {posts.map((post: PostType) => (
          <div 
            key={post.id}
            className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-300 flex flex-col justify-center"
          >

          <div className="flex items-center my-3">
            <div className="mr-auto">
              <h2 className="mr-auto font-semibold">{ post.title }</h2>
            </div>
            <Link
              href={`/forum/edit/${post.id}`}
              className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
            >
              edit
            </Link>
          </div>

          <div className="mr-auto my-1">
            <blockquote className="font-bold text-slate-700">{ post.date.toString() }</blockquote>
          </div>

          <div className="mr-auto my-1">
            <h2>{ post.description }</h2>
          </div>
          </div>
        ))}
      </div>
    </main>
  );
}
