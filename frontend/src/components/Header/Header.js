import "./Header.scss"
import Link from 'next/link';
const Header = () => {


    return (
        <header className="header">
            <div className="container flex flex--between">
                <h1 className="header__title"><Link href="/">KOGOOT</Link></h1>
                <nav className="header__nav">
                    <Link href="/create">Create Quiz</Link>
                </nav>
            </div>
        </header>
    );

};

export default Header;