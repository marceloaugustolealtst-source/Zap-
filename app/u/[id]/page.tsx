'use client'

import { useState } from 'react'

export default function DirectChat({ params }: { params: { id: string } }) {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<{text:string;out:boolean}[]>([
    { text: 'Hi 👋', out: false },
    { text: 'Hey, nice to meet you.', out: true }
  ])
  const send = () => { if (!text.trim()) return; setMessages([...messages, {text:text.trim(),out:true}]); setText('') }
  return <main className="shell"><section className="chat"><header className="chatHead"><div className="avatar">Z</div><div><strong>Zap user</strong><div className="muted">{params.id}</div></div></header><div className="messages">{messages.map((m,i)=><div key={i} className={`bubble ${m.out ? 'outgoing' : 'incoming'}`}>{m.text}</div>)}</div><div className="composer"><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Message"/><button className="send" onClick={send}>Send</button></div></section></main>
}
