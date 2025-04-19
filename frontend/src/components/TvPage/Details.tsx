import React from "react";
import { TvDetailsResponse } from "../../../../shared/types";
import LastEpisodeCard from "./LastEpisodeCard";

type TvDetailsProps = {
    content: TvDetailsResponse['content'];
};

const Details: React.FC<TvDetailsProps> = ({ content }) => {
    return (
        <div className="max-w-5xl mx-auto text-white mt-16 px-6 md:px-0">
            <h1 className="font-bold text-3xl text-center mb-8">Ficha Técnica de la Serie</h1>
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                <div><strong>Nombre:</strong> {content.name}</div>
                <div><strong>Géneros:</strong> {content.genres.map(g => g.name).join(', ')}</div>
                <div><strong>Votos:</strong> {content.vote_count} (Promedio: {content.vote_average})</div>
                <div><strong>Popularidad:</strong> {content.popularity}</div>
                <div><strong>Fecha de estreno:</strong> {content.first_air_date}</div>
                <div><strong>Último episodio emitido:</strong> {content.last_air_date}</div>
                <div><strong>En producción:</strong> {content.in_production ? "Sí" : "No"}</div>
                <div><strong>Número de temporadas:</strong> {content.number_of_seasons}</div>
                <div><strong>Número de episodios:</strong> {content.number_of_episodes}</div>
                <div><strong>Idioma original:</strong> {content.original_language}</div>
                <div><strong>País de origen:</strong> {content.origin_country.join(', ')}</div>
                <div><strong>Productoras:</strong> {content.production_companies.map(c => c.name ?? 'N/A').join(', ')}</div>
                <div><strong>Estado:</strong> {content.status}</div>
                <div><strong>Nombre original:</strong> {content.original_name}</div>
                <div><strong>Tipo:</strong> {content.type}</div>
                <div><strong>TMDB ID:</strong> {content.id}</div>
            </div>
            {content.last_episode_to_air && (
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-white mb-4 text-center">Último Episodio Emitido</h2>
                    <LastEpisodeCard episode={content.last_episode_to_air} />
                </div>
            )}
        </div>
    );
};

export default Details;