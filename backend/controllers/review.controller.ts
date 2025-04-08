import { Request, Response } from 'express';
import { Review } from '../types/review.type'
import { reviews, getNextReviewId } from '../data/memory'; 




export const createUserReview = (req: Request, res: Response): void => {
    const {
      author,
      content,
      show_type,
      show_id,
      "author_details.name": name,
      "author_details.username": username,
      "author_details.avatar_path": avatar_path,
      "author_details.rating": rating,
    } = req.body;
  
    const now = new Date().toISOString();
  
    const newReview: Review = {
      id: getNextReviewId(),
      show_type,
      show_id,
      author,
      content,
      created_at: now,
      updated_at: now,
      author_details: {
        name,
        username,
        avatar_path: null,
        rating: rating ? Number(rating) : null,
      },
      url: undefined,
    };
  
    reviews.push(newReview);
    res.status(201).json({ message: "Review agregada", review: newReview });
  };

export const getAllReviews = async (req: Request, res: Response): Promise<void> => {
    if (!reviews.length) {
        res.status(404).json({ success: false, message: "No hay reviews" });
        return;
    }
    res.status(200).json({ reviews });
};

export const getOneReviews = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const review = reviews.find((review) => review.id === Number(id));
    if (!review) {
        res.status(404).json({ success: false, message: "No se ha encontrado la review" });
        return;
    }
    res.status(200).json({ review });
}
export const updateUserReview = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const {
        author,
        content,
        "author_details.name": name,
        "author_details.username": username,
        "author_details.rating": rating,
      } = req.body;
    const reviewToUpdate = reviews.find((review) => review.id === Number(id));
    if (!reviewToUpdate) {
        res.status(404).json({ success: false, message: "No se ha encontrado la review" });
        return;
    }
    const updatedReview: Review = {
        ...reviewToUpdate,
        author,
        content,
        updated_at: new Date().toISOString(),
        author_details: {
            ...reviewToUpdate.author_details,
            name,
            username,
            rating: rating ? Number(rating) : null,
        }
    }
    reviews[reviews.indexOf(reviewToUpdate)] = updatedReview;
    res.status(200).json({ message: "Review actualizada", review: updatedReview });

};
export const deleteUserReview = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const reviewToDelete = reviews.find((review) => review.id === Number(id));
    if (!reviewToDelete) {
        res.status(404).json({ success: false, message: "No se ha encontrado la review" });
        return;
    }
    reviews.splice(reviews.indexOf(reviewToDelete), 1);
    res.status(200).json({ message: "Review eliminada", review: reviewToDelete });
};