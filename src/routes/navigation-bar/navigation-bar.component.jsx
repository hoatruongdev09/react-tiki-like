import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectShowNavBar } from '../../store/general/general.selector'


import SearchBar from '../../components/search-bar/search-bar.component'
import NavBarUser from '../../components/user-nav-bar/user-nav-bar.component'
import MenuBar from '../../components/nav-bar/nav-bar.component'

import './nav-bar.styles.scss'
const NavigationBar = () => {
    const showNavBar = useSelector(selectShowNavBar)
    return (
        <>
            {(showNavBar ?
                <header className="section-header">
                    <NavBarUser />
                    <div className="container">
                        <SearchBar />
                        <MenuBar />
                    </div>
                </header> :
                <></>
            )}
            <Outlet />
        </>

    )
}

export default NavigationBar