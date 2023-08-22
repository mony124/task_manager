import React, { useState } from 'react'
import { Todo } from '../models'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'
type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    index: number
}
const SingleTodo:React.FC<Props> = ({todo, todos,setTodos, index}) => {

    const [edit, setEdit] = useState<Boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

const handleDelete = (id: number) => {
    const updatedList = todos.filter((item) => item.id !== id)
    setTodos(updatedList)
}

const handleEdit = (e:React.FormEvent, id: number) => {
e.preventDefault();
setTodos(todos.map((item) => item.id === id ? {...item, todo: editTodo} : item))
setEdit(false)
}

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided) => (
    <form className='todos_single' onSubmit={(e) => handleEdit(e,todo.id)} {...provided.draggableProps}
     {...provided.dragHandleProps} ref={provided.innerRef}
    >
        
        {
            edit ? (
                <input value={editTodo} onChange={(e) =>  setEditTodo(e.target.value)}/>
            ): 
            (
            <span className='todos_singleText'>
            {todo.todo}
                </span>
            )
        }
           
    
     
            <button className="todos_button" type="button" onClick={() => {if(!edit){setEdit(true)}}} >Edit</button>
            <button className="todos_button"  type="button" onClick={() => handleDelete(todo.id)}>Delete</button>

    </form>

        )}
    </Draggable>
  )
}

export default SingleTodo