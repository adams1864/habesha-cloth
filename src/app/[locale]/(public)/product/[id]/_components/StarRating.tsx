interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ rating, size = "md" }: StarRatingProps) {
  const fullStars = Math.floor(rating);

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div
      className="flex text-[#d6001c]"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {stars.map((starNumber) => (
        <svg
          key={`star-${starNumber}`}
          className={sizeClasses[size]}
          fill={starNumber <= fullStars ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          opacity={starNumber <= fullStars ? 1 : 0.3}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}
