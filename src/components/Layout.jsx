import {StyledNavLink} from './Layout.styled'

const { NavLink, Outlet } = require("react-router-dom")
const Layout = () => {

return (
    <div>

    <nav>
        <StyledNavLink to='/'>Home</StyledNavLink>
        <StyledNavLink to='/movies'>Movies</StyledNavLink>
    </nav>

    <main>
        <Outlet/>
    </main>

    </div>
)

}

export default Layout