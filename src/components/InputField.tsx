import React from 'react'
import "./styles.css"

interface Props{
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e: React.FormEvent) => void
}

export const InputField:React.FC<Props> = ({todo, setTodo, handleAdd}) => {
  return (
    <form className='input' onSubmit={(e) =>handleAdd(e)}>
        <input type='input' value={todo} onChange={(e) => setTodo(e.target.value)} className='inputBox' placeholder="Enter a task" />
        <button type="submit" className='inputSubmit'>Go</button>
    </form>
  )
}
