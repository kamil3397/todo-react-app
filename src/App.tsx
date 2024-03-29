import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleTask from "pages/SingleTask";
import TablePage from "pages/TablePage";
import LogInPage from "pages/LogInPage";
import RegisterPage from "pages/RegisterPage";
import Navbar from "components/containers/NavbarContainer";
import { MainContainer } from "components/containers/MainContainer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTask from "pages/AddTask";
function App() {

  return (
    <>
      <Navbar />
      <MainContainer>
        <Router>
          <Routes>
            <Route path="/" element={<LogInPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/yourTasks" element={<TablePage />} />
            <Route path="/task/:id" element={<SingleTask />} />
            <Route path="/addTask" element={<AddTask />} />
          </Routes>
        </Router>
        <ToastContainer />
      </MainContainer >
    </>
  );
}

export default App;
/*
1. Musimy sprawdzic czy dodaje sie do bazy task zawierajacy odpowiednie userId (jesli nie to zrobmy tak, zeby sie dodawal) 
2. Musimy zmodyfikowac funkcje do pobierania wszystkich taskow tak, aby pobierala tylko taski danego usera (musimy wyslac, np w urlu do bazu userId i zrobic warunek w controllerze i zmienic zapytanie do mongo) 
3. Dodac pole 'repeat password' w Regiser (oraz w formie, validacji etc) nie wysylac go na backend - #####jest i nawet działa, ale nie sypie odpowiednim błedem mimo ze nie dodaje nowego usera##########
4. Posprzatac kod (usunac nieuzywany kod, usunac action z typu taska)- ########zrobione kod poczyszcony z action i komentarzy######################
5. Musimy dodac guarda na froncie, zeby sprawdzac czy user jest zalogowany, zeby moc mu wyswietlic taski* (pomocne hasla w google'u GuardedRoute ReactRouter, ProtectedRoute ReactRouter)
6. Musimy dodac autoryzacje tokenem JWT *
7. Zapisac JWT w localStorage (moze np tworzac wlasnego hooka?)
*/


/*praca domowa 13.03 
1. Zmienic sessionStorage na localStorage######
2. W AddTask.tsx brac userId ze storage a nie z contextu######
3. Napisac nowy context, alertContext (lub infoContext, cos takiego)
 - Context ma nam sluzyc do wyswietlania Alertow z MUI (https://mui.com/material-ui/react-alert/) albo uzyc paczki toastify (https://www.npmjs.com/package/react-toastify)
 - Musimy miec jakis state tego contextu, czyli alert i funkcje do jego ustawiania. 
 - Powinnismy miec mozliwosc wywolania go z kazdego miejsca aplikacji
 - Message powinien miec timeout, zeby znikal po 1-2 sekundach
 
4. event.preventDefault co robi
5. Ostylować AddTask#####
 */

/*Praca domowa 20.03
1. ##########Token, który zwracasz z funkcji login w UserControllerze musisz zapisać w localStorage na froncie###############
2. ##########Do każdego zapytania, które wymaga tego, żeby user był zalogowany (np, wyświetlanie listy tasków lub dodawania nowego taska) musisz dodawać ten token z localStorage do header'a authorisation
3. ##########Jak to zrobisz to powinieneś dodać task bez otrzymywania błedu 403
4. Dodaj funkcje wylogowania- powinna ona czyścic usera w UserContextcie oraz czyścić dane z localStorage
*/

/*Praca domowa 27.03
1. ###################Posprzatac te dziwne Promise.reject
2. ###################Przerobic funkcje wenwatrz TaskContext na wzor AddTask
3. ###################Popsrzatac kod- usunac console.logi, zadbac o skladnie, wszystko ma dzialac.
4. Stworzyc repozytorium i wypchnac wszystko na gita
5. Zrobic GuardedRoutes (jest multum poradnikow w necie)
  - chodzi o chronione sciezki, tj sciezki, ktore sa dostepne tylko dla zalogowanych userow
  - jest to tylko frontendowa praca, z racji tego, ze juz mamy pelna obsluge JWT
  - pozwoli Ci to na wywalenie wiekszosci warunkow, na zasadzie if(token) to cos tam
6. Na kolejnej lekcji robimy sobie 'rozmowe rekrutacyjna'. 30 minut na zadania, 30minut na pytania
*/