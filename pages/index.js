import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome to my site!</p>
        <p>
          (you can build a site lik ethis by following <a href="https://nextjs.org/learn">Vercel's Next.js tutorial</a>)
        </p>
        <Link href="/posts/first-post">
          <a>View first post</a>
        </Link>
      </section>
    </Layout>
  )
}
