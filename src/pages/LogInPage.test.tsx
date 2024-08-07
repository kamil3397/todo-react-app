import { fireEvent, render, screen } from "@testing-library/react"
import LogInPage from "./LogInPage"
import { AuthProvider } from "context/AuthContext"
import { AlertProvider } from "context/AlertContext"
import { BrowserRouter } from "react-router-dom"


describe('LoginPage', () => {

    const setup = () => {

        render(
            <BrowserRouter>
                <AuthProvider>
                    <AlertProvider>
                        <LogInPage />
                    </AlertProvider>
                </AuthProvider>
            </BrowserRouter>
        )
    }

    beforeEach(() => {
        localStorage.setItem('userId', 'testUserId')
    })

    afterEach(() => {
        localStorage.clear();
    })

    it('renders page', () => {
        setup()
        expect(screen.getByText('CONTROL YOUR TASKS EVERYDAY!')).toBeInTheDocument()
        expect(screen.getByText('Welcome back!')).toBeInTheDocument()
        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
        expect(screen.getByText('Sign In')).toBeInTheDocument()
        expect(screen.getByText('Quit')).toBeInTheDocument()
        expect(screen.getByText('New user? SING UP!')).toBeInTheDocument()
    })

    it('submits form with correct login data', async () => {
        setup()
        fireEvent.change(await screen.findByLabelText('Email'), { target: { value: 'test@example.com' } })
        fireEvent.change(await screen.findByLabelText('Password'), { target: { value: 'password123' } })

        const submitBtn = await screen.findByText('Sign In')
        fireEvent.click(submitBtn)
    })


})