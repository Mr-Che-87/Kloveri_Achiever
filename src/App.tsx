import { useState } from 'react'
import './App.scss'
import   Header   from './components/common/Header/Header';
import  Footer  from './components/common/Footer/Footer';
import  Main  from './pages/Main/Main';





export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>ПРИВЕТ КЛОВЕРИ</div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <br></br>
      <br></br>
      <br></br>

      <Header />

      <Main />
   
      <Footer />
    </>
  )
}


