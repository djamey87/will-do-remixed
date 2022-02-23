import { Note } from "@prisma/client";
import { LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = { notes: Array<Note> };
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    notes: await db.note.findMany(),
  };
  return data;
};

export default function Index() {
  const { notes } = useLoaderData<LoaderData>();

  if (!notes || notes.length === 0) {
    return <h1></h1>;
  }

  return (
    <>
      <div className="flex flex-wrap mt-3">
        {notes.map((note) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4" key={note.id}>
            <div className="m-1 p-3 bg-purple md:shadow-xl rounded-lg text-base bg-opacity-60">
              <h1 className="mb-1">{note.title}</h1>
              <p className="font-sans">{note.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
