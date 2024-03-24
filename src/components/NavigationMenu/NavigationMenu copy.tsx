import {
    BrowserRouter as Router,
    Link,
  } from 'react-router-dom';


export default function NavigationMenu() {

    return (
        <Router>
        <>
        <nav>
          <ul>
            <li>
              <Link to="/">Личный кабинет кадровички</Link>
            </li>
            <li>
              <Link to="/workers-achievements">Достижения сотрудников</Link>
            </li>
            <li>
              <Link to="/teams-achievements">Достижения команд</Link>
            </li>
            <li>
              <Link to="/achievements-constructor">Конструктор достижений</Link>
            </li>
            <li>
              <Link to="/goods-constructor">Конструктор товаров</Link>
            </li>
         
            <li>
          <a href="/external" style={{ color: 'green' }}>Yandex</a>
            </li>
          
          </ul>
        </nav>
        </>
        </Router>
    )
}