import Layout from '../../components/layout';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

// gets all valid values for id (runs once for all)
// runs first
export async function getStaticPaths() {
    // return a list of possible value for id
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    };
}

// gets static props for each page (runs once for each)
// runs second on every element returned by getStaticPaths
export async function getStaticProps({ params }) {
    // fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    };
}


// generates each page
// runs third (last) for every element with props which come from getStaticProps
export default function Post({ postData }) {
    return (
        <Layout>
            {/* set head */}
            <Head>
                <title>{postData.title}</title>
            </Head>
            {/* display page content */}
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}
