import Head from "next/head";
import FavoritesPage from "@/components/FavoritesPage";

export default function Favorites() {
  return (
    <>
      <Head>
        <title>My Favorites</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FavoritesPage />
    </>
  );
}
