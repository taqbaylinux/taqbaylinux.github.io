/* Rendering + interaction logic. Content lives in data.js — you shouldn't
   need to touch this file to add commands or sections. */
(function(){
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var grid = document.getElementById("grid");

  /* ---------- petits utilitaires de rendu ---------- */
  function el(tag, cls, txt){
    var n = document.createElement(tag);
    if(cls) n.className = cls;
    if(txt !== undefined) n.textContent = txt;
    return n;
  }
  // paragraphe avec gestion du `code` entre backticks
  function richP(text, cls){
    var p = el("p", cls || "");
    var parts = text.split("`");
    for(var i=0;i<parts.length;i++){
      if(i % 2 === 1){ p.appendChild(el("code","",parts[i])); }
      else if(parts[i]) { p.appendChild(document.createTextNode(parts[i])); }
    }
    return p;
  }
  function pad(n){ return (n<10?"0":"")+n; }

  /* ---------- construction des cartes ---------- */
  var cmdCount = 0, filterableCount = 0;

  DATA.sections.forEach(function(sec, idx){
    var card = el("article","card reveal");
    var head = el("div","card-head");
    head.appendChild(el("span","num",pad(idx+1)));
    var ttl = el("div");
    ttl.appendChild(el("h2","",sec.kab));
    ttl.appendChild(el("span","en",sec.en));
    head.appendChild(ttl);
    card.appendChild(head);

    var hasFilterable = false;
    var cmdList = null, ioList = null;

    sec.blocks.forEach(function(b){
      if(b.t === "cmd"){
        if(!cmdList){ cmdList = el("ul","cmds"); card.appendChild(cmdList); }
        var li = el("li");
        var desc = el("span","desc",b.k);
        var dots = el("span","dots"); dots.setAttribute("aria-hidden","true");
        var btn  = el("button","cmd",b.c); btn.type="button"; btn.dataset.cmd=b.c;
        li.appendChild(desc); li.appendChild(dots); li.appendChild(btn);
        li.classList.add("row");
        li.dataset.search = (b.k+" "+b.c).toLowerCase();
        li.dataset.desc = b.k; li.dataset.cmdv = b.c;
        cmdList.appendChild(li);
        cmdCount++; filterableCount++; hasFilterable = true;

      } else if(b.t === "io"){
        if(!ioList){ ioList = el("ul","io"); card.appendChild(ioList); }
        var li2 = el("li");
        var badge = el("code","stream",b.c);
        var ptxt  = el("p","",b.k);
        li2.appendChild(badge); li2.appendChild(ptxt);
        li2.classList.add("row");
        li2.dataset.search = (b.k+" "+b.c).toLowerCase();
        li2.dataset.desc = b.k; li2.dataset.cmdv = b.c;
        ioList.appendChild(li2);
        filterableCount++; hasFilterable = true;

      } else if(b.t === "note"){
        var note = el("div","note");
        note.appendChild(el("b","","Tazmilt"));
        note.appendChild(document.createTextNode(" — "+b.k));
        card.appendChild(note);

      } else if(b.t === "p"){
        card.appendChild(richP(b.k));

      } else if(b.t === "lead"){
        card.appendChild(richP(b.k,"lead"));

      } else if(b.t === "tip"){
        card.appendChild(richP(b.k,"tip"));

      } else if(b.t === "term"){
        var term = el("div","term");
        var bar  = el("div","term-bar");
        bar.appendChild(el("i"));bar.appendChild(el("i"));bar.appendChild(el("i"));
        bar.appendChild(el("span","",b.title||"terminal"));
        term.appendChild(bar);
        var body = el("div","term-body");
        b.lines.forEach(function(ln,li3){
          if(li3>0) body.appendChild(document.createElement("br"));
          if(ln.cmd !== undefined){
            var pr = el("span","prompt",DATA.meta.prompt+" ");
            body.appendChild(pr);
            body.appendChild(document.createTextNode(ln.cmd));
          } else if(ln.out !== undefined){
            body.appendChild(el("span","out",ln.out));
          }
        });
        // curseur clignotant si la dernière ligne est une commande
        if(b.lines.length && b.lines[b.lines.length-1].cmd !== undefined){
          var cur = el("span","cursor"); cur.setAttribute("aria-hidden","true");
          body.appendChild(cur);
        }
        term.appendChild(body);
        card.appendChild(term);
      }
    });

    if(!hasFilterable){ card.dataset.noFilter = "1"; }
    grid.appendChild(card);
  });

  /* ---------- compteurs, pied de page, masthead ---------- */
  var chips = document.getElementById("metaChips");
  [
    ["b",String(cmdCount)," n tludna"],
    ["b",String(DATA.sections.length)," n tgezmiwin"],
    ["",  "A4 · Yettwaheyya-PDF",""],
    ["","Amawal: ","<b>"+DATA.meta.lexicon+"</b>"]
  ].forEach(function(c){
    var chip = el("span","chip");
    if(c[0]==="b"){ chip.appendChild(el("b","",c[1])); chip.appendChild(document.createTextNode(c[2])); }
    else{ chip.appendChild(document.createTextNode(c[1])); if(c[2]){ var b=el("b"); b.innerHTML=c[2].replace(/<\/?b>/g,""); chip.appendChild(b);} }
    chips.appendChild(chip);
  });
  // corriger le chip Amawal (innerHTML brut)
  chips.lastChild.textContent="";
  chips.lastChild.appendChild(document.createTextNode("Amawal: "));
  chips.lastChild.appendChild(el("b","",DATA.meta.lexicon));

  document.getElementById("footBar").innerHTML =
    "<span><b>"+DATA.meta.title+"</b> · Taqbaylit</span>" +
    "<span>ⵣ · "+DATA.meta.authorFooter+" · "+DATA.meta.year+" · Amawal: "+DATA.meta.lexicon+"</span>";

  document.getElementById("promptText").textContent = DATA.meta.prompt;
  document.getElementById("titleText").textContent = DATA.meta.title;

  /* ---------- effet "décodage" du titre ---------- */
  var titleEl = document.getElementById("titleText");
  var FINAL = DATA.meta.title;
  if(!reduced){
    var GLYPHS="ⴰⴳⴷⴹⴽⵎⵏⵔⵜⵣⵖⵃ$#>/\\*";
    var frame=0,total=26;
    var t=setInterval(function(){
      frame++;var out="";
      for(var i=0;i<FINAL.length;i++){
        var ch=FINAL[i];
        if(ch===" "){out+=" ";continue;}
        out += (i < (frame/total)*FINAL.length*1.2) ? ch : GLYPHS[(Math.random()*GLYPHS.length)|0];
      }
      titleEl.textContent=out;
      if(frame>=total){titleEl.textContent=FINAL;clearInterval(t);}
    },40);
  }

  /* ---------- ligne tapée au clavier ---------- */
  var typeEl=document.getElementById("typeLine"), TYPE=DATA.meta.typeLine;
  if(!reduced){
    var ti=0, tt=setInterval(function(){ ti++; typeEl.textContent=TYPE.slice(0,ti); if(ti>=TYPE.length)clearInterval(tt); },55);
  } else { typeEl.textContent=TYPE; }

  /* ---------- apparition au défilement ---------- */
  var revealEls=document.querySelectorAll(".reveal");
  function showAll(){ revealEls.forEach(function(e){ e.classList.add("in"); }); }
  if(reduced || !("IntersectionObserver" in window)){ showAll(); }
  else{
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });
    },{threshold:.12});
    revealEls.forEach(function(e){ io.observe(e); });
  }
  window.addEventListener("beforeprint",showAll);

  /* ---------- copie au clic (délégation) ---------- */
  var toast=document.getElementById("toast"), toastMsg=document.getElementById("toastMsg"), toastTimer=null;
  function showToast(m){ toastMsg.textContent=m; toast.classList.add("show"); clearTimeout(toastTimer);
    toastTimer=setTimeout(function(){ toast.classList.remove("show"); },1800); }
  function fallbackCopy(x){ var ta=document.createElement("textarea"); ta.value=x; ta.style.position="fixed"; ta.style.opacity="0";
    document.body.appendChild(ta); ta.select(); try{document.execCommand("copy");}catch(e){} ta.remove(); }
  grid.addEventListener("click",function(ev){
    var btn=ev.target.closest(".cmd"); if(!btn) return;
    var t=btn.dataset.cmd;
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(t).catch(function(){ fallbackCopy(t); });
    } else { fallbackCopy(t); }
    btn.classList.add("copied"); setTimeout(function(){ btn.classList.remove("copied"); },1100);
    showToast("✓ Yettwanɣel : "+t);
  });

  /* ---------- recherche / filtre ---------- */
  var searchInput=document.getElementById("search"), matchCount=document.getElementById("matchCount");
  function paintMatch(node,text,q){
    node.textContent="";
    if(!q){ node.textContent=text; return; }
    var lower=text.toLowerCase(), ql=q.toLowerCase(), idx=0,pos;
    while((pos=lower.indexOf(ql,idx))!==-1){
      node.appendChild(document.createTextNode(text.slice(idx,pos)));
      var m=document.createElement("mark"); m.textContent=text.slice(pos,pos+q.length);
      node.appendChild(m); idx=pos+q.length;
    }
    node.appendChild(document.createTextNode(text.slice(idx)));
  }
  function applyFilter(){
    var q=searchInput.value.trim().toLowerCase(), visible=0;
    document.querySelectorAll("li.row").forEach(function(li){
      var hit=!q || li.dataset.search.indexOf(q)!==-1;
      li.classList.toggle("hidden",!hit);
      var desc=li.querySelector(".desc")||li.querySelector("p");
      var cmdv=li.querySelector(".cmd")||li.querySelector(".stream");
      if(desc) paintMatch(desc,li.dataset.desc,q);
      if(cmdv) paintMatch(cmdv,li.dataset.cmdv,q);
      if(hit && q) visible++;
    });
    document.querySelectorAll(".card").forEach(function(card){
      if(card.dataset.noFilter){ card.classList.remove("dim"); return; }
      var any=card.querySelectorAll("li.row:not(.hidden)").length;
      card.classList.toggle("dim", !!q && any===0);
    });
    matchCount.textContent = q ? (visible+" / "+filterableCount) : "";
  }
  searchInput.addEventListener("input",applyFilter);

  /* ---------- impression ---------- */
  document.getElementById("printBtn").addEventListener("click",function(){
    searchInput.value=""; applyFilter(); window.print();
  });
})();
