import { ActionFunction, Form, redirect } from "remix";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  console.log("incoming formData", formData);
  // const project = await createProject(formData);
  return redirect(`/`);
  // return redirect(`/projects/${project.id}`);
};

export default function Index() {
  return (
    <Form className="w-full max-w-lg" method="post">
      <div className="w-full">
        <label className="block tracking-wide text-purple text-xs font-bold">
          title:
          <br />
          <input
            type="text"
            name="title"
            id="note-title"
            className="border border-purple rounded py-1 pr-1 pl-3 mb-3 mt-1 leading-tight focus:outline-none text-sm text-black"
          />
        </label>
      </div>

      <div className="w-full">
        <label className="block tracking-wide text-purple text-xs font-bold mb-2">
          content:
          <br />
          <textarea
            name="content"
            id="note-content"
            className="border border-purple rounded py-1 pr-1 pl-3 mb-3 mt-1 focus:outline-none text-sm text-black"
          ></textarea>
        </label>
      </div>

      <button
        type="submit"
        className="flex-shrink-0 border-transparent text-sm py-1 px-2 rounded bg-purple text-white"
      >
        Create
      </button>
    </Form>
  );
}
