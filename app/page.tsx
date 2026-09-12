'use client'

import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [created, setCreated] = useState(false)
  const [id] = useState(() => `ZP-${Math.floor(100000 + Math.random() * 900000)}`)

  if (created) return <main className="shell"><section className="card"><div className="logo">zap</div><p className="muted">Your profile is ready.</p><div className="field"><strong>Your Zap ID</strong><input readOnly value={id}/></div><div className="link">zap.app/u/{id}</div><button className="primary" onClick={() => window.location.href = `/u/${id}`}>Open my chat</button></section></main>

  return <main className="shell"><section className="card"><div className="logo">zap</div><h1>Start chatting.</h1><p className="muted">Create your profile instantly. No email verification required.</p><label className="field"><span>Display name</span><input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" maxLength={40}/></label><button className="primary" disabled={!name.trim()} onClick={() => setCreated(true)}>Create my Zap</button></section></main>
}
