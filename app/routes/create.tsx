import { Form } from "remix";

export default function Index() {
  return (
    <Form className="w-full max-w-lg" method="post">
      <div className="w-full">
        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
          title:
          <input
            name="title"
            id="note-title"
            className="bg-gray-200 text-gray-700 border border-slate-400 rounded py-1 pr-1 pl-3 ml-2 mb-3 leading-tight focus:outline-none focus:bg-white"
          ></input>
        </label>
      </div>

      <div className="w-full">
        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
          content:
          <textarea
            name="content"
            id="note-content"
            className="bg-gray-200 text-gray-700 border border-slate-400 rounded py-1 pr-1 pl-3 ml-2 mb-3 leading-tight focus:outline-none focus:bg-white"
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
