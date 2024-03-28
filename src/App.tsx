import { useState } from 'react'
import './App.scss'

export default function App() {
  return (
    <>
      <div>ПРИВЕТ КЛОВЕРИ</div>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}
