// context
import { useContext } from 'react'
import { CurrentUser } from '../context/CurrentUser'
// bootstrap components
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Navigation = () => {
    const { currentUser } = useContext(CurrentUser)

    return (
        <nav>
            <ul style={{ listStyle: 'none' }}>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant='dark' sticky='top'>
                    <Container>
                        <Navbar.Brand href='/'><h1>DM Interface</h1></Navbar.Brand>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className='me-auto'>
                                <Nav.Link href="/">Home</Nav.Link>
                                {
                                    currentUser
                                    ? (
                                        <>
                                            <Nav.Link href='/campaigns'>My Campaigns</Nav.Link>
                                            <Nav.Link href='/monsters'>My Monsters</Nav.Link>
                                        </>
                                    ) 
                                    : null
                                }
                            </Nav>
                            {
                                currentUser
                                ? (
                                    <Nav>
                                        <Nav.Link href='/profile'>Logged in as {currentUser.name}</Nav.Link>
                                    </Nav>
                                )
                                : null
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </ul>
        </nav>
    )
}

export default Navigation