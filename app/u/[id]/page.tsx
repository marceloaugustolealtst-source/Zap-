'use client'

import { useState } from 'react'

type Props = { params: Promise<{ id: string }> }

export default function DirectChat({ params }: Props) {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<{text:string;out:boolean}[]>([
    { text: 'Hi 👋', out: false },
    { text: 'Hey, nice to meet you.', out: true }
  ])
  const [id] = useState('Zap user')
  const send = () => {
    if (!text.trim()) return
    setMessages(current => [...current, { text: text.trim(), out: true }])
    setText('')
  }
  return <main className="shell"><section className="chat"><header className="chatHead"><div className="avatar">Z</div><div><strong>{id}</strong><div className="muted">Direct chat</div></div></header><div className="messages">{messages.map((m,i)=><div key={i} className={`bubble ${m.out ? 'outgoing' : 'incoming'}`}>{m.text}</div>)}</div><div className="composer"><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Message"/><button className="send" onClick={send}>Send</button></div></section></main>
}
