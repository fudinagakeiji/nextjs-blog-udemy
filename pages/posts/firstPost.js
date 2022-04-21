import Head from "next/head";
import Link from "next/link";

export default function firstPost() {
  return (
    <div>
      <Head>
        <title>初投稿</title>
      </Head>
        <h1>これが最初の投稿です。</h1>
        <Link href="/">ホームへ戻るよ</Link>
    </div>
  );
}