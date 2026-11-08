import ErrorPage from "../components/ErrorPage";
import notFoundImage from "./error/404.png";

export default function NotFound() {
  return (
      <ErrorPage 
        imageUrl={notFoundImage}
        imageAlt="Pagina não encontrada erro 404"
        title="OPS! Página não encontrada."
        description="Você pode voltar ao feed e continuar buscando projetos incríveis."
      />
  );
}