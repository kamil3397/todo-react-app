import { screen, render } from "@testing-library/react"
import AboutPage from "./AboutPage"



describe('AboutPage', () => {
    const setup = () => {
        render(
            <AboutPage />
        )
    }

    it('renders page', async () => {
        setup();
        const header = await screen.findByText('Congratulation!')
        expect(header).toBeInTheDocument()
        expect(screen.getByText('You found our About Page')).toBeInTheDocument()
        expect(screen.getByText('We will let you know if we figure out what the app is made for')).toBeInTheDocument()
    })


})