import Header from "./header/Header";
import {Outlet} from "react-router-dom";
import Footer from "./footer/Footer";
import React from "react";

const Page: React.FC = () => {
    return (
        <>
            <Header />
            <main className={`container d-flex flex-column flex-grow-1`}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default Page;