import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.css";

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

export default function Home() {
    return (
        <>
            <Head>
                <title>Phaser Nextjs Template</title>
                <meta name="description" content="A Phaser 3 Next.js project template that demonstrates Next.js with React communication and uses Vite for bundling." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@900&display=swap" />
            </Head>
            <main className={styles.main}>
                <AppWithoutSSR />
            </main>
        </>
    );
}