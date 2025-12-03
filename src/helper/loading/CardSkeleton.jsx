import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CardSkeleton({ count = 6 }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 h-[564.8px] overflow-y-auto p-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-64 p-4 rounded-md shadow-md bg-white flex flex-col items-center gap-3"
        >
          {/* Image placeholder */}
          <Skeleton circle width={80} height={80} />

          {/* Name placeholder */}
          <Skeleton width={120} height={20} />

          {/* Details placeholder */}
          <Skeleton width={180} height={15} />

          {/* Delete button placeholder */}
          <Skeleton width={60} height={25} />
        </div>
      ))}
    </div>
  );
}

export default CardSkeleton;
