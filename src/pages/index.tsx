import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

export default function Home() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        if (typeof document !== 'undefined' && document.fonts) {
            document.fonts.ready.then(() => {
                setFontsLoaded(true);
            });
        } else {
            // Fallback if document.fonts is not supported
            setFontsLoaded(true);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Phaser Nextjs Template</title>
                <meta name="description" content="A Phaser 3 Next.js project template that demonstrates Next.js with React communication and uses Vite for bundling." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className={styles.main}>
                {fontsLoaded ? <AppWithoutSSR /> : <div>Loading fonts...</div>}
            </main>
        </>
    );
}
