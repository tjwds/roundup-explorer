import React, { useState, useEffect } from 'react';

import './App.css'

const renderTags = (tagList) => {
  const tags = tagList.split(' ').filter(x => x !== 'roundup').join(', ');
  return tags.length ? <p className="article-tags">filed under: {tags}</p> : undefined;
}

function App({ timeAgo }) {
  const [data, setData] = useState({ articles: [] });

  useEffect(async () => {
    const res = await fetch('./api/recent');
    const json = await res.json()
    setData({articles: json})
  }, [])
  return (
    <div>
      <h1 className="title">the article roundup</h1>
      <a href="https://notes.joewoods.dev/roundup/" className="outLink">…or check out the roundup articles instead →</a>
      <div className="app">
        {data.articles.map(item => (
          <div className="article" key={item.hash}>
            <p className="article-title"><a href={item.href}>{item.description}</a></p>
            { item.extended && <p>{item.extended}</p> }
            { renderTags(item.tags) }
            { <p className="article-time">saved {timeAgo.format(new Date(item.time))}</p> }
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
