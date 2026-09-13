'use client'

import { useState } from 'react'

const themes = [
  {id:'telegram_blue',name:'Ocean Blue',bg:'#e8f2f8',accent:'#229ed9',bubble:'#d9fdd3'},
  {id:'midnight',name:'Midnight',bg:'#17212b',accent:'#2aabee',bubble:'#2b5278'},
  {id:'mint',name:'Mint',bg:'#edf8f3',accent:'#21a67a',bubble:'#d7f5e8'},
  {id:'sunset',name:'Sunset',bg:'#fff3ec',accent:'#f07845',bubble:'#ffe0d2'},
]

export default function Home() {
  const [name,setName]=useState('')
  const [created,setCreated]=useState(false)
  const [id]=useState(()=>`VC-${Math.floor(100000+Math.random()*900000)}`)
  const [tab,setTab]=useState<'chats'|'contacts'|'profile'|'settings'>('chats')
  const [theme,setTheme]=useState(themes[0])
  const [showThemes,setShowThemes]=useState(false)
  const [search,setSearch]=useState('')

  if(!created)return <main className="shell"><section className="card"><div className="logo">Viet Chat</div><h1>Private conversations, made simple.</h1><p className="muted">Create your profile and start chatting.</p><label className="field"><span>Display name</span><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" maxLength={40}/></label><button className="primary" disabled={!name.trim()} onClick={()=>setCreated(true)}>Continue</button></section></main>

  return <main className="mobileApp" style={{'--app-accent':theme.accent,'--chat-bg':theme.bg,'--bubble':theme.bubble} as React.CSSProperties}><header className="appHeader"><div><div className="logo small">Viet Chat</div><div className="muted">{tab==='chats'?'Chats':tab==='contacts'?'Contacts':tab==='profile'?'Profile':'Settings'}</div></div><button className="iconButton" onClick={()=>setSearch(v=>v?'':' ')} aria-label="Search">⌕</button></header>{search&&<input autoFocus className="searchBar" placeholder="Search chats, contacts and messages" onChange={e=>setSearch(e.target.value)}/>} {tab==='chats'&&<section className="chatList"><button className="chatRow" onClick={()=>alert('Open a chat from Contacts using a Viet Chat ID or direct link.')}><div className="avatar">+</div><div className="chatInfo"><strong>New conversation</strong><span>Start a direct chat</span></div></button><button className="chatRow"><div className="avatar">V</div><div className="chatInfo"><strong>Viet Chat</strong><span>Welcome to Viet Chat</span></div><time>Now</time></button></section>}{tab==='contacts'&&<section className="panel"><h2>Find someone</h2><p className="muted">Enter a Viet Chat ID to open a direct conversation.</p><input className="wideInput" placeholder="VC-123456"/><button className="primary" onClick={()=>alert('Enter a valid Viet Chat ID to open the conversation.')}>Open chat</button></section>}{tab==='profile'&&<section className="panel profilePanel"><div className="bigAvatar">{name[0]?.toUpperCase()}</div><h2>{name}</h2><p className="muted">Your Viet Chat ID</p><div className="idBox">{id}</div><p className="muted">Share this ID or your direct profile link.</p><div className="idBox">vietchat.app/u/{id}</div><button className="primary" onClick={()=>navigator.clipboard?.writeText(`vietchat.app/u/${id}`)}>Copy link</button></section>}{tab==='settings'&&<section className="panel"><h2>Appearance</h2><button className="settingRow" onClick={()=>setShowThemes(v=>!v)}>Chat themes <span>{theme.name} ›</span></button>{showThemes&&<div className="themeGrid">{themes.map(t=><button key={t.id} className="themeCard" style={{background:t.bg,borderColor:t.id===theme.id?t.accent:'#dfe4ee'}} onClick={()=>{setTheme(t);setShowThemes(false)}}><span style={{background:t.accent}}></span><strong>{t.name}</strong></button>)}</div>}<button className="settingRow" onClick={()=>alert('Notifications settings will be connected to device notifications.')}>Notifications <span>›</span></button><button className="settingRow" onClick={()=>alert('Privacy controls will be connected to your account.')}>Privacy <span>›</span></button></section>}<nav className="bottomNav"><button className={tab==='chats'?'active':''} onClick={()=>setTab('chats')}>Chats</button><button className={tab==='contacts'?'active':''} onClick={()=>setTab('contacts')}>Contacts</button><button className={tab==='profile'?'active':''} onClick={()=>setTab('profile')}>Profile</button><button className={tab==='settings'?'active':''} onClick={()=>setTab('settings')}>Settings</button></nav></main>
}
