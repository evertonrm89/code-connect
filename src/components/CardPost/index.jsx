import Image from "next/image";
import { Avatar } from "../Avatar";
import styles from "./cardpost.module.css";

// Add highlight style
import Link from "next/link";


export const CardPost = ({ post, highlight }) => {
  return (
    <Link href={`/posts/${post.slug}`} className={styles.link}>
      <article className={styles.article} style={{ width: highlight ? 993 : 486 }}>
        <header className={styles.header}>
          <figure style={{ width: "100%", height: 133, position: "relative" }}>
            <Image
              src={post.cover}
              fill
              sizes={highlight ? "993px" : "486px"}
              style={{ objectFit: "cover" }}
              alt={`Capa do post ${post.title}`}
            />
          </figure>
        </header>
        <div className={styles.body}>
          <h2 className={styles.h2}>{post.title}</h2>
          <p className={styles.p}>{post.body}</p>
        </div>
        <footer className={styles.footer}>
          <Avatar name={post.author.username} imageSrc={post.author.avatar} />
        </footer>
      </article>
    </Link>
  );
};
