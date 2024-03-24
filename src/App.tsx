import { useState } from 'react'
import './App.scss'

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>ПРИВЕТ КЛОВЕРИ</div>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count +1 = {count}
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          count -1 = {count}
        </button>
      </div>
      <br></br>
      <br></br>
      <br></br>

      <Header />

      <Main />
   
      <Footer />
    </>
  );
}
