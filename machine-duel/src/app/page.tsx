import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <Link href="/register">プレイヤー登録</Link><br />
      <Link href="/login">ログイン</Link>
    </main>
  )
}
