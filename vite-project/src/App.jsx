import { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [todos, setTodo] = useState([]);
  let [value, setValue] = useState("");
  let [editing, setEditing] = useState(false)
  let [edited, SetEdited] = useState(null)
  let [conform, Setconform] = useState();


  function editTask(editvalue, i) {
    setEditing(true)
    Setconform(editvalue);
    SetEdited(editvalue)

  }


  let insertUpdate = (value) => {
    console.log(value, "edited upate button", edited, "update edite")
    console.log(conform, "controfm ", value, "value new")
    console.log(todos, "todoss")
    setTodo(todos.map((e) => {
      if (e.key == conform.key) {
        return { ...e, input: value };
      }
      return e
    }))
    // todos[index].input=value
    setEditing(false)
  }
  return (
    <>
      <div class='container'>
        <h1>My To-Do List</h1>
        <div class='todo-input'>

          {editing ? <input
            type='text'
            value={edited.input}
            onChange={(e) => {
              SetEdited(e.target.value);
            }}
            id='taskInput'
            placeholder='Add a new task...'

          /> : <input
            type='text'

            onChange={(e) => {
              setValue(e.target.value);
            }}
            id='taskInput'
            placeholder='Add a new task...'

          />}


          <button
            id='addTaskBtn'
            onClick={() => {
              editing ? insertUpdate(edited) : setTodo([...todos, { input: value, key: Date.now(), status: false }]);
            }}
          >
            {editing ? "Update" : "Add Task"}
          </button>
        </div>
        {todos.map((e, i) => {
          return (
            <ul
              id='taskList'
              style={{
                listStyle: "none",
                padding: 0,
              }}
            >
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#f8f9fa",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              >
                {!e.status ?
                  <input
                    onClick={() => {
                      setTodo(todos.map((todo) => {
                        if (todo.input == e.input) {
                          return { ...todo, status: true };
                        }

                        return todo
                      }))
                    }}
                    id='status-box'
                    type='checkbox'
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                  />
                  : <div class="line1">
                    <span class="line-text1">{e.input}</span>
                  </div>}
                <span
                  style={{
                    flex: 1,
                    fontSize: "16px",
                  }}
                >
                  {!e.status ? e.input : null}
                </span>
                {!e.status ?
                  <button
                    onClick={() => {
                      setTodo(todos.filter((todo) => todo.input !== e.input));
                    }}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    delete
                  </button>

                  : null}
                {e.status ? null :
                  <button onClick={() => { editTask(e) }}>Edit</button>}
              </li>

            </ul>

          );

        })}



      </div>
    </>
  );
}

export default App;
