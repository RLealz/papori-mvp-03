import Head from 'next/head'
import ChatInterface from '../components/ChatInterface'

export default function Home() {
  return (
    <>
      <Head>
        <title>Papori - A Duende Mágica do Natal</title>
        <meta name="description" content="Conversa com a Papori, a duende mais fixe do Pólo Norte!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        <ChatInterface />
      </main>
    </>
  )
}