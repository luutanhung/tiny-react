export function Icon() {
  return `<span>Icon</span>`;
}
export function Title() {
  return `
    <div>
      <Icon />
      <h2>Todo Management</h2>
    </div>
  `;
}

export const nativeDOMJsxString = `
  <div className="card shadow-sm p-4">
    <h2 className="text-lg font-bold">Quick Task</h2>
    <p className="text-gray-600">Review PR #104</p>
    <button
      className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
      onClick={() => completeTask(104)}
    >
      Complete
    </button>
  </div>
`;

export const complexJsxString = `
  <div className="card shadow-sm p-4">
    <Title />
    <div className="profile">
      Active tasks
    </div>
    <button
      className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
      onClick={() => alert("Add Task")}
    >
      Add Task
    </button>
  </div>
`;

export const JsxStringWithFragment = `
  <header className="bg-gray-100 p-4">
    <nav>
      <ul className="flex gap-4">
        <>
          <li><a href="#">Home</a></li>
          <li><a href="#">Tasks</a></li>

          <>
            <li><a href="#">Home</a></li>
            <li><a href="#">Tasks</a></li>
          </>
        </>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  </header>
`;
