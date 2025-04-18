import React from "react";
import { Review } from "../../../../shared/types";

type ReviewCardProps = {
    review: Review;
};

const ApiExternalReview: React.FC<ReviewCardProps> = ({ review }) => {
    const {
        author,
        author_details,
        created_at,
        content,
    } = review;

    return (
        <div className="flex flex-col mb-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-semibold">
                        {author ?? "Autor desconocido"}
                    </h2>
                    <h3 className="text-l font-light">
                        @{author_details?.username ?? "sin_usuario"}
                    </h3>
                    <h4 className="text-sm font-extralight">
                        {created_at?.slice(0, 10) ?? "sin fecha"}
                    </h4>
                </div>
                <span className="text-2xl font-bold bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                    {author_details?.rating == null ? "-" : author_details.rating}
                </span>
            </div>
            <p className="text-sm">
                {content.length > 1200 ? content.slice(0, 1200) + "..." : content}
            </p>
        </div>
    );
};

export default ApiExternalReview;
