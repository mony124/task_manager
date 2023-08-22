import React from "react";
import { Todo } from "../models";
import "./styles.css";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedList : Todo[];
  setCompleted:React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedList, setCompleted }) => {

  return (
    <div className="container">
      <Droppable droppableId="TodoList">
      {(provided) => (
        <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
        <span className="todo_title">Acitve Task</span>
        {todos.map((item, index) => (
          <SingleTodo
          index={index}
            todo={item}
            key={item.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
        {provided.placeholder}
      </div>
      )
      } 
        </Droppable>

        <Droppable droppableId="TodoRemove">

          {(provided) => (
 <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
 <span className="todo_title">InProgress Task</span>

 {completedList.map((item, index) => (
   <SingleTodo
     todo={item}
     index={index}
     key={item.id}
     todos={completedList}
     setTodos={setCompleted}
   />
 ))}
        {provided.placeholder}

</div>
          )}
     
      </Droppable>
    </div>
  );
};

export default TodoList;
