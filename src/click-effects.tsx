import { useEffect } from 'react';

/** Decorative click sparks; no cursor tracking, text interception, or touch delay. */
export function ClickEffects({enabled}:{enabled:boolean}) {
 useEffect(()=>{
  if(!enabled)return;
  const active=new Set<HTMLElement>();
  const timers=new Set<ReturnType<typeof setTimeout>>();
  const onPointer=(event:PointerEvent)=>{
   if(event.button!==0||event.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   const node=document.createElement('span');
   node.className='cursor-spark';node.setAttribute('aria-hidden','true');
   node.style.left=event.clientX+'px';node.style.top=event.clientY+'px';
   for(let i=0;i<8;i++){
    const bit=document.createElement('i');
    const angle=i*Math.PI/4;
    bit.style.setProperty('--spark-x',Math.round(Math.cos(angle)*26)+'px');
    bit.style.setProperty('--spark-y',Math.round(Math.sin(angle)*26)+'px');
    node.appendChild(bit);
   }
   document.body.appendChild(node);active.add(node);
   const timer=setTimeout(()=>{node.remove();active.delete(node);timers.delete(timer)},650);timers.add(timer);
  };
  document.addEventListener('pointerdown',onPointer,{passive:true});
  return()=>{document.removeEventListener('pointerdown',onPointer);active.forEach(node=>node.remove());timers.forEach(clearTimeout)};
 },[enabled]);
 return null;
}
