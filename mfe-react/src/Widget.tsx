

export default function Widget(props: { count: number; onAdd: () => void }) {
  return (
    <section className="mx-auto w-full max-w-xl rounded-xl border border-slate-200 bg-cyan-500 p-4 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-cyan-500 dark:text-slate-50">
      <h2 className="text-xl font-semibold">MicroFront Widget </h2>
      <h3 className="text-base ">React 19</h3>

      <p className="mt-2 text-sm text-blue-950 dark:text-blue-950">
        Items en carrito: <span className="font-semibold text-slate-900 dark:text-blue-950">{props.count}</span>
      </p>

      <button
        type="button"
        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
        onClick={props.onAdd}
      >
        Agregar item (desde React)
      </button>
    </section>
  );
}
