import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
  } from 'react-router-dom';
  
  import './NavigationMenu.scss';
  
  import AdminAccount from '../../pages/AdminAccount/AdminAccount';
  import WorkersAchievements from '../../pages/WorkersAchievements/WorkersAchievements';
  import TeamsAchievements from '../../pages/TeamsAchievements/TeamsAchievements';
  import AchievementsConstructor from '../../pages/AchievementsConstructor/AchievementsConstructor';
  import GoodsConstructor from '../../pages/GoodsConstructor/GoodsConstructor';
  
  //компонент перенаправления на сторонний сайт (просто так пока):
  const Yandex = ({ to }: { to: string }) => {
    window.location.href = to;
    return null;
  };
  
  const NotFound = () => <div>404</div>;
  
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
      
        <div className='routes'>
          <Routes>
            <Route path="/" element={<AdminAccount />} />
            <Route path="/workers-achievements" element={<WorkersAchievements />} />
            <Route path="/teams-achievements" element={<TeamsAchievements />} />
            <Route path="/achievements-constructor" element={<AchievementsConstructor />} />
            <Route path="/goods-constructor" element={<GoodsConstructor />} />
            
            <Route path="/external" element={<Yandex to="https://yandex.ru" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
      </Router>
      
    );
  }
  