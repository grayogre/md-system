import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h2>メニュー</h2>
      <Link href="/weapon/list">武器エディタ</Link>
    </main>
  )
}
