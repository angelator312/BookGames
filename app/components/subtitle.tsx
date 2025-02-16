export default function SubTitle({ title = "Моите книги" }: { title?: string }) {
  return (
    <h2 className="my-5 text-slate-500 font-medium centered text-bold">{title}</h2>
  );
}
