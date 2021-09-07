import { Nav } from 'react-bootstrap';

export default function Navbar() {
	return (
		<Nav
			className="justify-content-end"
		>
			<Nav.Item>
      {/* { user ?
        <Nav.Link href='/api/auth/logout'>Logout</Nav.Link> :
				<Nav.Link href='/api/auth/login'>Login</Nav.Link>
      } */}
			</Nav.Item>
      <Nav.Item>
				<Nav.Link href='/god'>God</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href='/'>🏡</Nav.Link>
			</Nav.Item>
		</Nav>
	)
}
	