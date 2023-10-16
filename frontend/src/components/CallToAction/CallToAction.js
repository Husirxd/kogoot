import "./CallToAction.scss"
import Link from 'next/link'
const CallToAction = () => {

    return(
        <div className="call-to-action">
            <div className="container">
                <h2>Educate and have fun!</h2>
                <p>With Kogoot you can create your own quizzes and share them with your team!</p>
                <div className="flex flex--center"><Link href="/account/create"><button>Create Account!</button></Link></div>
            </div>
        </div>
    )
}


export default CallToAction;