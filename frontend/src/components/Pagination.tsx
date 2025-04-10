import React from 'react'

const Pagination = ({ currentPage, setCurrentPage, totalPages }: any) => {
    const prev = () => currentPage > 1 && setCurrentPage(currentPage - 1)
    const next = () => setCurrentPage(currentPage + 1)

    return (
        <div className="flex justify-center mt-6 space-x-2">
            <button
                onClick={prev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100 disabled:opacity-50"
            >
                Anterior
            </button>

            <span className="px-4 py-2 bg-blue-700 rounded">
                Página {currentPage} de {totalPages}
            </span>

            <button
                onClick={next}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100 disabled:opacity-50"
            >
                Siguiente
            </button>
        </div>
    )
}

export default Pagination