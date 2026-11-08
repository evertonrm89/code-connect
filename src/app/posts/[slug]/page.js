import { Suspense } from "react";
import { CardPost } from "@/components/CardPost";
import db from "../../../../prisma/db";
import styles from "./page.module.css";
import logger from "../../../logger";

import { remark } from "remark";
import remarkHtml from "remark-html";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getPostBySlug(slug) {
  
  try {
    const post = await db.post.findFirst({
      where: {
        slug,
      },
      include: {
        author: true,
      },
    });

    if (!post) {
      throw new Error(`Post not found for slug: ${slug}`);
    }

    const processedContent = await remark()
      .use(remarkHtml)
      .process(post.markdown);

    post.markdown = processedContent.toString();

    return post;

  } catch (error) {
    logger.error('Error fetching post by slug:', 
      slug,
      error);

      redirect(`/not-found`);
  }
}

async function PostContent({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return (
    <>
      <CardPost post={post} highlight />
      <h3 className={styles.subtitle}>Codigo:</h3>
      <div className={styles.code}>
        <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
      </div>
      <div className={styles.linkContainer}>
        <Link href={`/`} className={styles.link}>
          Voltar para a lista de posts
        </Link>
      </div>
    </>
  );
}

const PostPage = ({ params }) => {
  return (
    <div>
      <Suspense fallback={<p>Carregando post...</p>}>
        <PostContent params={params} />
      </Suspense>
    </div>
  );
};

export default PostPage;
