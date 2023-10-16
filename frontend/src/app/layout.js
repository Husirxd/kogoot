import './globals.scss'
import { Inter } from 'next/font/google'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kogoot',
  description: 'Solve quizzes and learn new things!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
