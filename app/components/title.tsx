
export default function Title({ title = "Книги-игри" }: { title?: string }) {
  return (
    <h1 className="my-5 text-slate-500 font-medium logo f-book-c">
      {title}
    </h1>
  );
}