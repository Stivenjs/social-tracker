"use client";

import { useState } from "react";
import { SocialTracker } from "@/app/components/social-tracker"
import { toast } from "sonner"; 

export default function Home() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Modify handleSubmit to accept optional event and searchName
  const handleSubmit = async (e?: React.FormEvent, searchName?: string) => {
    if (e) e.preventDefault(); // Prevent default form submission if event exists
    const userToSearch = searchName || username; // Use passed name, fallback to state

    // Check if there's a username to search
    if (!userToSearch.trim()) {
      toast.error("Por favor, introduce un nombre de usuario para buscar.");
      return;
    }

    // Update the input field if the search came from a subscription click
    if (searchName && searchName !== username) {
      setUsername(searchName);
    }

    setLoading(true);
    setError("");
    setResults([]); // Clear previous results before new search

    try {
      const response = await fetch("/api/scrape-all", {
        // Ensure this is the correct endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userToSearch }), // Use userToSearch
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al obtener datos");
      }

      const data = await response.json();
      // Assuming the API returns an array directly or an object with a results property
      const apiResults = Array.isArray(data) ? data : data.results;

      if (!Array.isArray(apiResults)) {
        console.error("API did not return an array:", data);
        throw new Error("Formato de respuesta inesperado del servidor.");
      }

      setResults(apiResults);

      // Check if results are truly empty or only contain errors/no items
      if (
        apiResults.length === 0 ||
        apiResults.every(
          (r: any) => r.error || !r.items || r.items.length === 0
        )
      ) {
        toast.info(
          `No se encontraron resultados para ${userToSearch} en las plataformas soportadas.`
        );
      }
    } catch (err: any) {
      setError(err.message || "Error al realizar la búsqueda");
      toast.error(`Error buscando ${userToSearch}: ${err.message}`);
      setResults([]); // Ensure results are cleared on error
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
