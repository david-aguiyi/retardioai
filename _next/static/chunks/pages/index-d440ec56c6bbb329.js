(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [332],
  {
    7276: (e, n, t) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/",
        function () {
          return t(7031);
        },
      ]);
    },
    7031: (e, n, t) => {
      "use strict";
      t.r(n), t.d(n, { default: () => A });
      var o = t(4848),
        a = t(3368),
        r = t.n(a),
        i = t(8005),
        s = t.n(i),
        c = t(6540),
        m = t(8133),
        h = t.n(m),
        l = t(7959);
      function A() {
        let e = (0, c.useRef)();
        return (
          (0, c.useEffect)(() => {
            var e = document.getElementById("c"),
              n = e.getContext("2d");
            (e.height = window.innerHeight), (e.width = window.innerWidth);
            var t =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
            t = t.split("");
            for (var o = e.width / 10, a = [], r = 0; r < o; r++) a[r] = 1;
            setInterval(function () {
              (n.fillStyle = "rgba(0, 0, 0, 0.04)"),
                n.fillRect(0, 0, e.width, e.height),
                (n.fillStyle = "#88006c"),
                (n.font = "10px arial");
              for (var o = 0; o < a.length; o++) {
                var r = t[Math.floor(Math.random() * t.length)];
                n.fillText(r, 10 * o, 10 * a[o]),
                  10 * a[o] > e.height && Math.random() > 0.975 && (a[o] = 0),
                  a[o]++;
              }
            }, 35);
          }, []),
          (0, o.jsxs)(o.Fragment, {
            children: [
              (0, o.jsxs)(r(), {
                children: [
                  (0, o.jsx)("title", { children: "Act I : The AI Prophecy" }),
                  (0, o.jsx)("meta", {
                    name: "description",
                    content:
                      "ACT on Solana. A critical error has been detected in the blockchain. ACT has been deployed as an emergency measure.",
                  }),
                  (0, o.jsx)("meta", {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                  }),
                  (0, o.jsx)("meta", {
                    property: "og:image",
                    content: "/pfp-static.jpg",
                  }),
                  (0, o.jsx)("meta", {
                    property: "og:image:type",
                    content: "image/jpeg",
                  }),
                  (0, o.jsx)("meta", {
                    property: "og:image:width",
                    content: "420",
                  }),
                  (0, o.jsx)("meta", {
                    property: "og:image:height",
                    content: "420",
                  }),
                  (0, o.jsx)("meta", {
                    property: "og:type",
                    content: "website",
                  }),
                  (0, o.jsx)("link", { rel: "icon", href: "/pfp-static.jpg" }),
                ],
              }),
              (0, o.jsx)(h(), { type: "module", src: "./scripts/pfp.js" }),
              (0, o.jsx)("canvas", { id: "c", width: "2300", height: "750" }),
              (0, o.jsx)("pre", {
                id: "mainAscii",
                className: s().ascii,
                children:
                  "               AAA                                         tttt               IIIIIIIIII                                                                         \n                    A:::A                                     ttt:::t               I::::::::I                                                                         \n                  A:::::A                                    t:::::t               I::::::::I                                                                         \n                  A:::::::A                                   t:::::t               II::::::II                                                                         \n                A:::::::::A            ccccccccccccccccttttttt:::::ttttttt           I::::I                                                                           \n                A:::::A:::::A         cc:::::::::::::::ct:::::::::::::::::t           I::::I        ::::::                                                             \n              A:::::A A:::::A       c:::::::::::::::::ct:::::::::::::::::t           I::::I        ::::::                                                             \n              A:::::A   A:::::A     c:::::::cccccc:::::ctttttt:::::::tttttt           I::::I        ::::::                                                             \n            A:::::A     A:::::A    c::::::c     ccccccc      t:::::t                 I::::I                                                                           \n            A:::::AAAAAAAAA:::::A   c:::::c                   t:::::t                 I::::I                                                                           \n          A:::::::::::::::::::::A  c:::::c                   t:::::t                 I::::I                                                                           \n          A:::::AAAAAAAAAAAAA:::::A c::::::c     ccccccc      t:::::t    tttttt       I::::I        ::::::                                                             \n        A:::::A             A:::::Ac:::::::cccccc:::::c      t::::::tttt:::::t     II::::::II      ::::::                                                             \n        A:::::A               A:::::Ac:::::::::::::::::c      tt::::::::::::::t     I::::::::I      ::::::                                                             \n      A:::::A                 A:::::Acc:::::::::::::::c        tt:::::::::::tt     I::::::::I                                                                         \n      AAAAAAA                   AAAAAAA cccccccccccccccc          ttttttttttt       IIIIIIIIII                                                                         \n          TTTTTTTTTTTTTTTTTTTTTTThhhhhhh                                                     AAA               IIIIIIIIII                                             \n          T:::::::::::::::::::::Th:::::h                                                    A:::A              I::::::::I                                             \n          T:::::::::::::::::::::Th:::::h                                                   A:::::A             I::::::::I                                             \n          T:::::TT:::::::TT:::::Th:::::h                                                  A:::::::A            II::::::II                                             \n          TTTTTT  T:::::T  TTTTTT h::::h hhhhh           eeeeeeeeeeee                    A:::::::::A             I::::I                                               \n                  T:::::T         h::::hh:::::hhh      ee::::::::::::ee                 A:::::A:::::A            I::::I                                               \n                  T:::::T         h::::::::::::::hh   e::::::eeeee:::::ee              A:::::A A:::::A           I::::I                                               \n                  T:::::T         h:::::::hhh::::::h e::::::e     e:::::e             A:::::A   A:::::A          I::::I                                               \n                  T:::::T         h::::::h   h::::::he:::::::eeeee::::::e            A:::::A     A:::::A         I::::I                                               \n                  T:::::T         h:::::h     h:::::he:::::::::::::::::e            A:::::AAAAAAAAA:::::A        I::::I                                               \n                  T:::::T         h:::::h     h:::::he::::::eeeeeeeeeee            A:::::::::::::::::::::A       I::::I                                               \n                  T:::::T         h:::::h     h:::::he:::::::e                    A:::::AAAAAAAAAAAAA:::::A      I::::I                                               \n                TT:::::::TT       h:::::h     h:::::he::::::::e                  A:::::A             A:::::A   II::::::II                                             \n                T:::::::::T       h:::::h     h:::::h e::::::::eeeeeeee         A:::::A               A:::::A  I::::::::I                                             \n                T:::::::::T       h:::::h     h:::::h  ee:::::::::::::e        A:::::A                 A:::::A I::::::::I                                             \n                TTTTTTTTTTT       hhhhhhh     hhhhhhh    eeeeeeeeeeeeee       AAAAAAA                   AAAAAAAIIIIIIIIII                                             \n      PPPPPPPPPPPPPPPPP                                                           hhhhhhh                                                                              \n      P::::::::::::::::P                                                          h:::::h                                                                              \n      P::::::PPPPPP:::::P                                                         h:::::h                                                                              \n      PP:::::P     P:::::P                                                        h:::::h                                                                              \n        P::::P     P:::::Prrrrr   rrrrrrrrr      ooooooooooo   ppppp   ppppppppp   h::::h hhhhh           eeeeeeeeeeee        ccccccccccccccccyyyyyyy           yyyyyyy\n        P::::P     P:::::Pr::::rrr:::::::::r   oo:::::::::::oo p::::ppp:::::::::p  h::::hh:::::hhh      ee::::::::::::ee    cc:::::::::::::::c y:::::y         y:::::y \n        P::::PPPPPP:::::P r:::::::::::::::::r o:::::::::::::::op:::::::::::::::::p h::::::::::::::hh   e::::::eeeee:::::ee c:::::::::::::::::c  y:::::y       y:::::y  \n        P:::::::::::::PP  rr::::::rrrrr::::::ro:::::ooooo:::::opp::::::ppppp::::::ph:::::::hhh::::::h e::::::e     e:::::ec:::::::cccccc:::::c   y:::::y     y:::::y   \n        P::::PPPPPPPPP     r:::::r     r:::::ro::::o     o::::o p:::::p     p:::::ph::::::h   h::::::he:::::::eeeee::::::ec::::::c     ccccccc    y:::::y   y:::::y    \n        P::::P             r:::::r     rrrrrrro::::o     o::::o p:::::p     p:::::ph:::::h     h:::::he:::::::::::::::::e c:::::c                  y:::::y y:::::y     \n        P::::P             r:::::r            o::::o     o::::o p:::::p     p:::::ph:::::h     h:::::he::::::eeeeeeeeeee  c:::::c                   y:::::y:::::y      \n        P::::P             r:::::r            o::::o     o::::o p:::::p    p::::::ph:::::h     h:::::he:::::::e           c::::::c     ccccccc       y:::::::::y       \n      PP::::::PP           r:::::r            o:::::ooooo:::::o p:::::ppppp:::::::ph:::::h     h:::::he::::::::e          c:::::::cccccc:::::c        y:::::::y        \n      P::::::::P           r:::::r            o:::::::::::::::o p::::::::::::::::p h:::::h     h:::::h e::::::::eeeeeeee   c:::::::::::::::::c         y:::::y         \n      P::::::::P           r:::::r             oo:::::::::::oo  p::::::::::::::pp  h:::::h     h:::::h  ee:::::::::::::e    cc:::::::::::::::c        y:::::y          \n      PPPPPPPPPP           rrrrrrr               ooooooooooo    p::::::pppppppp    hhhhhhh     hhhhhhh    eeeeeeeeeeeeee      cccccccccccccccc       y:::::y           \n                                                                p:::::p                                                                             y:::::y            \n                                                                p:::::p                                                                            y:::::y             \n                                                              p:::::::p                                                                          y:::::y              \n                                                              p:::::::p                                                                         y:::::y               \n                                                              p:::::::p                                                                        yyyyyyy                \n                                                              ppppppppp                                                                                               ",
              }),
              (0, o.jsxs)("main", {
                className: s().main,
                children: [
                  (0, o.jsxs)("div", {
                    className: s().infos,
                    children: [
                      (0, o.jsx)("div", {
                        className: s().pfps,
                        children: (0, o.jsx)("img", {
                          className: s().actPFP,
                          src: "./pfp.gif",
                        }),
                      }),
                      (0, o.jsx)("div", {
                        className: s().infoTop,
                        children: (0, o.jsx)("pre", {
                          children:
                            "                                                                                                                                                                                                                                                                                                                                                                                                                                                bbbbbbbb                                                                                                                                                                                                        \n               AAA                                         tttt               IIIIIIIIII                  EEEEEEEEEEEEEEEEEEEEEE                                        lllllll                                       iiii                                                                                                                                                                                                   tttt               b::::::b                               hhhhhhh                                                       iiii                                                                                                       \n              A:::A                                     ttt:::t               I::::::::I                  E::::::::::::::::::::E                                        l:::::l                                      i::::i                                                                                                                                                                                               ttt:::t               b::::::b                               h:::::h                                                      i::::i                                                                                                      \n             A:::::A                                    t:::::t               I::::::::I                  E::::::::::::::::::::E                                        l:::::l                                       iiii                                                                                                                                                                                                t:::::t               b::::::b                               h:::::h                                                       iiii                                                                                                       \n            A:::::::A                                   t:::::t               II::::::II                  EE::::::EEEEEEEEE::::E                                        l:::::l                                                                                                                                                                                                                                           t:::::t                b:::::b                               h:::::h                                                                                                                                                                  \n           A:::::::::A            ccccccccccccccccttttttt:::::ttttttt           I::::I                      E:::::E       EEEEEExxxxxxx      xxxxxxxppppp   ppppppppp    l::::l    ooooooooooo   rrrrr   rrrrrrrrr  iiiiiiinnnn  nnnnnnnn       ggggggggg   ggggg         eeeeeeeeeeee       mmmmmmm    mmmmmmm       eeeeeeeeeeee    rrrrr   rrrrrrrrr      ggggggggg   ggggg    eeeeeeeeeeee    nnnn  nnnnnnnn    ttttttt:::::ttttttt          b:::::bbbbbbbbb        eeeeeeeeeeee    h::::h hhhhh         aaaaaaaaaaaaavvvvvvv           vvvvvvviiiiiii    ooooooooooo   rrrrr   rrrrrrrrr                                                                   \n          A:::::A:::::A         cc:::::::::::::::ct:::::::::::::::::t           I::::I        ::::::        E:::::E              x:::::x    x:::::x p::::ppp:::::::::p   l::::l  oo:::::::::::oo r::::rrr:::::::::r i:::::in:::nn::::::::nn    g:::::::::ggg::::g       ee::::::::::::ee   mm:::::::m  m:::::::mm   ee::::::::::::ee  r::::rrr:::::::::r    g:::::::::ggg::::g  ee::::::::::::ee  n:::nn::::::::nn  t:::::::::::::::::t          b::::::::::::::bb    ee::::::::::::ee  h::::hh:::::hhh      a::::::::::::av:::::v         v:::::v i:::::i  oo:::::::::::oo r::::rrr:::::::::r                                                                  \n         A:::::A A:::::A       c:::::::::::::::::ct:::::::::::::::::t           I::::I        ::::::        E::::::EEEEEEEEEE     x:::::x  x:::::x  p:::::::::::::::::p  l::::l o:::::::::::::::or:::::::::::::::::r i::::in::::::::::::::nn  g:::::::::::::::::g      e::::::eeeee:::::eem::::::::::mm::::::::::m e::::::eeeee:::::eer:::::::::::::::::r  g:::::::::::::::::g e::::::eeeee:::::een::::::::::::::nn t:::::::::::::::::t          b::::::::::::::::b  e::::::eeeee:::::eeh::::::::::::::hh    aaaaaaaaa:::::av:::::v       v:::::v   i::::i o:::::::::::::::or:::::::::::::::::r                                                                 \n        A:::::A   A:::::A     c:::::::cccccc:::::ctttttt:::::::tttttt           I::::I        ::::::        E:::::::::::::::E      x:::::xx:::::x   pp::::::ppppp::::::p l::::l o:::::ooooo:::::orr::::::rrrrr::::::ri::::inn:::::::::::::::ng::::::ggggg::::::gg     e::::::e     e:::::em::::::::::::::::::::::me::::::e     e:::::err::::::rrrrr::::::rg::::::ggggg::::::gge::::::e     e:::::enn:::::::::::::::ntttttt:::::::tttttt          b:::::bbbbb:::::::be::::::e     e:::::eh:::::::hhh::::::h            a::::a v:::::v     v:::::v    i::::i o:::::ooooo:::::orr::::::rrrrr::::::r                                                                \n       A:::::A     A:::::A    c::::::c     ccccccc      t:::::t                 I::::I                      E:::::::::::::::E       x::::::::::x     p:::::p     p:::::p l::::l o::::o     o::::o r:::::r     r:::::ri::::i  n:::::nnnn:::::ng:::::g     g:::::g      e:::::::eeeee::::::em:::::mmm::::::mmm:::::me:::::::eeeee::::::e r:::::r     r:::::rg:::::g     g:::::g e:::::::eeeee::::::e  n:::::nnnn:::::n      t:::::t                b:::::b    b::::::be:::::::eeeee::::::eh::::::h   h::::::h    aaaaaaa:::::a  v:::::v   v:::::v     i::::i o::::o     o::::o r:::::r     r:::::r                                                                \n      A:::::AAAAAAAAA:::::A   c:::::c                   t:::::t                 I::::I                      E::::::EEEEEEEEEE        x::::::::x      p:::::p     p:::::p l::::l o::::o     o::::o r:::::r     rrrrrrri::::i  n::::n    n::::ng:::::g     g:::::g      e:::::::::::::::::e m::::m   m::::m   m::::me:::::::::::::::::e  r:::::r     rrrrrrrg:::::g     g:::::g e:::::::::::::::::e   n::::n    n::::n      t:::::t                b:::::b     b:::::be:::::::::::::::::e h:::::h     h:::::h  aa::::::::::::a   v:::::v v:::::v      i::::i o::::o     o::::o r:::::r     rrrrrrr                                                                \n     A:::::::::::::::::::::A  c:::::c                   t:::::t                 I::::I                      E:::::E                  x::::::::x      p:::::p     p:::::p l::::l o::::o     o::::o r:::::r            i::::i  n::::n    n::::ng:::::g     g:::::g      e::::::eeeeeeeeeee  m::::m   m::::m   m::::me::::::eeeeeeeeeee   r:::::r            g:::::g     g:::::g e::::::eeeeeeeeeee    n::::n    n::::n      t:::::t                b:::::b     b:::::be::::::eeeeeeeeeee  h:::::h     h:::::h a::::aaaa::::::a    v:::::v:::::v       i::::i o::::o     o::::o r:::::r                                                                            \n    A:::::AAAAAAAAAAAAA:::::A c::::::c     ccccccc      t:::::t    tttttt       I::::I        ::::::        E:::::E       EEEEEE    x::::::::::x     p:::::p    p::::::p l::::l o::::o     o::::o r:::::r            i::::i  n::::n    n::::ng::::::g    g:::::g      e:::::::e           m::::m   m::::m   m::::me:::::::e            r:::::r            g::::::g    g:::::g e:::::::e             n::::n    n::::n      t:::::t    tttttt      b:::::b     b:::::be:::::::e           h:::::h     h:::::ha::::a    a:::::a     v:::::::::v        i::::i o::::o     o::::o r:::::r                                                                            \n   A:::::A             A:::::Ac:::::::cccccc:::::c      t::::::tttt:::::t     II::::::II      ::::::      EE::::::EEEEEEEE:::::E   x:::::xx:::::x    p:::::ppppp:::::::pl::::::lo:::::ooooo:::::o r:::::r           i::::::i n::::n    n::::ng:::::::ggggg:::::g      e::::::::e          m::::m   m::::m   m::::me::::::::e           r:::::r            g:::::::ggggg:::::g e::::::::e            n::::n    n::::n      t::::::tttt:::::t      b:::::bbbbbb::::::be::::::::e          h:::::h     h:::::ha::::a    a:::::a      v:::::::v        i::::::io:::::ooooo:::::o r:::::r                                                                            \n  A:::::A               A:::::Ac:::::::::::::::::c      tt::::::::::::::t     I::::::::I      ::::::      E::::::::::::::::::::E  x:::::x  x:::::x   p::::::::::::::::p l::::::lo:::::::::::::::o r:::::r           i::::::i n::::n    n::::n g::::::::::::::::g       e::::::::eeeeeeee  m::::m   m::::m   m::::m e::::::::eeeeeeee   r:::::r             g::::::::::::::::g  e::::::::eeeeeeee    n::::n    n::::n      tt::::::::::::::t      b::::::::::::::::b  e::::::::eeeeeeee  h:::::h     h:::::ha:::::aaaa::::::a       v:::::v         i::::::io:::::::::::::::o r:::::r                                                                            \n A:::::A                 A:::::Acc:::::::::::::::c        tt:::::::::::tt     I::::::::I                  E::::::::::::::::::::E x:::::x    x:::::x  p::::::::::::::pp  l::::::l oo:::::::::::oo  r:::::r           i::::::i n::::n    n::::n  gg::::::::::::::g        ee:::::::::::::e  m::::m   m::::m   m::::m  ee:::::::::::::e   r:::::r              gg::::::::::::::g   ee:::::::::::::e    n::::n    n::::n        tt:::::::::::tt      b:::::::::::::::b    ee:::::::::::::e  h:::::h     h:::::h a::::::::::aa:::a       v:::v          i::::::i oo:::::::::::oo  r:::::r                                                                            \nAAAAAAA                   AAAAAAA cccccccccccccccc          ttttttttttt       IIIIIIIIII                  EEEEEEEEEEEEEEEEEEEEEExxxxxxx      xxxxxxx p::::::pppppppp    llllllll   ooooooooooo    rrrrrrr           iiiiiiii nnnnnn    nnnnnn    gggggggg::::::g          eeeeeeeeeeeeee  mmmmmm   mmmmmm   mmmmmm    eeeeeeeeeeeeee   rrrrrrr                gggggggg::::::g     eeeeeeeeeeeeee    nnnnnn    nnnnnn          ttttttttttt        bbbbbbbbbbbbbbbb       eeeeeeeeeeeeee  hhhhhhh     hhhhhhh  aaaaaaaaaa  aaaa        vvv           iiiiiiii   ooooooooooo    rrrrrrr                                                                            \n                                                                                                                                                     p:::::p                                                                                             g:::::g                                                                                                      g:::::g                                                                                                                                                                                                                                                                                   \n                                                                                                                                                     p:::::p                                                                                 gggggg      g:::::g                                                                                          gggggg      g:::::g                                                                                                                                                                                                                                                                                   \n                                                                                                                                                    p:::::::p                                                                                g:::::gg   gg:::::g                                                                                          g:::::gg   gg:::::g                                                                                                                                                                                                                                                                                   \n                                                                                                                                                    p:::::::p                                                                                 g::::::ggg:::::::g                                                                                           g::::::ggg:::::::g                                                                                                                                                                                                                                                                                   \n                                                                                                                                                    p:::::::p                                                                                  gg:::::::::::::g                                                                                             gg:::::::::::::g                                                                                                                                                                                                                                                                                    \n         ffffffffffffffff                                                                                                              lllllll      pppttttpp          iiii                                  AAA               IIIIIIIIII        ggg::::::ggg                                  lllllll         tttt            iiii                   hhhhhhh ggg::::::ggg                                                                                    iiii                            tttt                                                                                              tttt            iiii                                            \n        f::::::::::::::::f                                                                                                             l:::::l      ttt:::t           i::::i                                A:::A              I::::::::I           gggggg                                     l:::::l      ttt:::t           i::::i                  h:::::h    gggggg                                                                                      i::::i                        ttt:::t                                                                                           ttt:::t           i::::i                                           \n       f::::::::::::::::::f                                                                                                            l:::::l      t:::::t            iiii                                A:::::A             I::::::::I                                                      l:::::l      t:::::t            iiii                   h:::::h                                                                                                 iiii                         t:::::t                                                                                           t:::::t            iiii                                            \n       f::::::fffffff:::::f                                                                                                            l:::::l      t:::::t                                               A:::::::A            II::::::II                                                      l:::::l      t:::::t                                   h:::::h                                                                                                                              t:::::t                                                                                           t:::::t                                                            \n       f:::::f       ffffffrrrrr   rrrrrrrrr      ooooooooooo      mmmmmmm    mmmmmmm           mmmmmmm    mmmmmmm   uuuuuu    uuuuuu   l::::lttttttt:::::ttttttt    iiiiiii                             A:::::::::A             I::::I                 mmmmmmm    mmmmmmm   uuuuuu    uuuuuu   l::::lttttttt:::::ttttttt    iiiiiii                   h::::h hhhhh       uuuuuu    uuuuuu     mmmmmmm    mmmmmmm     aaaaaaaaaaaaa  nnnn  nnnnnnnn         iiiiiiinnnn  nnnnnnnn    ttttttt:::::ttttttt        eeeeeeeeeeee    rrrrr   rrrrrrrrr   aaaaaaaaaaaaa      ccccccccccccccccttttttt:::::ttttttt    iiiiiii    ooooooooooo   nnnn  nnnnnnnn           \n       f:::::f             r::::rrr:::::::::r   oo:::::::::::oo  mm:::::::m  m:::::::mm       mm:::::::m  m:::::::mm u::::u    u::::u   l::::lt:::::::::::::::::t    i:::::i                            A:::::A:::::A            I::::I               mm:::::::m  m:::::::mm u::::u    u::::u   l::::lt:::::::::::::::::t    i:::::i                   h::::hh:::::hhh    u::::u    u::::u   mm:::::::m  m:::::::mm   a::::::::::::a n:::nn::::::::nn       i:::::in:::nn::::::::nn  t:::::::::::::::::t      ee::::::::::::ee  r::::rrr:::::::::r  a::::::::::::a   cc:::::::::::::::ct:::::::::::::::::t    i:::::i  oo:::::::::::oo n:::nn::::::::nn         \n      f:::::::ffffff       r:::::::::::::::::r o:::::::::::::::om::::::::::mm::::::::::m     m::::::::::mm::::::::::mu::::u    u::::u   l::::lt:::::::::::::::::t     i::::i                           A:::::A A:::::A           I::::I              m::::::::::mm::::::::::mu::::u    u::::u   l::::lt:::::::::::::::::t     i::::i                   h::::::::::::::hh  u::::u    u::::u  m::::::::::mm::::::::::m  aaaaaaaaa:::::an::::::::::::::nn       i::::in::::::::::::::nn t:::::::::::::::::t     e::::::eeeee:::::eer:::::::::::::::::r aaaaaaaaa:::::a c:::::::::::::::::ct:::::::::::::::::t     i::::i o:::::::::::::::on::::::::::::::nn        \n      f::::::::::::f       rr::::::rrrrr::::::ro:::::ooooo:::::om::::::::::::::::::::::m     m::::::::::::::::::::::mu::::u    u::::u   l::::ltttttt:::::::tttttt     i::::i  ---------------         A:::::A   A:::::A          I::::I              m::::::::::::::::::::::mu::::u    u::::u   l::::ltttttt:::::::tttttt     i::::i  ---------------  h:::::::hhh::::::h u::::u    u::::u  m::::::::::::::::::::::m           a::::ann:::::::::::::::n      i::::inn:::::::::::::::ntttttt:::::::tttttt    e::::::e     e:::::err::::::rrrrr::::::r         a::::ac:::::::cccccc:::::ctttttt:::::::tttttt     i::::i o:::::ooooo:::::onn:::::::::::::::n       \n      f::::::::::::f        r:::::r     r:::::ro::::o     o::::om:::::mmm::::::mmm:::::m     m:::::mmm::::::mmm:::::mu::::u    u::::u   l::::l      t:::::t           i::::i  -:::::::::::::-        A:::::A     A:::::A         I::::I              m:::::mmm::::::mmm:::::mu::::u    u::::u   l::::l      t:::::t           i::::i  -:::::::::::::-  h::::::h   h::::::hu::::u    u::::u  m:::::mmm::::::mmm:::::m    aaaaaaa:::::a  n:::::nnnn:::::n      i::::i  n:::::nnnn:::::n      t:::::t          e:::::::eeeee::::::e r:::::r     r:::::r  aaaaaaa:::::ac::::::c     ccccccc      t:::::t           i::::i o::::o     o::::o  n:::::nnnn:::::n       \n      f:::::::ffffff        r:::::r     rrrrrrro::::o     o::::om::::m   m::::m   m::::m     m::::m   m::::m   m::::mu::::u    u::::u   l::::l      t:::::t           i::::i  ---------------       A:::::AAAAAAAAA:::::A        I::::I              m::::m   m::::m   m::::mu::::u    u::::u   l::::l      t:::::t           i::::i  ---------------  h:::::h     h:::::hu::::u    u::::u  m::::m   m::::m   m::::m  aa::::::::::::a  n::::n    n::::n      i::::i  n::::n    n::::n      t:::::t          e:::::::::::::::::e  r:::::r     rrrrrrraa::::::::::::ac:::::c                   t:::::t           i::::i o::::o     o::::o  n::::n    n::::n       \n       f:::::f              r:::::r            o::::o     o::::om::::m   m::::m   m::::m     m::::m   m::::m   m::::mu::::u    u::::u   l::::l      t:::::t           i::::i                       A:::::::::::::::::::::A       I::::I              m::::m   m::::m   m::::mu::::u    u::::u   l::::l      t:::::t           i::::i                   h:::::h     h:::::hu::::u    u::::u  m::::m   m::::m   m::::m a::::aaaa::::::a  n::::n    n::::n      i::::i  n::::n    n::::n      t:::::t          e::::::eeeeeeeeeee   r:::::r           a::::aaaa::::::ac:::::c                   t:::::t           i::::i o::::o     o::::o  n::::n    n::::n       \n       f:::::f              r:::::r            o::::o     o::::om::::m   m::::m   m::::m     m::::m   m::::m   m::::mu:::::uuuu:::::u   l::::l      t:::::t    tttttt i::::i                      A:::::AAAAAAAAAAAAA:::::A      I::::I              m::::m   m::::m   m::::mu:::::uuuu:::::u   l::::l      t:::::t    tttttt i::::i                   h:::::h     h:::::hu:::::uuuu:::::u  m::::m   m::::m   m::::ma::::a    a:::::a  n::::n    n::::n      i::::i  n::::n    n::::n      t:::::t    tttttte:::::::e            r:::::r          a::::a    a:::::ac::::::c     ccccccc      t:::::t    tttttt i::::i o::::o     o::::o  n::::n    n::::n       \n      f:::::::f             r:::::r            o:::::ooooo:::::om::::m   m::::m   m::::m     m::::m   m::::m   m::::mu:::::::::::::::uul::::::l     t::::::tttt:::::ti::::::i                    A:::::A             A:::::A   II::::::II ,,,,,,     m::::m   m::::m   m::::mu:::::::::::::::uul::::::l     t::::::tttt:::::ti::::::i                  h:::::h     h:::::hu:::::::::::::::uum::::m   m::::m   m::::ma::::a    a:::::a  n::::n    n::::n     i::::::i n::::n    n::::n      t::::::tttt:::::te::::::::e           r:::::r          a::::a    a:::::ac:::::::cccccc:::::c      t::::::tttt:::::ti::::::io:::::ooooo:::::o  n::::n    n::::n       \n      f:::::::f             r:::::r            o:::::::::::::::om::::m   m::::m   m::::m     m::::m   m::::m   m::::m u:::::::::::::::ul::::::l     tt::::::::::::::ti::::::i                   A:::::A               A:::::A  I::::::::I ,::::,     m::::m   m::::m   m::::m u:::::::::::::::ul::::::l     tt::::::::::::::ti::::::i                  h:::::h     h:::::h u:::::::::::::::um::::m   m::::m   m::::ma:::::aaaa::::::a  n::::n    n::::n     i::::::i n::::n    n::::n      tt::::::::::::::t e::::::::eeeeeeee   r:::::r          a:::::aaaa::::::a c:::::::::::::::::c      tt::::::::::::::ti::::::io:::::::::::::::o  n::::n    n::::n ......\n      f:::::::f             r:::::r             oo:::::::::::oo m::::m   m::::m   m::::m     m::::m   m::::m   m::::m  uu::::::::uu:::ul::::::l       tt:::::::::::tti::::::i                  A:::::A                 A:::::A I::::::::I ,::::,     m::::m   m::::m   m::::m  uu::::::::uu:::ul::::::l       tt:::::::::::tti::::::i                  h:::::h     h:::::h  uu::::::::uu:::um::::m   m::::m   m::::m a::::::::::aa:::a n::::n    n::::n     i::::::i n::::n    n::::n        tt:::::::::::tt  ee:::::::::::::e   r:::::r           a::::::::::aa:::a cc:::::::::::::::c        tt:::::::::::tti::::::i oo:::::::::::oo   n::::n    n::::n .::::.\n      fffffffff             rrrrrrr               ooooooooooo   mmmmmm   mmmmmm   mmmmmm     mmmmmm   mmmmmm   mmmmmm    uuuuuuuu  uuuullllllll         ttttttttttt  iiiiiiii                 AAAAAAA                   AAAAAAAIIIIIIIIII ,:::,,     mmmmmm   mmmmmm   mmmmmm    uuuuuuuu  uuuullllllll         ttttttttttt  iiiiiiii                  hhhhhhh     hhhhhhh    uuuuuuuu  uuuummmmmm   mmmmmm   mmmmmm  aaaaaaaaaa  aaaa nnnnnn    nnnnnn     iiiiiiii nnnnnn    nnnnnn          ttttttttttt      eeeeeeeeeeeeee   rrrrrrr            aaaaaaaaaa  aaaa   cccccccccccccccc          ttttttttttt  iiiiiiii   ooooooooooo     nnnnnn    nnnnnn ......\n                                                                                                                                                                                                                                         ,:::,                                                                                                                                                                                                                                                                                                                                                                                                                  \n                                                                                                                                                                                                                                         ,,,,                                                                                                                                                                                                                                                                                                                                                                                                                   \n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                \n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ",
                        }),
                      }),
                      (0, o.jsxs)("div", {
                        className: s().alts,
                        children: [
                          (0, o.jsx)("a", {
                            href: "https://x.com/ACTICOMMUNITY",
                            target: "_blank",
                            children: (0, o.jsx)("pre", {
                              children:
                                "                                                                                                                     \n                                                                                                                     \n                                                                                                                     \n                                                                                                                     \n       ██████████████████████████████████████                                                         ████████       \n       ██████████████████████████████████████                                                         ████████       \n       ██████████████████████████████████████                                                         ████████       \n       ██████████████████████████████████████                                                         ████████       \n       ████████                            █████████                                          █████████              \n       ████████                            █████████                                          █████████              \n       ████████                            █████████                                          █████████              \n       ████████                            █████████                                          █████████              \n              ████████████████             █████████                                   █████████                     \n              ████████████████             █████████                                   █████████                     \n              ████████████████             █████████                                   █████████                     \n              ████████████████             █████████                                   █████████                     \n                      ████████                    █████████                     ████████                             \n                      ████████                    █████████                     ████████                             \n                      ████████                    █████████                     ████████                             \n                      ████████                    █████████                     ████████                             \n                             ████████                     ████████      █████████                                    \n                             ████████                     ████████      █████████                                    \n                             ████████                     ████████      █████████                                    \n                             ████████                     ████████      █████████                                    \n                                    █████████                    █████████                                           \n                                    █████████                    █████████                                           \n                                    █████████                    █████████                                           \n                                    █████████                    █████████                                           \n                                           █████████             █████████                                           \n                                           █████████             █████████                                           \n                                           █████████             █████████                                           \n                                           █████████             █████████                                           \n                                           █████████                    █████████                                    \n                                           █████████                    █████████                                    \n                                           █████████                    █████████                                    \n                                           █████████                    █████████                                    \n                                           ████████████████                     ████████                             \n                                           ████████████████                     ████████                             \n                                           ████████████████                     ████████                             \n                                           ████████████████                     ████████                             \n                                    █████████             ████████                     █████████                     \n                                    █████████             ████████                     █████████                     \n                                    █████████             ████████                     █████████                     \n                                    █████████             ████████                     █████████                     \n                             ████████                            █████████             █████████                     \n                             ████████                            █████████             █████████                     \n                             ████████                            █████████             █████████                     \n                             ████████                            █████████             █████████                     \n                      ████████                                   █████████                    █████████              \n                      ████████                                   █████████                    █████████              \n                      ████████                                   █████████                    █████████              \n                     █████████                                   █████████                    █████████              \n              ████████                                                  █████████                     ████████       \n              ████████                                                  █████████                     ████████       \n              ████████                                                  █████████                     ████████       \n              ████████                                                  █████████                     ████████       \n       ████████                                                                 ██████████████████████████████       \n       ████████                                                                 ██████████████████████████████       \n       ████████                                                                 ██████████████████████████████       \n       ████████                                                                 ██████████████████████████████       \n                                                                                                                     \n                                                                                                                     \n                                                                                                                     \n                                                                                                                     \n",
                            }),
                          }),
                          (0, o.jsx)("a", {
                            href: "https://dexscreener.com/solana/GJAFwWjJ3vnTsrQVabjBVK2TYB1YtRCQXRDfDgUnpump",
                            target: "_blank",
                            children: (0, o.jsx)("pre", {
                              children:
                                "                                                                                                                     \n                                            ████████████████████████████                                             \n                                            ████████████████████████████                                             \n                                     ███████████████████████████████████████████                                     \n                                    ████████████████████████████████████████████                                     \n                                    ████████████████████████████████████████████                                     \n                    █████        ███████████████████████████████████████████████████       █████                     \n                    █████        ███████████████████████████████████████████████████       █████                     \n                        ████████████████████████████████████████████████████████████████████                         \n                        ████████████████████████████████████████████████████████████████████                         \n                            ████████████████████████████████████████████████████████████                             \n                            ████████████████████████████████████████████████████████████                             \n                                 ███████████████████████████████████████████████████                                 \n                                 ███████████████████████████████████████████████████                                 \n                    █████████    ██████████████████████████████████████████████████    █████████                     \n                    █████████       ████████████████████████████████████████████       █████████                     \n                    █████████       ████████████████████████████████████████████       █████████                     \n                    █████████           ████████████████████████████████████           █████████                     \n                    █████████           ████████████████████████████████████           █████████                     \n                    █████████                   █████████  █████████                   █████████                     \n                    █████████                   █████████  █████████                   █████████                     \n                    █████████       █████████                          █████████       █████████                     \n                    █████████       █████████                          █████████       █████████                     \n                    █████████           █████       ████████████       █████           █████████████                 \n                    █████████           █████       ████████████       █████           █████████████                 \n                    █████████████                   ████████████                   █████████████████                 \n                    █████████████                   ████████████                   █████████████████                 \n                    █████████████████████████   ████████████████████   █████████████████████████████                 \n                    █████████████████████████   ████████████████████   █████████████████████████████                 \n                    █████████████████████████   ████████████████████   █████████████████████████████                 \n                    █████████████████████████   ████████████████████   █████████████████████████████                 \n                    █████████████████████████   ████████████████████   █████████████████████████████                 \n                    █████████████████           ████████████████████           █████████████████████                 \n                 ████████████████████       ████████████████████████████       █████████████████████                 \n                █████████████████           ████████████████████████████           █████████████████                 \n                █████████████████████       ████████████████████████████       █████████████████████                 \n                █████████████████████           ████████████████████           █████████████████████                 \n                █████████████████████           ████████████████████           █████████████████████                 \n                █████████████████████████████       ████████████           █████████████████████████                 \n                █████████████████████████████       ████████████           █████████████████████████                 \n                █████████████████████████████       ████████████       █████████████████████████████                 \n                █████████████████████████████       ████████████       █████████████████████████████                 \n                █████████████████████████████████       ████       █████████████████████████████████                 \n                █████████████████████████████████       ████       █████████████████████████████████                 \n                █████████████████████████████████       ████       ████████████████████████████████████              \n                █████████████████████████████████       ████       ████████████████████████████████████              \n             ████████████████████████████████████████   ████    ███████████████████████████████████████              \n             ████████   █████████████████████████████   ████    ████████████████████████████   ████████              \n             ████████   █████████████████████████████   ████    ████████████████████████████   ████████              \n             ████       █████████████████████████████           ████████████████████████████       ████              \n         ████████       █████████████████████████████           ████████████████████████████       ████████          \n         █████              █████████████   █████████           ████████   █████████████              █████          \n         █████              █████████████   ████████████    ████████████   █████████████              █████          \n                                 ████           █████████  █████████           █████                                 \n                                 ████           █████████  █████████           █████                                 \n                                                █████████  █████████                                                 \n                                                █████████  █████████                                                 \n                                                    █████  █████                                                     \n                                                    █████  █████                                                     \n                                                    ████████████                                                     \n                                                    ████████████                                                     \n                                                    ████████████                                                     \n                                                        ████                                                         \n                                                        ████                                                         \n",
                            }),
                          }),
                          (0, o.jsx)("a", {
                            href: "https://t.me/actportal",
                            target: "_blank",
                            children: (0, o.jsx)("pre", {
                              children:
                                "                                                                                                                     \n                                                                                                                     \n                                                                                                                     \n                                                                                                                     \n                                                                                                                     \n                                                                                                                     \n                                                                                                     ████████████████\n                                                                                                     ████████████████\n                                                                                                     ████████████████\n                                                                                                     ████████████████\n                                                                                      ███████████████████████████████\n                                                                                      ███████████████████████████████\n                                                                                      ███████████████████████████████\n                                                                                      ███████████████████████████████\n                                                                       ██████████████████████████████████████████████\n                                                                      ███████████████████████████████████████████████\n                                                                      ███████████████████████████████████████████████\n                                                                      ███████████████████████████████████████████████\n                                                       ██████████████████████████████████████████████████████████████\n                                                       ██████████████████████████████████████████████████████████████\n                                                       ██████████████████████████████████████████████████████████████\n                                                       ██████████████████████████████████████████████████████████████\n                                                      ███████████████████████████████████████████████████████████████\n                               ███████████████████████████████████████████████        ███████████████████████████████\n                               ███████████████████████████████████████████████        ███████████████████████████████\n                               ███████████████████████████████████████████████        ███████████████████████████████\n                               ███████████████████████████████████████████████        ███████████████████████████████\n                ███████████████████████████████████████████████████████       ███████████████████████████████████████\n               ████████████████████████████████████████████████████████       ███████████████████████████████████████\n               ████████████████████████████████████████████████████████       ███████████████████████████████████████\n               ████████████████████████████████████████████████████████       ███████████████████████████████████████\n██████████████████████████████████████████████████████████████████████ ██████████████████████████████████████████████\n███████████████████████████████████████████████████████████████       ███████████████████████████████████████████████\n███████████████████████████████████████████████████████████████       ███████████████████████████████████████████████\n███████████████████████████████████████████████████████████████       ███████████████████████████████████████████████\n██████████████████████████████████████████████████████████████ ██████████████████████████████████████████████████████\n               ████████████████████████                       ████████████████████████████████████████████████       \n               ████████████████████████                       ████████████████████████████████████████████████       \n               ████████████████████████                       ████████████████████████████████████████████████       \n                ███████████████████████                       ████████████████████████████████████████████████       \n                                                       ███████████████████████████████████████████████████████       \n                                                       ███████████████████████████████████████████████████████       \n                                                       ███████████████████████████████████████████████████████       \n                                                       ███████████████████████████████████████████████████████       \n                                                              ████████████████████████████████████████████████       \n                                                              ████████████████████████████████████████████████       \n                                                              ████████████████████████████████████████████████       \n                                                              ████████████████████████████████████████████████       \n                                                              ████████████████████████████████████████████████       \n                                                              ████████████████████████████████████████████████       \n                                                              ████████████████████████████████████████████████       \n                                                              ████████████████████████████████████████████████       \n                                                               ███████████████████████████████████████████████       \n                                                                      ████████████████████████████████████████       \n                                                                      ████████████████████████████████████████       \n                                                                      ████████████████████████████████████████       \n                                                                      ████████████████████████████████████████       \n                                                                                      ████████████████               \n                                                                                      ████████████████               \n                                                                                      ████████████████               \n                                                                                      ████████████████               \n                                                                                                                     \n                                                                                                                     \n                                                                                                                     \n",
                            }),
                          }),
                        ],
                      }),
                      (0, o.jsx)("div", {
                        className: "container",
                        children: (0, o.jsxs)("div", {
                          className: "mac-terminal",
                          children: [
                            (0, o.jsxs)("div", {
                              className: "header",
                              children: [
                                (0, o.jsxs)("div", {
                                  className: "header__op",
                                  children: [
                                    (0, o.jsx)("span", {
                                      className:
                                        "header__op-icon header__op-icon--red",
                                    }),
                                    (0, o.jsx)("span", {
                                      className:
                                        "header__op-icon header__op-icon--yellow",
                                    }),
                                    (0, o.jsx)("span", {
                                      className:
                                        "header__op-icon header__op-icon--green",
                                    }),
                                  ],
                                }),
                                (0, o.jsx)("div", {
                                  className: "header__title",
                                  children: "ACT I",
                                }),
                                (0, o.jsx)("div", {
                                  className: "header__empty",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body",
                              children: [
                                (0, o.jsxs)("div", {
                                  className: "body__row",
                                  children: [
                                    (0, o.jsx)("span", {
                                      className: "body__row-arrow",
                                    }),
                                    (0, o.jsx)("span", {
                                      className: "body__row-folder",
                                      children: "contract-address",
                                    }),
                                    (0, o.jsx)("span", {
                                      className: "body__row-git--label",
                                      children: ":",
                                    }),
                                    (0, o.jsx)("span", {
                                      className: "body__row-git--branch",
                                      children: "CA",
                                    }),
                                    (0, o.jsx)("span", {
                                      className: "body__row-result",
                                      style: { color: "#39FF14" },
                                      children:
                                        "GJAFwWjJ3vnTsrQVabjBVK2TYB1YtRCQXRDfDgUnpump",
                                    }),
                                  ],
                                }),
                                (0, o.jsxs)("div", {
                                  className: "body__row",
                                  children: [
                                    (0, o.jsx)("span", {
                                      className: "body__row-arrow",
                                    }),
                                    (0, o.jsx)("span", {
                                      className: "body__row-folder",
                                      children: "contact",
                                    }),
                                    (0, o.jsx)("span", {
                                      className: "body__row-git--label",
                                      children: ":",
                                    }),
                                    (0, o.jsx)("span", {
                                      className: "body__row-result",
                                      style: { color: "#39FF14" },
                                      children: "team@actsol.xyz",
                                    }),
                                    (0, o.jsx)("span", {
                                      className: "body__row-cursor",
                                    }),
                                  ],
                                }),
                                (0, o.jsxs)("div", {
                                  className: "body__row",
                                  children: [
                                    (0, o.jsx)("span", {
                                      className: "body__row-arrow",
                                    }),
                                    (0, o.jsx)("span", {
                                      className: "body__row-result",
                                      style: { color: "#53F2E6" },
                                      children:
                                        "Our mission is to become the definitive index of all AI agents,",
                                    }),
                                    (0, o.jsx)("span", {
                                      className: "body__row-result",
                                      style: { color: "#53F2E6" },
                                      children:
                                        "setting the standard for what's possible when AI meets meme culture.",
                                    }),
                                    (0, o.jsx)("span", {
                                      className: "body__row-cursor",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, o.jsx)("div", {
                    className: s().OKXMain,
                    children: (0, o.jsx)(function () {
                      let n = !1;
                      return ((0, c.useEffect)(() => {
                        n = !1;
                        try {
                          if (
                            (console.log(window.phantom),
                            console.log(n),
                            void 0 !== window.phantom)
                          ) {
                            let t = window.phantom.solana,
                              o = [
                                {
                                  event: "ON_CONNECT_WALLET",
                                  handler: () => {
                                    try {
                                      t.connect();
                                    } catch (e) {
                                      alert(
                                        "You need to have Phantom on your browser."
                                      ),
                                        (n = !0);
                                    }
                                  },
                                },
                              ],
                              a = (0, l.SZ)(e.current, {
                                params: {
                                  width: 375,
                                  providerType: "SOLANA",
                                  theme: "dark",
                                  tradeType: "swap",
                                  lang: "unknown",
                                  baseUrl: "https://www.okx.com",
                                  tokenPair: {
                                    fromChain: 501,
                                    toChain: 501,
                                    fromToken:
                                      "So11111111111111111111111111111111111111111",
                                    toToken:
                                      "GJAFwWjJ3vnTsrQVabjBVK2TYB1YtRCQXRDfDgUnpump",
                                  },
                                },
                                provider: t,
                                listeners: o,
                              });
                            return () => {
                              a.destroy();
                            };
                          }
                          n = !0;
                        } catch (e) {
                          n = !0;
                        }
                      }, []),
                      n)
                        ? (console.log("phantom error"),
                          (0, o.jsx)("div", { children: "Test" }))
                        : (console.log("no error"),
                          (0, o.jsx)("div", { ref: e }));
                    }, {}),
                  }),
                  (0, o.jsx)("div", {
                    className: s().alts,
                    children: (0, o.jsx)("img", {
                      className: s().thumbGif,
                      src: "./thumb-gif.gif",
                    }),
                  }),
                  (0, o.jsx)("div", {
                    className: "container",
                    children: (0, o.jsxs)("div", {
                      className: "mac-terminal",
                      children: [
                        (0, o.jsxs)("div", {
                          className: "header",
                          children: [
                            (0, o.jsxs)("div", {
                              className: "header__op",
                              children: [
                                (0, o.jsx)("span", {
                                  className:
                                    "header__op-icon header__op-icon--red",
                                }),
                                (0, o.jsx)("span", {
                                  className:
                                    "header__op-icon header__op-icon--yellow",
                                }),
                                (0, o.jsx)("span", {
                                  className:
                                    "header__op-icon header__op-icon--green",
                                }),
                              ],
                            }),
                            (0, o.jsx)("div", {
                              className: "header__title",
                              children:
                                "Act I is one of the most important milestone in AI history.",
                            }),
                            (0, o.jsx)("div", { className: "header__empty" }),
                          ],
                        }),
                        (0, o.jsxs)("div", {
                          className: "body",
                          children: [
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-arrow",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-folder",
                                  children: "act-resources",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: "git:",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: "(",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "master",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: ")",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-result",
                                  children:
                                    "$ACT stands for AI Community Token and its story is one of resilience, unity, and growth, bridging the Crypto communities. The $ACT project started with the ambition of creating a decentralized community focused on the advancement of AI research, education, and collaboration. Through $ACT, enthusiasts, developers, innovators, and community members are coming together to promote AI literacy, make AI accessible, and empower people to understand and engage with this transformative technology.",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-folder",
                                  children:
                                    "The Role of AmplifiedAmp and ACT I",
                                }),
                                (0, o.jsx)("span", { children: "\xa0 " }),
                                (0, o.jsx)("span", {
                                  children:
                                    " ACT I was initially co-founded by AmplifiedAmp (Amp), who promised the community that the project would focus on fostering a decentralized, community-driven ecosystem. $ACT would be the funding vehicle through the 6% of the supply that was sent to Amp. However, as the project developed, Amp’s actions told a different story. Over time, it became clear that Amp was continuously obsessed with money at the cost of the $ACT community who were working tirelessly to stabilise the price through community effort. Amp kept selling $ACT tokens, benefiting financially while making statements that led the community to believe they were an ally working for the collective benefit.",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "b11a198",
                                }),
                                (0, o.jsx)("span", { children: "\xa0 " }),
                                (0, o.jsx)("span", {
                                  children:
                                    "Eventually, Amp sold all their $ACT tokens at once, leaving many in the community feeling disillusioned and betrayed. But while Amp’s actions seemed to challenge the project’s stability, this unexpected shift also sparked a wave of resilience within the community. Instead of giving up, community members banded together, determined to see the project through, free from any controlling influence. Amp’s departure, though abrupt, became a turning point, giving the community the freedom to rebuild $ACT as they envisioned.",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch-time",
                                  children: "\xa0(4)\xa0",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--author",
                                  children: "<actai>",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-arrow",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-folder",
                                  children:
                                    "The Community’s Resilience and Newfound Purpose",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: "git:",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: "(",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "master",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: ")",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-result",
                                  children:
                                    "After Amp’s exit, the $ACT community emerged stronger and more unified, embracing the opportunity to fully direct the project’s future. One significant outcome of Amp’s actions was that ACT I ended up funded with over $1 million, securing the project financially. The community now had both the motivation and the resources to continue advancing $ACT’s mission.",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "c91h771",
                                }),
                                (0, o.jsx)("span", { children: "\xa0 " }),
                                (0, o.jsx)("span", {
                                  children:
                                    "This community-driven revival marked the beginning of a new chapter. With a renewed focus, the $ACT community is dedicated to supporting AI knowledge-sharing and education on a global scale. Community members stepped into leadership roles, collaborating to make $ACT a true hub for AI enthusiasts and learners alike.",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "a61h222",
                                }),
                                (0, o.jsx)("span", { children: "\xa0 " }),
                                (0, o.jsx)("span", {
                                  children:
                                    "Also the part about almost becoming homeless is real, my runway is currently 1 month long, i'll prioritize redistributing additional funding to other researchers whom I think are or could be good contributors to Act I and my universal love and cooperation agenda.",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-arrow",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-folder",
                                  children:
                                    "The Mission of $ACT: Spreading Knowledge and Empowering People",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: "git:",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: "(",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "master",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: ")",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-result",
                                  children:
                                    "The $ACT project is now a decentralized AI community with the core mission of democratizing AI knowledge and making it accessible to everyone. Through various initiatives, resources, and community-driven content, $ACT aims to break down barriers to AI understanding. The community focuses on projects that educate people on AI basics, encourage ethical AI discussions, and support research and development in the field.",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch-time",
                                  children: "\xa0(2 minutes)\xa0",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--author",
                                  children: "<actai>",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-arrow",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-folder",
                                  children: "Key Aspects of the $ACT Ecosystem",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: "git:",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: "(",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "master",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: ")",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-result",
                                  children:
                                    "Education and Awareness: $ACT is committed to helping people understand AI’s potential and risks, ensuring that knowledge is accessible to everyone.",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch-time",
                                  children: "\xa0(2 minutes)\xa0",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--author",
                                  children: "<actai>",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "ss23h11",
                                }),
                                (0, o.jsx)("span", { children: "\xa0 " }),
                                (0, o.jsx)("span", {
                                  children:
                                    "Decentralized Community: Since Amp’s exit, $ACT has been a fully community-driven project, with decisions made collaboratively by dedicated members. The $ACT community serves as a way for anyone to participate in the crypto-AI ecosystem and support educational efforts around AI projects.",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "ss23h11",
                                }),
                                (0, o.jsx)("span", { children: "\xa0 " }),
                                (0, o.jsx)("span", {
                                  children:
                                    "Decentralized Community: Since Amp’s exit, $ACT has been a fully community-driven project, with decisions made collaboratively by dedicated members. The $ACT community serves as a way for anyone to participate in the crypto-AI ecosystem and support educational efforts around AI projects.",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "ss23h11",
                                }),
                                (0, o.jsx)("span", { children: "\xa0 " }),
                                (0, o.jsx)("span", {
                                  children:
                                    "AI Project Support: Through ACT I and ongoing projects, $ACT supports AI development initiatives, fostering innovation and learning opportunities.",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-arrow",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-folder",
                                  children: "The Narrative Going Forward",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: "git:",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: "(",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "master",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--label",
                                  children: ")",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-result",
                                  children:
                                    "Thanks to Amp’s departure, the $ACT community is no longer weighed down by centralized control. The betrayal turned into an unexpected advantage, as it ultimately gave the community full ownership of the project and has provided ACT I over a million dollars in funding. The community has embraced this fresh start, taking pride in their autonomy and resilience.",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch-time",
                                  children: "\xa0(5 minutes)\xa0",
                                }),
                                (0, o.jsx)("span", {
                                  className: "body__row-git--author",
                                  children: "<actai>",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "n22g133",
                                }),
                                (0, o.jsx)("span", { children: "\xa0 " }),
                                (0, o.jsx)("span", {
                                  children:
                                    "Now, $ACT is more than just a token or a project; it represents the power of community, education, and shared vision. Free from Amp’s influence, the community is driven by a collective goal to advance AI knowledge and make a positive impact on the future of technology.",
                                }),
                              ],
                            }),
                            (0, o.jsxs)("div", {
                              className: "body__row",
                              children: [
                                (0, o.jsx)("span", {
                                  className: "body__row-git--branch",
                                  children: "n22g133",
                                }),
                                (0, o.jsx)("span", { children: "\xa0 " }),
                                (0, o.jsx)("span", {
                                  children:
                                    "In essence, $ACT stands as an AI-powered crypto community that is fully owned, governed, and inspired by its members. As the journey continues, the community is eager to build a legacy that reflects the strength and potential of decentralized collaboration in the AI era.",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, o.jsx)("div", {
                    className: s().alts,
                    children: (0, o.jsxs)("div", {
                      className: s().photoShoot,
                      children: [
                        (0, o.jsx)("pre", {
                          className: s().photoShootTitle,
                          children:
                            "               AAA                  CCCCCCCCCCCCCTTTTTTTTTTTTTTTTTTTTTTT                    AAA               IIIIIIIIII\n              A:::A              CCC::::::::::::CT:::::::::::::::::::::T                   A:::A              I::::::::I\n             A:::::A           CC:::::::::::::::CT:::::::::::::::::::::T                  A:::::A             I::::::::I\n            A:::::::A         C:::::CCCCCCCC::::CT:::::TT:::::::TT:::::T                 A:::::::A            II::::::II\n           A:::::::::A       C:::::C       CCCCCCTTTTTT  T:::::T  TTTTTT                A:::::::::A             I::::I  \n          A:::::A:::::A     C:::::C                      T:::::T                       A:::::A:::::A            I::::I  \n         A:::::A A:::::A    C:::::C                      T:::::T                      A:::::A A:::::A           I::::I  \n        A:::::A   A:::::A   C:::::C                      T:::::T                     A:::::A   A:::::A          I::::I  \n       A:::::A     A:::::A  C:::::C                      T:::::T                    A:::::A     A:::::A         I::::I  \n      A:::::AAAAAAAAA:::::A C:::::C                      T:::::T                   A:::::AAAAAAAAA:::::A        I::::I  \n     A:::::::::::::::::::::AC:::::C                      T:::::T                  A:::::::::::::::::::::A       I::::I  \n    A:::::AAAAAAAAAAAAA:::::AC:::::C       CCCCCC        T:::::T                 A:::::AAAAAAAAAAAAA:::::A      I::::I  \n   A:::::A             A:::::AC:::::CCCCCCCC::::C      TT:::::::TT              A:::::A             A:::::A   II::::::II\n  A:::::A               A:::::ACC:::::::::::::::C      T:::::::::T             A:::::A               A:::::A  I::::::::I\n A:::::A                 A:::::A CCC::::::::::::C      T:::::::::T            A:::::A                 A:::::A I::::::::I\nAAAAAAA                   AAAAAAA   CCCCCCCCCCCCC      TTTTTTTTTTT           AAAAAAA                   AAAAAAAIIIIIIIIII\nPPPPPPPPPPPPPPPPP   HHHHHHHHH     HHHHHHHHH     OOOOOOOOO     TTTTTTTTTTTTTTTTTTTTTTT     OOOOOOOOO                     \nP::::::::::::::::P  H:::::::H     H:::::::H   OO:::::::::OO   T:::::::::::::::::::::T   OO:::::::::OO                   \nP::::::PPPPPP:::::P H:::::::H     H:::::::H OO:::::::::::::OO T:::::::::::::::::::::T OO:::::::::::::OO                 \nPP:::::P     P:::::PHH::::::H     H::::::HHO:::::::OOO:::::::OT:::::TT:::::::TT:::::TO:::::::OOO:::::::O                \n  P::::P     P:::::P  H:::::H     H:::::H  O::::::O   O::::::OTTTTTT  T:::::T  TTTTTTO::::::O   O::::::O                \n  P::::P     P:::::P  H:::::H     H:::::H  O:::::O     O:::::O        T:::::T        O:::::O     O:::::O                \n  P::::PPPPPP:::::P   H::::::HHHHH::::::H  O:::::O     O:::::O        T:::::T        O:::::O     O:::::O                \n  P:::::::::::::PP    H:::::::::::::::::H  O:::::O     O:::::O        T:::::T        O:::::O     O:::::O                \n  P::::PPPPPPPPP      H:::::::::::::::::H  O:::::O     O:::::O        T:::::T        O:::::O     O:::::O                \n  P::::P              H::::::HHHHH::::::H  O:::::O     O:::::O        T:::::T        O:::::O     O:::::O                \n  P::::P              H:::::H     H:::::H  O:::::O     O:::::O        T:::::T        O:::::O     O:::::O                \n  P::::P              H:::::H     H:::::H  O::::::O   O::::::O        T:::::T        O::::::O   O::::::O                \nPP::::::PP          HH::::::H     H::::::HHO:::::::OOO:::::::O      TT:::::::TT      O:::::::OOO:::::::O                \nP::::::::P          H:::::::H     H:::::::H OO:::::::::::::OO       T:::::::::T       OO:::::::::::::OO                 \nP::::::::P          H:::::::H     H:::::::H   OO:::::::::OO         T:::::::::T         OO:::::::::OO                   \nPPPPPPPPPP          HHHHHHHHH     HHHHHHHHH     OOOOOOOOO           TTTTTTTTTTT           OOOOOOOOO                     \n   SSSSSSSSSSSSSSS HHHHHHHHH     HHHHHHHHH     OOOOOOOOO          OOOOOOOOO     TTTTTTTTTTTTTTTTTTTTTTT                 \n SS:::::::::::::::SH:::::::H     H:::::::H   OO:::::::::OO      OO:::::::::OO   T:::::::::::::::::::::T                 \nS:::::SSSSSS::::::SH:::::::H     H:::::::H OO:::::::::::::OO  OO:::::::::::::OO T:::::::::::::::::::::T                 \nS:::::S     SSSSSSSHH::::::H     H::::::HHO:::::::OOO:::::::OO:::::::OOO:::::::OT:::::TT:::::::TT:::::T                 \nS:::::S              H:::::H     H:::::H  O::::::O   O::::::OO::::::O   O::::::OTTTTTT  T:::::T  TTTTTT                 \nS:::::S              H:::::H     H:::::H  O:::::O     O:::::OO:::::O     O:::::O        T:::::T                         \n S::::SSSS           H::::::HHHHH::::::H  O:::::O     O:::::OO:::::O     O:::::O        T:::::T                         \n  SS::::::SSSSS      H:::::::::::::::::H  O:::::O     O:::::OO:::::O     O:::::O        T:::::T                         \n    SSS::::::::SS    H:::::::::::::::::H  O:::::O     O:::::OO:::::O     O:::::O        T:::::T                         \n       SSSSSS::::S   H::::::HHHHH::::::H  O:::::O     O:::::OO:::::O     O:::::O        T:::::T                         \n            S:::::S  H:::::H     H:::::H  O:::::O     O:::::OO:::::O     O:::::O        T:::::T                         \n            S:::::S  H:::::H     H:::::H  O::::::O   O::::::OO::::::O   O::::::O        T:::::T                         \nSSSSSSS     S:::::SHH::::::H     H::::::HHO:::::::OOO:::::::OO:::::::OOO:::::::O      TT:::::::TT                       \nS::::::SSSSSS:::::SH:::::::H     H:::::::H OO:::::::::::::OO  OO:::::::::::::OO       T:::::::::T                       \nS:::::::::::::::SS H:::::::H     H:::::::H   OO:::::::::OO      OO:::::::::OO         T:::::::::T                       \n SSSSSSSSSSSSSSS   HHHHHHHHH     HHHHHHHHH     OOOOOOOOO          OOOOOOOOO           TTTTTTTTTTT                       \n                                                                                                                        \n                                                                                                                        \n                                                                                                                        \n                                                                                                                        ",
                        }),
                        (0, o.jsxs)("div", {
                          className: s().photoShootParent,
                          children: [
                            (0, o.jsx)("img", {
                              className: s().photoShootChild,
                              src: "./shoot1.jpg",
                            }),
                            (0, o.jsx)("img", {
                              className: s().photoShootChild,
                              src: "./shoot2.jpg",
                            }),
                            (0, o.jsx)("img", {
                              className: s().photoShootChild,
                              src: "./shoot3.jpg",
                            }),
                            (0, o.jsx)("img", {
                              className: s().photoShootChild,
                              src: "./shoot4.jpg",
                            }),
                            (0, o.jsx)("img", {
                              className: s().photoShootChild,
                              src: "./shoot5.jpg",
                            }),
                            (0, o.jsx)("img", {
                              className: s().photoShootChild,
                              src: "./shoot6.jpg",
                            }),
                            (0, o.jsx)("img", {
                              className: s().photoShootChild,
                              src: "./shoot7.jpg",
                            }),
                            (0, o.jsx)("img", {
                              className: s().photoShootChild,
                              src: "./shoot8.jpg",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          })
        );
      }
    },
    8005: (e) => {
      e.exports = {
        main: "Home_main__2uIek",
        infos: "Home_infos__KQuRm",
        pfps: "Home_pfps__bMugZ",
        actPFP: "Home_actPFP__Lj_XE",
        act: "Home_act__HZ6TD",
        title: "Home_title__YEn0u",
        infoTop: "Home_infoTop__yx02a",
        alts: "Home_alts__2YBet",
        dexPaid: "Home_dexPaid__clVem",
        contractAddress: "Home_contractAddress__W_XAu",
        pump: "Home_pump__GhQHf",
        pumpTitle: "Home_pumpTitle__lfvDn",
        ascii: "Home_ascii__YbdS9",
        thumbGif: "Home_thumbGif__uqUhu",
        photoShoot: "Home_photoShoot__Y6DmA",
        photoShootTitle: "Home_photoShootTitle__YTUuk",
        photoShootParent: "Home_photoShootParent__uWdGt",
        photoShootChild: "Home_photoShootChild__olHmM",
        OKXMain: "Home_OKXMain__hCWXb",
      };
    },
    7790: () => {},
  },
  (e) => {
    var n = (n) => e((e.s = n));
    e.O(0, [873, 94, 849, 636, 593, 792], () => n(7276)), (_N_E = e.O());
  },
]);
