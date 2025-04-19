import React from "react";
import { TvDetailsResponse } from "../../../../shared/types";

type LastEpisodeProps = {
    episode: TvDetailsResponse['content']['last_episode_to_air'];
};

const LastEpisodeCard: React.FC<LastEpisodeProps> = ({ episode }) => {
    const imageUrl = episode.still_path
        ? `https://image.tmdb.org/t/p/w780${episode.still_path}`
        : null;

    return (
        <div className="bg-zinc-900 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row gap-4 p-6">
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={`Imagen del episodio ${episode.name}`}
                    className="w-full md:w-1/3 object-cover rounded-lg"
                />
            )}
            <div className="flex flex-col justify-between text-white w-full">
                <div>
                    <h2 className="text-xl font-bold mb-2">{episode.name}</h2>
                    <p className="text-sm text-gray-400 mb-2">
                        Temporada {episode.season_number}, Episodio {episode.episode_number}
                    </p>
                    <p className="text-sm mb-4">{episode.overview || "Sin sinopsis disponible."}</p>
                </div>
                <div className="text-sm text-gray-300 mt-auto">
                    <p><strong>Emitido el:</strong> {episode.air_date}</p>
                    <p><strong>Duración:</strong> {episode.runtime} min</p>
                    <p><strong>Puntaje:</strong> {episode.vote_average} ({episode.vote_count} votos)</p>
                </div>
            </div>
        </div>
    );
};

export default LastEpisodeCard;