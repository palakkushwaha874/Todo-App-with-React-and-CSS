import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  return (
    <>
      <Navbar />

      <div className="container">

        <h1 className='top'>iTask - Manage your Todos at one place</h1>
        <div className="addTodo">
          <h2 className='htwo'>Add a Todo</h2>
          <div className="search">
            <input onChange={handleChange} value={todo} type="text" className='inputbutton' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='btn'>Save</button>
          </div>
        </div>

        <div className='check'>
          <input id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
          <label htmlFor='show'>Show Finished</label>
        </div>

        <div className='line'>___________________________</div>

        <h2 className='htwo'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {

            return ((showFinished || !item.isCompleted) &&

              <div className="todo">

                <div className='check'>
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} />
                  <div>{item.todo}</div>
                </div>
                <div className="buttons">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='btn'> <FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='btn'><MdDelete /></button>
                </div>
              </div>
            )

          })}
        </div>




      </div>






    </>
  )
}

export default App
