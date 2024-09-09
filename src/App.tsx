import { lazy, Suspense } from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "utils/ProtectedRoute";
import { Loader } from 'components/Loader';

const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LogInPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const About = lazy(() => import('./pages/AboutPage'))
const TablePage = lazy(() => import('./pages/TablePage'))
const SingleTask = lazy(() => import('./pages/SingleTask'))
const AddTask = lazy(() => import('./pages/AddTask'))
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'))

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/yourTasks" element={<ProtectedRoute><TablePage /></ProtectedRoute>} />
            <Route path="/task/:id" element={<ProtectedRoute><SingleTask /></ProtectedRoute>} />
            <Route path="/addTask"
              element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

/* Usprawnienia / praca domowa
1. Dodac w rejestracji opcjonalne pole phone number (bo w profile mozemy to edytowac) (front + backend)
2. Zmienic strukture taska:
  - w tabeli taskow nie mamy headerow (https://dribbble.com/shots/21506478-Data-Table-Invoice) przerobic tabele na ten wzor (front) (moze uzyc mui data grid?? https://mui.com/x/react-data-grid/ )
  - struktura taska powinna byc nastepujaca (front + backend):
    ###########userId: string;
    ###########_id: string;
    ###########title: string;
    ###########description: string;
    ############status: 'completed' | 'in-progress' | 'pending' ( to powinien byc enum)
    ###########createdAt - kiedy zostal stworzony

    ######POKAZAC EDIT TASK##### completedAt - kiedy zostal zakonczony (po zakonczeniu nie mozna go juz edytowac)
    MAMY POLE COMPLETEDAT wiec  teraz tylko ogarnacnac front zeby nie mozna bylo edytowac taska
    completionTime - ile (w dniach) zajelo ukoneczenie

    ###########category - enum- zamkniete wartosci (select)
  ##############3.  Przerobic component AddTask (front)
  ##############  - design: https://dribbble.com/shots/20750880-Project-Dashboard-element
  ##############  - ten modal (1 obrazek), nie chce, zeby byl modalem.
    Po kliknieciu naszego + (buttona) otworzymy drugi drawer z prawej strony cos na wzor tego (https://dribbble.com/shots/20280952-Task-management-task-view)
    - uwzglednic nowe pola taska:
      - createdAt powinno byc tworzone na backendzie
      - status automatycznie na backendzie na 'PENDING'
      - category- select, zamknieta lista
      - completionTime przy tworzeniu zostaje puste (moze byc null)
      * sprobuj zrobic tak, zeby nowy Drawer byl rezuwalny, ulatwi Ci to zycie w przyszlosci
  4. Przerobic TaskDetails (front)
    - taki sam jak w AddTask (tylko bez inputw, tylko wyswietla)
    - wymyslic jakas fajna zmiane statusu (mozesz uzyc toggle button z MUI lub np buttongroup, icon buttons)
    - wyswietlac nowe pola
  5. Zmienic edycje taska
    - edytujemy w drawerze (tak jak przy dodawania)
  6. Dodac filtrowanie w tabeli
    - filtrowanie to tak na prawde jakies przyciski w headerze
    - ale filtrujemy na poziomie zapytania do bazy danych, wiec musimy przesylac wszystkie info dotyczace filtorwanie w requescie
 ///////////////////
  Nowe funkcje
  1. Wyswietlanie listy wszystkich taskow (tez innych userow)
      - musimy zrobic liste rol usera (backend)
      - zrobic nowa tabele users (dostepna dla wszystkich)
      - opcja- assing role (dostepna dla admina)
  2. Wyswietlanie kto jest przypisany itd
*/