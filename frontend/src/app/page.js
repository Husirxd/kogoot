import Image from 'next/image'
import styles from './page.scss'

import Hero from '../components/Hero/Hero'
import QuizTile from '@/components/QuizTile/QuizTile';
import CallToAction from '@/components/CallToAction/CallToAction';
export default async function Home() {
  const posts = await getPosts();
  return (
    <main className={styles.main}>
      <Hero/>
      <section className='container quizzes quizzes'>
        <div className='quizzes__grid'>  
        {posts.map((post) => (
          <QuizTile key={post?.id} quiz={post} />
        ))}
        </div>
      </section>
      <CallToAction/>
      <section className="why-us container">
        <h2>WHY <span>KOGOOT?</span></h2>
        <div className='rows'>
          <div className='row'>
            <h3>
              Create your own quizzes and share them with your team!
            </h3>
            <ul>
              <li>Free plan</li>
              <li>Unlimited quizzes</li>
              <li>Quick setup</li>
              <li>Open source</li>
            </ul>
            <p>
            Sed a metus tempor, dapibus urna ac, porttitor erat. Duis pulvinar nibh a ex venenatis volutpat. Curabitur facilisis dolor vel massa aliquet maximus. Duis iaculis tristique enim pellentesque porttitor. Integer rhoncus risus eget fermentum dictum. Nullam et ligula sed nibh tincidunt vulputate. Pellentesque imperdiet varius facilisis. Praesent mauris risus, hendrerit a dignissim sit amet, viverra nec metus. Vestibulum pretium pellentesque diam laoreet malesuada. Fusce id tortor posuere, venenatis arcu eu, aliquet mauris. Praesent sit amet sodales arcu, in dapibus lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus quis luctus nibh, vitae iaculis quam. Etiam sit amet pharetra lorem, nec hendrerit metus. Ut sollicitudin augue et odio ultricies porta.
            </p>
          </div>
          <div className='row'>
            <Image src="/assets/images/brain.jpg" width={500} height={500} alt="brain" />
          </div>
        </div>
      </section>
    </main>
  )

}

const getPosts = async ()  => {
  const data = await fetch('http:/localhost:8080/quizzes?limit=3');
  const posts = await data.json();
  return posts;
};