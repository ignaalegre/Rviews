import React from "react";

import { MovieDetailsResponse } from "../../../../shared/types";

type DetailsProps = {
    content: MovieDetailsResponse['content'];
};

const Details: React.FC<DetailsProps> = ({ content }) => {
    return (
        <div className="max-w-5xl mx-auto text-white mt-16 px-6 md:px-0">
            <h1 className="font-bold text-3xl text-center mb-8">Ficha Técnica</h1>
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                <div><strong>Título:</strong> {content.title}</div>
                <div><strong>Géneros:</strong> {content.genres.map(g => g.name).join(', ')}</div>
                <div><strong>Votos:</strong> {content.vote_count} (Promedio: {content.vote_average})</div>
                <div><strong>Popularidad:</strong> {content.popularity}</div>
                <div><strong>Presupuesto:</strong> ${content.budget.toLocaleString()}</div>
                <div><strong>Fecha de lanzamiento:</strong> {content.release_date.slice(0, 4)}</div>
                <div><strong>Idioma original:</strong> {content.original_language}</div>
                <div><strong>País de origen:</strong> {content.origin_country.join(', ')}</div>
                <div><strong>País de producción:</strong> {content.production_countries.map(c => c.name).join(', ')}</div>
                <div><strong>Duración:</strong> {content.runtime} min</div>
                <div><strong>Recaudación:</strong> ${content.revenue.toLocaleString()}</div>
                <div><strong>Productoras:</strong> {content.production_companies.map(c => c.name).join(', ')}</div>
                <div><strong>Estado:</strong> {content.status}</div>
                <div><strong>Título original:</strong> {content.original_title}</div>
                <div><strong>IMDB ID:</strong> {content.imdb_id}</div>
                <div><strong>TMDB ID:</strong> {content.id}</div>
            </div>
        </div>
    );
};

export default Details;