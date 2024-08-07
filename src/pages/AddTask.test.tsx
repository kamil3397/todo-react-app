import { fireEvent, render, screen } from "@testing-library/react"
import { AlertProvider } from "context/AlertContext"
import { TaskProvider } from "context/TaskContext"
import AddTask from "./AddTask"
import { ThemeProvider } from "@mui/material"
import { theme } from "theme"


describe('AddTask', () => {

    const toggleDrawerMock = jest.fn();

    const setup = () => {
        render(
            <ThemeProvider theme={theme}>
                <TaskProvider>
                    <AlertProvider>
                        <AddTask toggleDrawer={toggleDrawerMock} />
                    </AlertProvider>
                </TaskProvider>
            </ThemeProvider>
        )
    }

    /*
    ! Konfig localStorage
    ? przed kadym testem ustawiamy warość userId w lS na testUserId,
    ? a po kazdym teście go czyścimy, zeby mieć pewność ze kazdy test
    ? zaczyna się od "czytsego" stanu
    */

    beforeEach(() => {
        localStorage.setItem('userId', 'testUserId')
    })

    afterEach(() => {
        localStorage.clear();
    })

    /*
    ! Renderowanie komponentu
    ? setup() renederuje komponent względem tego co wyzej w 'describe'
    ? kazdy findByText() i getByText() sprawdzają czy odpowiednie elementy są wyświetlone
    ? getByLabelText() sprawdza, czy pola formularza są obecne
    */

    it('renders component', async () => {
        setup();
        const text = await screen.findByText('Add your new Task!')
        expect(text).toBeInTheDocument()
        expect(screen.getByText('Add necessary informations and start working on getting done!')).toBeInTheDocument()
        expect(screen.getByLabelText('Title')).toBeInTheDocument()
        expect(screen.getByLabelText('Description')).toBeInTheDocument()
        expect(screen.getByLabelText('Start Date')).toBeInTheDocument()
        expect(screen.getByLabelText('End Date')).toBeInTheDocument()
        expect(screen.getByText('Create Task')).toBeInTheDocument()

    })


    /*
    ! Test poprawnego przesłania formularza
    ? fireEvent.change() symuluje wprowadznie wartości do formularza (celuje w label i podajesz target jako value )
    ? fireEvent.click symuluje kliknięcie przycisku Create Task
    */

    it('submits form with correct data', async () => {
        setup();
        fireEvent.change(await screen.findByLabelText('Title'), { target: { value: 'Test Task' } });
        fireEvent.change(await screen.findByLabelText('Description'), { target: { value: 'Test Description' } });
        fireEvent.change(await screen.findByLabelText('Start Date'), { target: { value: '2023-07-10' } });
        fireEvent.change(await screen.findByLabelText('End Date'), { target: { value: '2023-07-11' } });
        const submitButton = await screen.findByText('Create Task')
        fireEvent.click(submitButton)
    })

    it('handles category selection', async () => {
        setup();

        const personalCategory = screen.getByText('Personal');
        fireEvent.click(personalCategory);

        expect(personalCategory).toHaveClass('Mui-selected');
    });

    it('renders errors', async () => {
        setup();
        fireEvent.click(screen.getByText('Create Task'))

        const title = await screen.findByText('Title is required')
        expect(title).toBeInTheDocument()

        const desc = await screen.findByText('Description is required')
        expect(desc).toBeInTheDocument()

        const startDate = await screen.findByText('Start date is required')
        expect(startDate).toBeInTheDocument()

        const endDate = await screen.findByText('End date is required')
        expect(endDate).toBeInTheDocument()
    })
})



// 1. Przetestować render Komponentu cały (cofnij zmiany, zmocuj localStorge) w AddTask
// 2. Zrób testy error messages
// 2.1 wyszukaj przycisk, kliknij go, wyszukaj wszytskie error message(find), sprawdź czy się wyświetlają
//3* wyszukaj wszytskie inputy zmien wartosci tych inputow na poprawne w teście bo defaultValues nie przejdą
//zsubmituj i sprawdzaj czy post wykona sie z tymi danymi (trzeba zmockowac axios)