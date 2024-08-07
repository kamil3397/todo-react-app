import { fireEvent, render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { BrowserRouter, useNavigate } from "react-router-dom";

//! zastępuje oryginalny moduł mockiem
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),  //? mockowanie useNavigate
}));


describe('HomePage', () => {

    const mockedNavigate = jest.fn()

    const setup = () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        )
    }

    it('renders page', () => {
        setup()
        expect(screen.getByText('GET THINGS DONE WITH ToDo APP')).toBeInTheDocument()
        expect(screen.getByText(
            'Going through stress getting your tasks on track? What if this is the best way of keeping all your tasks at one place and well organized? Save yourself the stress and have fun while doing what you love')).toBeInTheDocument()
    })

    it('navigates to login', async () => {
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockedNavigate)

        setup()

        fireEvent.click(await screen.findByText('Sign In'))
        expect(mockedNavigate).toBeCalledWith('/login')
    })


    it('navigates to register', async () => {
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockedNavigate);

        setup();

        fireEvent.click(await screen.findByText('Sign Up'))
        expect(mockedNavigate).toHaveBeenCalledWith('/register')
    })
})