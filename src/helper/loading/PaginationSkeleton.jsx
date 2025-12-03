import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PaginationSkeleton({ count = 5 }) {
  return (
    <div className="flex gap-2 justify-center p-4">
      {/* Previous button */}
      <Skeleton circle width={32} height={32} />

      {/* Page numbers */}
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} circle width={32} height={32} />
      ))}

      {/* Next button */}
      <Skeleton circle width={32} height={32} />
    </div>
  );
}

export default PaginationSkeleton;
