const boot=document.querySelector('[data-boot]');
const bootText=document.querySelector('[data-boot-text]');
const shell=document.querySelector('.shell');
const steps=['INITIALISATION DU SIGNAL…','FRÉQUENCE DÉTECTÉE','ELECTRONIC SHOW'];
let step=0;
const bootTimer=setInterval(()=>{step+=1;if(step<steps.length){bootText.textContent=steps[step];return}clearInterval(bootTimer);boot.classList.add('is-hidden');shell.classList.add('is-ready');sessionStorage.setItem('es-v9-booted','1')},620);
if(sessionStorage.getItem('es-v9-booted')){clearInterval(bootTimer);boot.classList.add('is-hidden');shell.classList.add('is-ready')}

const translations={
  fr:{listen:'ÉCOUTER',listenDetail:'MIXES & ARCHIVES',productions:'PRODUCTIONS',universe:'UNIVERS',universeDetail:'HISTOIRE • INSIDE • SIGNAL',collaborate:'COLLABORER',collaborateDetail:'RADIOS • MARQUES • PROS',instruction:'SÉLECTIONNEZ UN TERMINAL POUR CONTINUER'},
  en:{listen:'LISTEN',listenDetail:'MIXES & ARCHIVES',productions:'PRODUCTIONS',universe:'UNIVERSE',universeDetail:'STORY • INSIDE • SIGNAL',collaborate:'COLLABORATE',collaborateDetail:'RADIO • BRANDS • PROS',instruction:'SELECT A TERMINAL TO CONTINUE'}
};
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{const lang=button.dataset.lang;document.documentElement.lang=lang;document.querySelectorAll('[data-lang]').forEach(item=>item.classList.toggle('is-active',item===button));document.querySelectorAll('[data-copy]').forEach(node=>node.textContent=translations[lang][node.dataset.copy])}));

async function loadLatest(){
  try{
    const response=await fetch('https://api.mixcloud.com/FlorianMallet/cloudcasts/?limit=1');
    if(!response.ok)throw new Error('Mixcloud unavailable');
    const payload=await response.json();
    const latest=payload.data?.[0];
    if(!latest)return;
    document.querySelector('[data-latest-name]').textContent=latest.name.replace(/FLORIAN MALLET\s*[-–—]\s*/i,'');
    const cover=latest.pictures?.large||latest.pictures?.medium;
    if(cover)document.querySelector('[data-latest-cover]').style.backgroundImage=`url("${cover}")`;
    const next=new Date(latest.created_time);next.setDate(next.getDate()+14);
    document.querySelector('[data-next-date]').textContent=new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(next);
  }catch(error){document.querySelector('[data-next-date]').textContent='TOUS LES 15 JOURS'}
}
loadLatest();
if (!window.__esAnalyticsLoaded) {
  window.__esAnalyticsLoaded = true;
  var analyticsScript = document.createElement('script');
  analyticsScript.src = new URL('analytics.js', document.currentScript.src).href;
  document.head.appendChild(analyticsScript);
}
