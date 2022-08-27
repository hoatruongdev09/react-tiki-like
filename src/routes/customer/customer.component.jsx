import { Outlet } from 'react-router-dom'
import UserSideBar from '../../components/user/user-side-bar/user-side-bar.component'
import UserTitleBar from '../../components/user/user-title-bar/user-title-bar.component'
const Customer = () => {
    return (
        <>
            <UserTitleBar />

            <section class="section-content padding-y">
                <div class="container">

                    <div class="row">
                        <UserSideBar />
                        <main class="col-md-9">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Customer