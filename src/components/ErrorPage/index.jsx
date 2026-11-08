
import style from "./erroPage.module.css"
import Image from "next/image";
import Link from "next/link";


export const ArrowBack = ({color = '#132E35', style}) => {
    return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path d="M12.5117 5.76172V7.23828H3.37109L7.55469 11.457L6.5 12.5117L0.488281 6.5L6.5 0.488281L7.55469 1.54297L3.37109 5.76172H12.5117Z" fill={color} />
    </svg>
}


export default function ErrorPage({ imageUrl, imageAlt, title, description }) {

  return (
    <container className={style.error}>
      <Image className={style.errorImage}
        src={imageUrl}
        alt={imageAlt || "Erro interno do servidor"}
      />
      <h1 className={style.errorMessage}>{title || "Opa! Um erro ocorreu."}</h1>
      <p className={style.errorDescription}>{description || "Não conseguimos carregar a página, por favor tente novamente mais tarde."}</p>

      <Link href="/" className={style.errorLink}>
        Voltar para a página inicial 
        <ArrowBack color="#029c14" style={{margin: "0 0 0 10px"}} />
      </Link>
    </container>
  );
}
