'use client'

import { useState } from 'react'

const demoChats = [
  { name: 'New conversation', preview: 'Start a new direct chat', time: '' },
  { name: 'Zap Support', preview: 'Welcome to Zap', time: 'Now' },
]

export default function Home() {
  const [name, setName] = useState('')
  const [created, setCreated] = useState(false)
  const [id] = useState(() => `ZP-${Math.floor(100000 + Math.random() * 900000)}`)
  const [tab, setTab] = useState<'chats'|'contacts'|'profile'>('chats')

  if (!created) return <main className="shell"><section className="card"><div className="logo">zap</div><h1>Chat without the hassle.</h1><p className="muted">Create your Zap profile instantly. No email verification required.</p><label className="field"><span>Display name</span><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" maxLength={40}/></label><button className="primary" disabled={!name.trim()} onClick={()=>setCreated(true)}>Continue</button></section></main>

  return <main className="mobileApp"><header className="appHeader"><div><div className="logo small">zap</div><div className="muted">{tab==='chats'?'Chats':tab==='contacts'?'Contacts':'Profile'}</div></div><button className="iconButton" aria-label="Search">⌕</button></header>{tab==='chats'&&<><div className="searchBar">Search chats</div><section className="chatList">{demoChats.map((chat,i)=><button className="chatRow" key={i} onClick={()=>chat.name==='New conversation'&&alert('Share a Zap ID or direct link to start a chat.')}><div className="avatar">{chat.name[0]}</div><div className="chatInfo"><strong>{chat.name}</strong><span>{chat.preview}</span></div><time>{chat.time}</time></button>)}</section></>}{tab==='contacts'&&<section className="panel"><h2>Find someone</h2><p className="muted">Search using a Zap ID to open a direct chat.</p><input className="wideInput" placeholder="ZP-123456"/><button className="primary">Open direct chat</button></section>}{tab==='profile'&&<section className="panel profilePanel"><div className="bigAvatar">{name[0]?.toUpperCase()}</div><h2>{name}</h2><p className="muted">Your Zap ID</p><div className="idBox">{id}</div><p className="muted">Share your profile link to let someone start a direct chat.</p><div className="idBox">zap.app/u/{id}</div></section>}<nav className="bottomNav"><button className={tab==='chats'?'active':''} onClick={()=>setTab('chats')}>Chats</button><button className={tab==='contacts'?'active':''} onClick={()=>setTab('contacts')}>Contacts</button><button className={tab==='profile'?'active':''} onClick={()=>setTab('profile')}>Profile</button></nav></main>
}
