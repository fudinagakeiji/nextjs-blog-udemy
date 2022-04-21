import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from '../components/Layout'

import Link from 'next/link'
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post"

// SSGの場合(mdファイルをプリレンダリングする　)　非同期で取得する。getStaticPropsはNext.jsが準備している外部から一度取得する関数。
export async function getStaticProps(){
  // lib/postからｍｄデータを取得する関数を入れる。
  const allPostsData = getPostsData(); 
  console.log(allPostsData);
  // allPostsDataをpropsとして渡す。
  return {
    props: {
      allPostsData,
    },
  };
}

// allPostsDataをpropsとして受け取る。
export default function Home({ allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          私はフロントエンドエンジニアになりたてほやほやです。
        </p>
      </section>
      <section>
        <h2>📕エンジニアブログ</h2>
        <div className={styles.grid}>
          {/* map関数でallpostdataを展開していく。 */}
          {allPostsData.map(({id,title,date,thumbnail}) => (
            // keyを与えることでarticleを一意のものにしてエラーを吐かせないようにする。
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img 
                src={`${thumbnail}`}
                className={styles.thumbnailImage}/>
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br/>
              <small className={utilStyle.lightText}>{date}</small>
            </article>    
          ))}
          
        </div>
      </section>
    </Layout>
  );
}
