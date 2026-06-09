import { useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from './FeedbackForm';
import defaultPhoto from "../../assets/images/default.webp"

const Feedback = ({ reviews = [], totalRating = 0 }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div>
      {/* Reviews List */}
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All Reviews ({totalRating})
        </h4>

        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between gap-5 mb-[30px] border-b border-solid border-[#e0e0e0] pb-5"
            >
              <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={review?.user?.photo || defaultPhoto}
                    alt={review?.user?.name || 'User'}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div>
                  <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                    {review?.user?.name || 'Anonymous'}
                  </h5>
                  <p className="text-[14px] leading-6 text-textColor">
                    {formatDate(review?.createdAt)}
                  </p>
                  <p className="text__para mt-3 font-medium text-[15px]">
                    {review.reviewText}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mt-2 sm:mt-0">
                {[...Array(review?.rating || 0).keys()].map((_, i) => (
                  <AiFillStar key={i} color="#0067ff" />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-textColor text-[15px]">No reviews yet.</p>
        )}
      </div>

      {/* Feedback Button / Form */}
      {!showFeedbackForm ? (
        <div className="text-center">
          <button
            className="btn"
            onClick={() => setShowFeedbackForm(true)}
          >
            Give Feedback
          </button>
        </div>
      ) : (
        <FeedbackForm />
      )}
    </div>
  );
};

export default Feedback;
