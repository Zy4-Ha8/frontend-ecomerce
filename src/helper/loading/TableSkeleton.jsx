import Skeleton from "react-loading-skeleton";

export default function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default rounded-md h-[564.8px] flex flex-col justify-between">
      <table className="w-full text-sm text-center rtl:text-right text-body">
        <thead className="bg-neutral-secondary-soft border-b border-default">
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="px-6 py-3 font-medium bg-[#3a5b2216]">
                <Skeleton width={80} height={20} />
              </th>
            ))}
            <th className="px-6 py-3 font-medium bg-[#3a5b2216]">
              <Skeleton width={60} height={20} />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr
              key={r}
              className="odd:bg-neutral-primary even:bg-[#3a5b2216] border-b border-default"
            >
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c} className="px-6 py-4">
                  <Skeleton height={20} />
                </td>
              ))}
              <td className="px-6 py-4">
                <Skeleton circle width={24} height={24} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
