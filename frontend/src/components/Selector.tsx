import { useContentType } from '../hooks/useContentType' // Ajustá según tu estructura
import { useNavigate } from 'react-router-dom'

const Selector = () => {
    const navigate = useNavigate();
    const contentType = useContentType();

    const baseClass = 'w-full sm:w-auto px-3 py-1 rounded text-center transition-all hover:scale-105 hover:shadow-2xl';
    const activeClass = 'bg-green-500 text-white hover:bg-green-400';
    const inactiveClass = 'text-gray-300 hover:text-white';

    return (
        <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full sm:w-auto">
            <li>
                <button
                    onClick={() => navigate('/movie')}
                    className={`${baseClass} ${contentType === 'movie' ? activeClass : inactiveClass}`}
                >
                    Películas
                </button>
            </li>
            <li>
                <button
                    onClick={() => navigate('/tv')}
                    className={`${baseClass} ${contentType === 'tv' ? activeClass : inactiveClass}`}
                >
                    Series
                </button>
            </li>
        </ul>
    );
};

export default Selector;