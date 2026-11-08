import { Suspense } from "react";
import Link from "next/link";
import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from "./page.module.css";
import db from "../../prisma/db";

async function getPosts(page, searchTerm) {
  try {

    const where = {}

    if(searchTerm){
      where.title = {
        contains: searchTerm,
        mode: "insensitive"
      }
    }

    const page_size = 6;
    const skip = (page - 1) * page_size;

    const totalItens = await db.post.count({ where });
    const totalPages = Math.ceil(totalItens / page_size); // Calcula o total de páginas e por quantos itens existem no total e arredonda para cima

    const next = page < totalPages ? page + 1 : null;
    const prev = page > 1 ? page - 1 : null;

    const [posts] = await Promise.all([
      db.post.findMany({
        take: page_size,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        include: { author: true },
        skip: skip,
        where

      }),
      //db.post.count({ where }),
    ]);

    return {
      data: posts,
      prev,
      next,
    };
  } catch (error) {
    logger.error("Failed to fetch posts", { error });
    return { data: [], prev: null, next: null };
  }
}

async function PostList({ searchParams }) {
  const params = await searchParams;
  const pageValue = Array.isArray(params.page) ? params.page[0] : params.page;
  const parsedPage = Number(pageValue);
  const page =
    Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const searchTerm = Array.isArray(params.q) ? params.q[0] : params.q;

  const { data: posts, prev, next } = await getPosts(page, searchTerm);

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <CardPost key={post.id} post={post} />
      ))}

      <div className={styles.pagination}>
        {prev && <Link href={{ pathname: "/", query: { page: prev, q: searchTerm } }}>Página Anterior</Link>}
        {next && <Link href={{ pathname: "/", query: { page: next, q: searchTerm } }}>Próxima Página</Link>}
      </div>
    </div>
  );
}

export default function Home({ searchParams }) {
  return (
    <main>
      <Suspense fallback={<p>Carregando posts...</p>}>
        <PostList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
