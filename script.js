'use strict';
document.documentElement.classList.add('js');
const nav=document.querySelector('#nav');
const menuButton=document.querySelector('.menu-toggle');
function closeMenu(){nav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.querySelector('span').textContent='+';}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.querySelector('span').textContent=open?'−':'+';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){closeMenu();menuButton.focus();}});
const careButtons=[...document.querySelectorAll('[data-care]')];
const carePanels=[...document.querySelectorAll('[data-panel]')];
function showCare(key){careButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.care===key)));carePanels.forEach(p=>{p.hidden=p.dataset.panel!==key;});}
careButtons.forEach(b=>b.addEventListener('click',()=>{showCare(b.dataset.care);document.querySelector('#care-details').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}));
showCare('routine');
const form=document.querySelector('#hello-form');
const result=document.querySelector('#form-result');
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#service').value=link.dataset.service;result.hidden=true;}));
form.addEventListener('input',()=>{result.hidden=true;});
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);result.replaceChildren();const heading=document.createElement('strong');heading.textContent='Your hello is ready to preview.';const summary=document.createElement('p');summary.textContent=`${String(data.get('name')).trim()} — ${data.get('service')} in ${String(data.get('suburb')).trim()}.`;const email=document.createElement('p');email.textContent=`Reply to: ${data.get('email')}`;result.append(heading,summary,email);const message=String(data.get('message')).trim();if(message){const p=document.createElement('p');p.textContent=message;result.append(p);}const note=document.createElement('p');note.textContent='This is a design preview. Nothing has been sent or saved.';note.style.marginTop='12px';result.append(note);result.hidden=false;result.focus();});
document.querySelector('#year').textContent=String(new Date().getFullYear());
