import React, { useState } from 'react';
import { TodoItem } from './TodoItem';

export function TodoListExample() {
  const [todos, setTodos] = useState([
    {
      id: '1',
      title: 'ส่งสรุปผลการประชุม Sprint Planning',
      priority: 'high',
      dueDate: '2026-10-10',
      completed: false,
    },
    {
      id: '2',
      title: 'รีวิว Pull Request โมดูลยืนยันตัวตน',
      priority: 'medium',
      dueDate: '2026-10-12',
      completed: true,
    },
    {
      id: '3',
      title: 'อัปเดตเอกสาร API Documentation',
      priority: 'low',
      dueDate: '2026-10-15',
      completed: false,
    },
  ]);

  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '16px' }}>
      <h2 style={{ marginBottom: '16px', color: '#0f172a' }}>Smart Todo List</h2>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            priority={todo.priority}
            dueDate={todo.dueDate}
            completed={todo.completed}
            onToggle={() => handleToggle(todo.id)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoListExample;
