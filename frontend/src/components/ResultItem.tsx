import { useContentType } from '../context/ContentTypeContext.tsx'

const ResultItem = ({ result }: any) => {
    const { selected } = useContentType()

    return (
        <div className="bg-white text-black p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold">{selected == 'movie' ? result?.title : result?.name}</h2>
            <p className="text-sm mt-2">{result?.overview}</p>
        </div>
    )
}

export default ResultItem