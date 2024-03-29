// context
import { useContext } from 'react'
import { CurrentUser } from '../context/CurrentUser'
// bootstrap components
import { Container, Nav, Navbar } from 'react-bootstrap'

const Navigation = () => {
    const { currentUser } = useContext(CurrentUser)

    const handleLogOut = (e) => {
        localStorage.clear()
        sessionStorage.clear()
    }

    return (
        <nav>
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
                                    <Nav.Link href='/' onClick={handleLogOut}><b>Log Out</b></Nav.Link>
                                </Nav>
                            )
                            : null
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </nav>
    )
}

export default Navigation