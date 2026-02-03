import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { BASE_URL, token } from '../../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleSubmitReview = async e => {
    e.preventDefault();
    if (!rating || !reviewText.trim()) {
      return toast.error('Rating & Review fields are required');
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(result.message);
      setRating(0);
      setHover(0);
      setReviewText('');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitReview} className="mt-6 space-y-6">
      <div>
        <h3 className="text-headingColor text-[15px] leading-6 font-semibold mb-2">
          How would you rate the overall experience?
        </h3>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(index => (
            <button
              key={index}
              type="button"
              className={`text-[22px] cursor-pointer ${
                index <= (hover || rating) ? 'text-yellowColor' : 'text-gray-400'
              } bg-transparent border-none outline-none`}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <AiFillStar />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-headingColor text-[15px] leading-6 font-semibold mb-2">
          Share your feedback or suggestions
        </h3>
        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-3 py-3 rounded-md"
          rows={5}
          placeholder="Your Review"
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? <HashLoader size={25} color="#fff" /> : 'Submit Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;
