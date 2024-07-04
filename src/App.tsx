import {BrowserRouter, Route, Routes} from "react-router-dom";
import routes from "./routes";
import React from "react";
import Page from "./components/Page";
import Auth from "./components/main/authorisation/Auth";
import Login from "./components/main/authorisation/Login";
import Registration from "./components/main/authorisation/Registration";
import PasswordReset from "./components/main/authorisation/PasswordReset";
import PasswordResetConfirm from "./components/main/authorisation/PasswordResetConfirm";
import Homepage from "./components/main/homepage/Homepage";
import DoctorList from "./components/main/search/DoctorList";
import ServiceList from "./components/main/search/ServiceList";
import Direction from "./components/main/detail/Direction";
import Service from "./components/main/detail/Service";
import Doctor from "./components/main/detail/Doctor";


function App() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={routes.MAIN()} element={<Page />}>
                    <Route path={routes.MAIN()} element={<Homepage />} />
                    <Route path={routes.DOCTOR_LIST()} element={<DoctorList />} />
                    <Route path={routes.SERVICE_LIST()} element={<ServiceList />} />
                    <Route path={routes.DIRECTION_DETAIL()} element={<Direction />} />
                    <Route path={routes.SERVICE_DETAIL()} element={<Service />} />
                    <Route path={routes.DOCTOR_DETAIL()} element={<Doctor />} />


                    <Route path={routes.LOGIN()} element={
                        <Auth component={
                            <Login />}
                        />}
                    />
                    <Route path={routes.REGISTRATION()} element={
                        <Auth component={
                            <Registration />}
                        />}
                    />
                    <Route path={routes.RESET_PASSWORD()} element={<PasswordReset />} />
                    <Route path={routes.RESET_PASSWORD_CONFIRM()} element={<PasswordResetConfirm />} />
                </Route>


            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;


// function App() {
//     const [login, setLogin] = useState(``)
//     const [password, setPassword] = useState(``)
//     const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
//                 const element = event.target as HTMLInputElement
//                 setLogin(element.value)
//             };
//     const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
//                 const element = event.target as HTMLInputElement
//                 setPassword(element.value)
//             };
//
//     const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         event.preventDefault()
//         axios.post(`http://localhost:8000/auth/login/`, {
//             email: login,
//             password:  password
//         }).then(response => {
//             if (response.status!== 200) return
//             localStorage.setItem(`refreshToken`, response.data.refresh)
//             localStorage.setItem(`accessToken`, response.data.access)
//             setLogin(``)
//             setPassword(``)
//         }).catch(error => console.error(error))
//     }
//     return (
//         <div>
//             <input type=`email`
//                    value={login}
//                    placeholder={`login`}
//                    onChange={handleChangeLogin}/>
//             <input type=`password`
//                    value={password}
//                    placeholder={`password`}
//                    onChange={handleChangePassword}/>
//             <button type=`submit` onClick={handleSubmit}>
//                 send
//             </button>
//         </div>
//     )
// }
