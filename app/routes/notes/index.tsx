import { Note } from "@prisma/client";
import { Link, LoaderFunction, redirect, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  notes: Array<Note>;
};
export let loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/");
  }

  const data: LoaderData = {
    user,
    notes: await db.note.findMany({ where: { authorId: user?.id } }),
  };
  return data;
};

export default function Index() {
  const { notes } = useLoaderData<LoaderData>();

  if (!notes || notes.length === 0) {
    return <h1>Where dey at?</h1>;
  }

  return (
    <>
      <div className="flex flex-wrap mt-3">
        {notes.map((note) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4" key={note.id}>
            <Link to={`${note.id}`} className="">
              <div className="m-1 p-3 bg-purple shadow-xl rounded-lg text-base bg-opacity-60 cursor-pointer hover:bg-opacity-40 hover:shadow-2xl transition">
                <h1 className="mb-1">{note.title}</h1>
                <p className="font-sans">{note.content}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export function ErrorBoundary() {
  return <div>There's been an issue loading your notes</div>;
}
