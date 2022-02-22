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
  const data = useLoaderData<LoaderData>();
  return (
    <>
      <h1>List out all notes here</h1>
      <ul>
        {data.notes.map((note) => (
          <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </ul>
    </>
  );
}
