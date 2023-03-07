import { FC } from "react";
import useFetchFruits from "@/api/useFetchFruits";
import { useRouter } from "next/router";

const HomePage: FC = () => {
  const { loading, fruits, page, count, lastPage } = useFetchFruits();
  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="bg-white rounded shadow mt-6">
        <header className="px-6 py-5">
          <div className="text-lg font-medium">All Fruits</div>
          <div className="text-sm">
            (Showing {count} items at page {page})
          </div>
        </header>
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="text-left border-y border-neutral-300">
              <th className="font-medium px-6 py-2">Name</th>
              <th className="font-medium px-3 py-2">Family</th>
              <th className="font-medium px-3 py-2">Genus</th>
              <th className="font-medium px-3 py-2">Order</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-neutral-400 font-medium px-6 py-5"
                >
                  Loading...
                </td>
              </tr>
            ) : (
              fruits?.map((fruit, index) => (
                <tr key={index} className="border-y border-neutral-300">
                  <td className="px-6 py-2">{fruit.name}</td>
                  <td className="px-3 py-2">{fruit.family}</td>
                  <td className="px-3 py-2">{fruit.genus}</td>
                  <td className="px-3 py-2">{fruit.order}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <footer className="flex items-center justify-between mt-4 px-6 py-5">
          <button
            className="font-medium text-neutral-600 hover:text-neutral-900 disabled:text-neutral-400 transition-all"
            disabled={page <= 1}
            onClick={() => {
              void router.push(`/?page=${Number(page) - 1}&count=${count}`);
            }}
          >
            {"<"} Prev
          </button>
          <button
            className="font-medium text-neutral-600 hover:text-neutral-900 disabled:text-neutral-400 transition-all"
            disabled={page >= lastPage}
            onClick={() => {
              void router.push(`/?page=${Number(page) + 1}&count=${count}`);
            }}
          >
            Next {">"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
