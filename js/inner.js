const MIXCLOUD_USER='FlorianMallet';
async function getShows(limit=7){const response=await fetch(`https://api.mixcloud.com/${MIXCLOUD_USER}/cloudcasts/?limit=${limit}`);if(!response.ok)throw new Error('Mixcloud');return (await response.json()).data||[]}
function cover(show,size='large'){return show?.pictures?.[size]||show?.pictures?.medium||''}
function embed(key){return `https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&feed=${encodeURIComponent(key)}`}
async function buildListen(){const host=document.querySelector('[data-listen-page]');if(!host)return;try{const shows=await getShows(7);const latest=shows[0];document.querySelector('[data-latest-cover]').style.backgroundImage=`url('${cover(latest,'extra_large')}')`;document.querySelector('[data-latest-title]').textContent=latest.name;document.querySelector('[data-latest-link]').href=latest.url;document.querySelector('[data-player]').src=embed(latest.key);const archive=document.querySelector('[data-episodes]');archive.innerHTML=shows.slice(1).map((show,index)=>`<article class="card panel"><div class="episode-cover" style="background-image:url('${cover(show)}')"></div><div class="episode-copy"><span class="number">ARCHIVE 0${index+1}</span><h3>${show.name}</h3><a class="btn" href="${show.url}" target="_blank" rel="noreferrer">OUVRIR</a></div></article>`).join('')}catch(e){document.querySelector('[data-listen-status]').textContent='MIXCLOUD TEMPORAIREMENT INDISPONIBLE'}}
buildListen();
if (!window.__esAnalyticsLoaded) {
  window.__esAnalyticsLoaded = true;
  var analyticsScript = document.createElement('script');
  analyticsScript.src = new URL('analytics.js', document.currentScript.src).href;
  document.head.appendChild(analyticsScript);
}
