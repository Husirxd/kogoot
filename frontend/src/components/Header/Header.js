"use client"
import "./Header.scss"
import Link from 'next/link';
import Image from "next/image";
const Header = () => {

    const handleMenuClick = () => {
        document.querySelector(".header__nav").classList.toggle("active");
    };

    return (
        <header className="header">
            <div className="container flex flex--between">
                <h1 className="header__title"><Link href="/">KOGOOT</Link></h1>
                <div onClick={handleMenuClick} className="mobile hamburger"><Image width={32} height={32} src="/assets/images/icons/burger-solid.svg"/></div>
                <nav className="header__nav">
                    <Link href="/profile">Profile</Link>
                    /
                    <Link href="/quizzes">Learn</Link>
                    /
                    <Link href="/create">Create</Link>
                </nav>
                
            </div>
        </header>
    );

};

export default Header;