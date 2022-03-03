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
  return (
    <>
      <div className="flex flex-wrap mt-3">
        <a href="/login">login</a>
      </div>
    </>
  );
}
