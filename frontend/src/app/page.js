"use strict";
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
export default async function Home() {
  const posts = await getPosts();
  return (
    <main className={styles.main}>
      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`/quiz/${post.id}`}><h2>{post.title}</h2></Link>
          <p>{post.description}</p>
        </div>
      ))}
    </main>
  )

}

const getPosts = async ()  => {
  const data = await fetch(process.env.KOGOOT_BACK+'/quizzes?limit=3');
  const posts = await data.json();
  return posts;
};