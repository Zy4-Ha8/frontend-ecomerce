import Card from "./Card";
import PublicCard from "./PublicCard";

export default function ProductsPreviewSection({ Title, Cards, Underline }) {
  const cardShow = Cards.map((card, index) => (
    <PublicCard key={index} {...card} />
  ));
  return (
    <div className={`${Underline ? "border-b border-b-black/20" : ""} p-6  flex flex-col justify-center items-center w-full `}>
      <h1 className="text-center text-2xl md:text-4xl font-extrabold py-6 ">{Title}</h1>
      <div className="flex justify-center items-center gap-4 flex-wrap">{cardShow}</div>
      <button className="border px-6 py-2 rounded-2xl bg-gray-50 ">View All</button>
    </div>
  );
}
