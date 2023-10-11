export default async function Page({ params }) {
  const post = await getPost(params);
  
  return(
    <>
    <div>My Post: {params.id}</div>
    <div>{post.title}</div>
    <div>{post.description}</div>
    </>
  )

}

const getPost = async ({id})  => {
  const data = await fetch(process.env.KOGOOT_BACK+'/quizzes/single/'+id);
  const posts = await data.json();
  return posts;
};
