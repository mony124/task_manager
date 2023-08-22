import React, { useState } from 'react';
import './App.css';
import { InputField } from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './models';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedList, setCompleted] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if(todo){
      setTodos([...todos,{id:Date.now(), todo: todo, isDone: false}])
      setTodo("")
    }
  
  }

  const onDragEnd = (result:DropResult) => {
    const {source, destination } = result
    if(destination === null || destination === undefined) return
    if(destination?.droppableId === source.droppableId && destination.index === source.index) return
    let add, active =todos, completed = completedList

    if(source.droppableId === "TodoList"){
      add = active[source.index]
      active.splice(source.index, 1);
    }else{
      add = completed[source.index]
      completed.splice(source.index, 1)
    }

    if(destination?.droppableId === "TodoList"){
      active.splice(destination.index, 0, add)
    }else{
      completed.splice(destination.index, 0, add)

    }

    setCompleted(completed)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
   <div className='App'>
    <span className='heading'>Task Management App</span>
    <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
    <TodoList todos={todos} setTodos={setTodos} completedList={completedList} setCompleted={setCompleted}/>
   </div>
   </DragDropContext>
  );
}

export default App;
