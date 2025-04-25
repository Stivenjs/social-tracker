"use client";

import { useState } from "react";
import { SocialTracker } from "@/app/components/social-tracker";
import { toast } from "sonner";
import Fuse from "fuse.js";
import type { Subscription } from "@/app/components/social-tracker/types";

export default function Home() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Maneja el envío del formulario de búsqueda o una búsqueda iniciada desde las suscripciones.
   * Realiza la llamada a la API /api/scrape-all para obtener datos de perfiles sociales.
   * Actualiza el estado con los resultados o errores.
   * Si no se encuentran resultados directos, utiliza Fuse.js para buscar nombres de usuario similares
   * en la lista de suscripciones proporcionada y sugiere el más parecido.
   *
   * @param {React.FormEvent} [e] - El evento del formulario (opcional, para prevenir el comportamiento por defecto).
   * @param {string} [searchName] - El nombre de usuario específico a buscar (usado al hacer clic en una suscripción). Si no se proporciona, se usa el estado 'username'.
   * @param {Subscription[]} [subscriptions=[]] - La lista actual de suscripciones del usuario, usada para la función "¿Quizás quisiste decir?".
   * @returns {Promise<void>} No devuelve nada directamente, pero actualiza el estado del componente.
   */
  const handleSubmit = async (
    e?: React.FormEvent,
    searchName?: string,
    subscriptions: Subscription[] = [] // Recibe las suscripciones
  ): Promise<void> => {
    if (e) e.preventDefault(); // Prevenir envío si es un evento de formulario
    const userToSearch = searchName || username; // Determina el usuario a buscar

    // Validación básica de entrada
    if (!userToSearch.trim()) {
      toast.error("Por favor, introduce un nombre de usuario para buscar.");
      return;
    }

    // Actualiza el campo de entrada si la búsqueda vino de un clic en suscripción
    if (searchName && searchName !== username) {
      setUsername(searchName);
    }

    // Resetea el estado antes de la nueva búsqueda
    setLoading(true);
    setError("");
    setResults([]);

    try {
      // Llamada a la API de scraping
      const response = await fetch("/api/scrape-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userToSearch }),
      });

      if (!response.ok) {
        // Manejo de errores de la respuesta HTTP
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Error ${response.status} al obtener datos`
        );
      }

      const data = await response.json();
      // Asegura que los resultados sean un array
      const apiResults = Array.isArray(data) ? data : data.results;

      if (!Array.isArray(apiResults)) {
        // Manejo de formato inesperado en la respuesta
        console.error("API did not return an array:", data);
        throw new Error("Formato de respuesta inesperado del servidor.");
      }

      setResults(apiResults); // Actualiza el estado con los resultados

      // --- Lógica de "¿Quizás quisiste decir?" ---
      // Se activa si TODOS los resultados fallaron o vinieron vacíos
      const noResultsFound =
        apiResults.length === 0 ||
        apiResults.every(
          (r: any) => r.error || !r.items || r.items.length === 0
        );

      if (noResultsFound) {
        // Solo intentar sugerir si hay suscripciones para comparar
        if (subscriptions && subscriptions.length > 0) {
          // Configurar Fuse.js para buscar en los nombres de las suscripciones
          const fuseOptions = {
            includeScore: true, // Incluir puntuación de similitud
            threshold: 0.4, // Umbral (0=exacto, 1=cualquiera). Ajusta según necesites.
            keys: ["name"], // Buscar en la propiedad 'name' de los objetos Subscription
          };
          const fuse = new Fuse(subscriptions, fuseOptions);
          const searchResult = fuse.search(userToSearch); // Busca similitudes

          if (searchResult.length > 0) {
            // Encontró una coincidencia cercana en las suscripciones
            const bestMatch = searchResult[0].item.name;
            // Muestra la sugerencia en un toast con un botón para reintentar
            toast.info(
              <span>
                No se encontraron resultados para "{userToSearch}". ¿Quizás
                quisiste decir{" "}
                <button
                  className="font-semibold underline hover:text-blue-500 focus:outline-none"
                  // Llama a handleSubmit de nuevo con la sugerencia y la lista de suscripciones
                  onClick={() =>
                    handleSubmit(undefined, bestMatch, subscriptions)
                  }
                >
                  {bestMatch}
                </button>
                ?
              </span>,
              { duration: 10000 } // Aumenta la duración para que el usuario pueda hacer clic
            );
          } else {
            // No encontró coincidencia cercana en suscripciones, mostrar mensaje genérico
            toast.info(
              `No se encontraron resultados para "${userToSearch}". Revisa la ortografía o intenta con otro nombre.`
            );
          }
        } else {
          // No hay suscripciones para comparar, mostrar mensaje genérico
          toast.info(
            `No se encontraron resultados para "${userToSearch}". Revisa la ortografía o intenta con otro nombre.`
          );
        }
      }
    } catch (err: any) {
      // Manejo de errores generales (fetch, JSON parse, etc.)
      setError(err.message || "Error al realizar la búsqueda");
      toast.error(`Error buscando ${userToSearch}: ${err.message}`);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SocialTracker
      username={username}
      setUsername={setUsername}
      results={results}
      loading={loading}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
}
