import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/general.scss'

import AppAdmin from './AppAdmin.tsx'     //или
import AppWorker from './AppWorker.tsx'   //или 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AppAdmin />
     {/*<AppWorker />*/}
  </React.StrictMode>,
)
