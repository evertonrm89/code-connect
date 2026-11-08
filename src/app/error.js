"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import errorImage from "./error/500.png";
import ErrorPage from "../components/ErrorPage";


export default function Error({ error }) {
  useEffect(() => {
    // Log de erro para um serviço de monitoramento
    console.error(error);
  }, [error]);

  return (
    <ErrorPage 
      imageUrl={errorImage}
      imageAlt="Erro interno do servidor"
      title="Opa! Um erro ocorreu."
      description="Não conseguimos carregar a página, por favor tente novamente mais tarde."
    />
  );
}
