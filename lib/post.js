// pathを取得するモジュール
import path from "path";
import fs from "fs";
// mdファイルのメタデータを取得するモジュール
import matter from "gray-matter";
// ただの文字列としてではなくｍarkDown形式として受け取ることができる。
import {remarkHtml} from "remark-html";
import html  from "remark-html";
import { remark } from "remark";
// 今いるディレクトリのpostsフォルダから値を取得している。
const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す。
export function getPostsData(){
  // これでファイル名を配列として取り出している。
  const fileNames = fs.readdirSync(postsDirectory);
  // ファイル名をmapで一つ一つ取り出す関数を作る。
  const allPostsData = fileNames.map((fileName)=> {
    // ファイル名の拡張子を第二引数のから文字で置き換えることでファイル名だけを取り出している。ファイル名(id)
    const id = fileName.replace(/\.md$/, "");
      
    // マークダウンファイルを文字列として読み取る。
    const fullPath = path.join(postsDirectory, fileName);
    // これでファイルの中身を見ることができる。
    const fileContent = fs.readFileSync(fullPath, "utf8");
    // メタデータを取得する。
    const matterResult =matter(fileContent);

    // idとデータを返す。オブジェクトで取得して出力する。　
    return{
      id,
      ...matterResult.data
    };
  });
  return allPostsData;
}

// getStaticPathでreturnで使うpathを取得する。
export function getAllPostIds(){
  //↑これでファイル名を配列として取り出している。
  const fileNames = fs.readdirSync(postsDirectory);
  //↑ファイル名をmapで一つ一つ取り出す関数を作る。
  return fileNames.map((fileName)=> {
    return {
      params: {
        // ファイル名だけを取り出している。
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// idに基づいてブログ投稿データを返す。
export async function getPostData (id) {
  // ↑マークダウンファイルを文字列として読み取る。
  const fullPath = path.join(postsDirectory, `${id}.md`);
  // ↑これでファイルの中身を見ることができる。
  const fileContent = fs.readFileSync(fullPath, "utf8");
  // ↑メタデータを取得する。
  const matterResult =matter(fileContent);

  const blogContent = await remark().use(html).process(matterResult.content);
 
  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  };
}