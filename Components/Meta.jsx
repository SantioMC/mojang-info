import Head from "next/head";

export default function Meta({title = "Mojang Info", ogTitle = "Mojang Info", description = "View Mojang information on any account"}) {
    return (
        <Head>
            <meta property="og:url" content="mojang.santio.me" />
            <meta property="og:type" content="website" />
            <meta property="theme-color" content="#446BDD" />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:author" content="mojang.santio.me" />
            <meta
                name="og:description"
                content={description}
            />
            <title>{title}</title>
        </Head>
    )
}
