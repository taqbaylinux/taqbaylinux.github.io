/* ================================================================
   ZONE D'ÉDITION — c'est ICI que tout se modifie.
   ----------------------------------------------------------------
   ► Ajouter une commande : copiez une ligne { t:"cmd", … } dans la
     bonne section. La numérotation, les compteurs et la recherche
     se mettent à jour tout seuls.

   ► Ajouter une section : ajoutez un objet { kab, en, blocks:[…] }
     dans `sections`.

   ► Types de blocs disponibles dans `blocks` :
     { t:"cmd",  k:"description kabyle", c:"commande" }
     { t:"io",   k:"description", c:"stdin" }          (badge flux)
     { t:"note", k:"texte de la remarque" }
     { t:"p",    k:"paragraphe — le `code` entre backticks est géré" }
     { t:"lead", k:"ligne en gras" }
     { t:"tip",  k:"petit conseil en italique" }
     { t:"term", title:"titre", lines:[ {cmd:"…"} , {out:"…"} ] }
   ================================================================ */
const DATA = {
  meta:{
    title:"Tiferret n tludna n Linux",
    prompt:"aseqdac@linux:~$",
    typeLine:"man tiferret --taqbaylit",
    authorFooter:"Iulian Rotaru",
    lexicon:"Samiya n At Belɛid",
    year:2024
  },
  sections:[
    { kab:"Asefrek n yifuyla", en:"File management", blocks:[
      { t:"cmd", k:"Sbeggen agbur",                 c:"ls" },
      { t:"cmd", k:"Sbeggen akaram amiran",          c:"pwd" },
      { t:"cmd", k:"Snifel akaram",                  c:"cd" },
      { t:"cmd", k:"Nɣel",                           c:"cp" },
      { t:"cmd", k:"Smutti / Beddel isem",           c:"mv" },
      { t:"cmd", k:"Kkes",                           c:"rm" },
      { t:"cmd", k:"Snulfu-d akaram",                c:"mkdir" },
      { t:"cmd", k:"Snulfu-d afaylu",                c:"touch" }
    ]},
    { kab:"Taẓrigt n uḍris", en:"Text editing", blocks:[
      { t:"cmd", k:"Sbeggen afaylu n uḍris deg ixf (terminal)", c:"cat" },
      { t:"cmd", k:"Sbeggen s udrurem n izirigen",   c:"less" },
      { t:"cmd", k:"Sbeggen s udrurem n isebtar",    c:"more" },
      { t:"cmd", k:"Ẓreg afaylu n uḍris",            c:"nano" },
      { t:"cmd", k:"Amḍan n isekkilen, n wawalen d yizirigen", c:"wc" },
      { t:"cmd", k:"Nadi ɣef talɣa",                 c:"grep" }
    ]},
    { kab:"Ayen nniḍen", en:"Miscellaneous", blocks:[
      { t:"cmd", k:"Sbeggen deg ixf",                c:"echo" },
      { t:"cmd", k:"Selkem am useqdac afellay",      c:"sudo" },
      { t:"cmd", k:"Asefrek n ikalan",               c:"top" },
      { t:"cmd", k:"Ping i uqeddac",                 c:"ping" }
    ]},
    { kab:"Asefrek n iseɣẓanen (apt)", en:"Software management", blocks:[
      { t:"cmd", k:"Mucceḍ igadiren",                c:"apt update" },
      { t:"cmd", k:"Leqqem akk ihallen",             c:"apt upgrade" },
      { t:"cmd", k:"Nadi ɣef wahil",                 c:"apt search" },
      { t:"cmd", k:"Sbedd ahil",                     c:"apt install" },
      { t:"cmd", k:"Kkes ahil",                      c:"apt remove" },
      { t:"cmd", k:"Kkes aḍarâ ur ilaqen",           c:"apt autoremove" },
      { t:"cmd", k:"Ẓreg tabdart n yiɣbalen",        c:"apt edit-sources" },
      { t:"note", k:"Asefrek n yikemmusen apt yettwaseqdec deg distributions yebnan ɣef Debian." }
    ]},
    { kab:"Asefrek n iseɣẓanen (flatpak)", en:"Software management", blocks:[
      { t:"cmd", k:"Sbeggen remotes yettwasermden",  c:"flatpak remotes" },
      { t:"cmd", k:"Sermed remote",                  c:"flatpak remote-add" },
      { t:"cmd", k:"Ssens remote",                   c:"flatpak remote-delete" },
      { t:"cmd", k:"Leqqem akk ihallen n flatpak",   c:"flatpak update" },
      { t:"cmd", k:"Nadi ɣef wahil",                 c:"flatpak search" },
      { t:"cmd", k:"Nadi, sakin sbedd ahil",         c:"flatpak install" },
      { t:"cmd", k:"Kkes ahil",                      c:"flatpak uninstall" },
      { t:"cmd", k:"Selkem ahil n flatpak",          c:"flatpak run" }
    ]},
    { kab:"Isebtar n ufus", en:"Manual pages", blocks:[
      { t:"p", k:"Aṭas n ihallen n Linux i yesɛan asebter n ufus i d-yessegzayen acu i xeddmen d wamek i ten-yettwaseqdacen, ama d iɣewwaren neɣ d tixtiṛiyin i qeblen." },
      { t:"p", k:"Talɣut-a ad tt-tafeḍ s unezḍay `man`." },
      { t:"term", title:"manual", lines:[ { cmd:"man grep" } ] }
    ]},
    { kab:"Anekcum d tuffɣa", en:"Input and Output", blocks:[
      { t:"io", k:"Asuddem aslugan i unekcum n useqdac. S umata, d anekcum i d-yekkan seg unasiw.", c:"stdin" },
      { t:"io", k:"Asuddem aslugan i tuffɣa n useqdac. S umata, yettwasiggez deg ixf.", c:"stdout" }
    ]},
    { kab:"Pipe", en:"Pipes", blocks:[
      { t:"p", k:"Pipe yettwaseqdec i usiweḍ n isefka seg stdout ɣer stdin. Aya yenfeɛ i usiweḍ n isefka seg wahil ɣer wayeḍ." },
      { t:"p", k:"Tladna-a ad d-tesbeggen amḍan n wawalen deg izri (string) i d-ittunefken :" },
      { t:"term", title:"pipe", lines:[ { cmd:'echo "some string" | wc -w' }, { out:"2" } ] }
    ]},
    { kab:"Awelleh n isuddman", en:"Redirects", blocks:[
      { t:"p", k:"Tzemreḍ ad tesqedceḍ awelleh n isuddman i tira n isefka seg usuddem n tuffɣa ɣer ufaylu." },
      { t:"p", k:"Tladna-a ad tessekles taqsiḥt iḍeḥḥaken mliḥ deg ufaylu isem-is joke.txt, deg yiwen n ukaram." },
      { t:"term", title:"redirect", lines:[ { cmd:'echo "some funny joke" > joke.txt' } ] }
    ]},
    { kab:"Ɣef tferret-a", en:"Colophon", blocks:[
      { t:"lead", k:"Yerna-t Iulian Rotaru, 2024." },
      { t:"p", k:"Yettwasuqel ɣer Teqbaylit s lmendad n umawal n Samiya n At Belɛid (Lexique d'informatique, 2026)." },
      { t:"tip", k:"Sit ɣef yal taladna i wakken ad tt-tennɣleḍ ɣer tecfawt." }
    ]}
  ]
};
