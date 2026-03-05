import 'clsx';
import { ae as ensure_array_like, aj as attr, ak as attr_style, al as stringify, am as attr_class, ah as escape_html, an as ssr_context, a7 as sanitize_props, a8 as spread_props, a9 as slot, a1 as derived } from './index-2btcPTF8.js';
import { f as formatTime, a as formatDate, i as isToday, b as isTomorrow } from './dates-CjMa0hVO.js';
import { I as Icon } from './Icon-B7iUC0Tg.js';

function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Bot($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["path", { "d": "M12 8V4H8" }],
    [
      "rect",
      { "width": "16", "height": "12", "x": "4", "y": "8", "rx": "2" }
    ],
    ["path", { "d": "M2 14h2" }],
    ["path", { "d": "M20 14h2" }],
    ["path", { "d": "M15 13v2" }],
    ["path", { "d": "M9 13v2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "bot" },
    $$sanitized_props,
    {
      /**
       * @component @name Bot
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgOFY0SDgiIC8+CiAgPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiB4PSI0IiB5PSI4IiByeD0iMiIgLz4KICA8cGF0aCBkPSJNMiAxNGgyIiAvPgogIDxwYXRoIGQ9Ik0yMCAxNGgyIiAvPgogIDxwYXRoIGQ9Ik0xNSAxM3YyIiAvPgogIDxwYXRoIGQ9Ik05IDEzdjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/bot
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Calendar($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "rect",
      { "width": "18", "height": "18", "x": "3", "y": "4", "rx": "2" }
    ],
    ["path", { "d": "M3 10h18" }]
  ];
  Icon($$renderer, spread_props([
    { name: "calendar" },
    $$sanitized_props,
    {
      /**
       * @component @name Calendar
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOCAydjQiIC8+CiAgPHBhdGggZD0iTTE2IDJ2NCIgLz4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjQiIHJ4PSIyIiAvPgogIDxwYXRoIGQ9Ik0zIDEwaDE4IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/calendar
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function External_link($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["path", { "d": "M15 3h6v6" }],
    ["path", { "d": "M10 14 21 3" }],
    [
      "path",
      {
        "d": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "external-link" },
    $$sanitized_props,
    {
      /**
       * @component @name ExternalLink
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUgM2g2djYiIC8+CiAgPHBhdGggZD0iTTEwIDE0IDIxIDMiIC8+CiAgPHBhdGggZD0iTTE4IDEzdjZhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWOGEyIDIgMCAwIDEgMi0yaDYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/external-link
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Globe($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    [
      "path",
      { "d": "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }
    ],
    ["path", { "d": "M2 12h20" }]
  ];
  Icon($$renderer, spread_props([
    { name: "globe" },
    $$sanitized_props,
    {
      /**
       * @component @name Globe
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJNMTIgMmExNC41IDE0LjUgMCAwIDAgMCAyMCAxNC41IDE0LjUgMCAwIDAgMC0yMCIgLz4KICA8cGF0aCBkPSJNMiAxMmgyMCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/globe
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Minus($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [["path", { "d": "M5 12h14" }]];
  Icon($$renderer, spread_props([
    { name: "minus" },
    $$sanitized_props,
    {
      /**
       * @component @name Minus
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAxMmgxNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/minus
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Music($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["path", { "d": "M9 18V5l12-2v13" }],
    ["circle", { "cx": "6", "cy": "18", "r": "3" }],
    ["circle", { "cx": "18", "cy": "16", "r": "3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "music" },
    $$sanitized_props,
    {
      /**
       * @component @name Music
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOSAxOFY1bDEyLTJ2MTMiIC8+CiAgPGNpcmNsZSBjeD0iNiIgY3k9IjE4IiByPSIzIiAvPgogIDxjaXJjbGUgY3g9IjE4IiBjeT0iMTYiIHI9IjMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/music
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Play($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [["polygon", { "points": "6 3 20 12 6 21 6 3" }]];
  Icon($$renderer, spread_props([
    { name: "play" },
    $$sanitized_props,
    {
      /**
       * @component @name Play
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWdvbiBwb2ludHM9IjYgMyAyMCAxMiA2IDIxIDYgMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/play
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Plus($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]];
  Icon($$renderer, spread_props([
    { name: "plus" },
    $$sanitized_props,
    {
      /**
       * @component @name Plus
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAxMmgxNCIgLz4KICA8cGF0aCBkPSJNMTIgNXYxNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/plus
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Refresh_cw($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    [
      "path",
      { "d": "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }
    ],
    ["path", { "d": "M21 3v5h-5" }],
    [
      "path",
      { "d": "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }
    ],
    ["path", { "d": "M8 16H3v5" }]
  ];
  Icon($$renderer, spread_props([
    { name: "refresh-cw" },
    $$sanitized_props,
    {
      /**
       * @component @name RefreshCw
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyAxMmE5IDkgMCAwIDEgOS05IDkuNzUgOS43NSAwIDAgMSA2Ljc0IDIuNzRMMjEgOCIgLz4KICA8cGF0aCBkPSJNMjEgM3Y1aC01IiAvPgogIDxwYXRoIGQ9Ik0yMSAxMmE5IDkgMCAwIDEtOSA5IDkuNzUgOS43NSAwIDAgMS02Ljc0LTIuNzRMMyAxNiIgLz4KICA8cGF0aCBkPSJNOCAxNkgzdjUiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/refresh-cw
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Rotate_ccw($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    [
      "path",
      { "d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }
    ],
    ["path", { "d": "M3 3v5h5" }]
  ];
  Icon($$renderer, spread_props([
    { name: "rotate-ccw" },
    $$sanitized_props,
    {
      /**
       * @component @name RotateCcw
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyAxMmE5IDkgMCAxIDAgOS05IDkuNzUgOS43NSAwIDAgMC02Ljc0IDIuNzRMMyA4IiAvPgogIDxwYXRoIGQ9Ik0zIDN2NWg1IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/rotate-ccw
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Rss($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["path", { "d": "M4 11a9 9 0 0 1 9 9" }],
    ["path", { "d": "M4 4a16 16 0 0 1 16 16" }],
    ["circle", { "cx": "5", "cy": "19", "r": "1" }]
  ];
  Icon($$renderer, spread_props([
    { name: "rss" },
    $$sanitized_props,
    {
      /**
       * @component @name Rss
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNCAxMWE5IDkgMCAwIDEgOSA5IiAvPgogIDxwYXRoIGQ9Ik00IDRhMTYgMTYgMCAwIDEgMTYgMTYiIC8+CiAgPGNpcmNsZSBjeD0iNSIgY3k9IjE5IiByPSIxIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/rss
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Send($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
      }
    ],
    ["path", { "d": "m21.854 2.147-10.94 10.939" }]
  ];
  Icon($$renderer, spread_props([
    { name: "send" },
    $$sanitized_props,
    {
      /**
       * @component @name Send
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTQuNTM2IDIxLjY4NmEuNS41IDAgMCAwIC45MzctLjAyNGw2LjUtMTlhLjQ5Ni40OTYgMCAwIDAtLjYzNS0uNjM1bC0xOSA2LjVhLjUuNSAwIDAgMC0uMDI0LjkzN2w3LjkzIDMuMThhMiAyIDAgMCAxIDEuMTEyIDEuMTF6IiAvPgogIDxwYXRoIGQ9Im0yMS44NTQgMi4xNDctMTAuOTQgMTAuOTM5IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/send
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Settings($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      }
    ],
    ["circle", { "cx": "12", "cy": "12", "r": "3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "settings" },
    $$sanitized_props,
    {
      /**
       * @component @name Settings
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIuMjIgMmgtLjQ0YTIgMiAwIDAgMC0yIDJ2LjE4YTIgMiAwIDAgMS0xIDEuNzNsLS40My4yNWEyIDIgMCAwIDEtMiAwbC0uMTUtLjA4YTIgMiAwIDAgMC0yLjczLjczbC0uMjIuMzhhMiAyIDAgMCAwIC43MyAyLjczbC4xNS4xYTIgMiAwIDAgMSAxIDEuNzJ2LjUxYTIgMiAwIDAgMS0xIDEuNzRsLS4xNS4wOWEyIDIgMCAwIDAtLjczIDIuNzNsLjIyLjM4YTIgMiAwIDAgMCAyLjczLjczbC4xNS0uMDhhMiAyIDAgMCAxIDIgMGwuNDMuMjVhMiAyIDAgMCAxIDEgMS43M1YyMGEyIDIgMCAwIDAgMiAyaC40NGEyIDIgMCAwIDAgMi0ydi0uMThhMiAyIDAgMCAxIDEtMS43M2wuNDMtLjI1YTIgMiAwIDAgMSAyIDBsLjE1LjA4YTIgMiAwIDAgMCAyLjczLS43M2wuMjItLjM5YTIgMiAwIDAgMC0uNzMtMi43M2wtLjE1LS4wOGEyIDIgMCAwIDEtMS0xLjc0di0uNWEyIDIgMCAwIDEgMS0xLjc0bC4xNS0uMDlhMiAyIDAgMCAwIC43My0yLjczbC0uMjItLjM4YTIgMiAwIDAgMC0yLjczLS43M2wtLjE1LjA4YTIgMiAwIDAgMS0yIDBsLS40My0uMjVhMiAyIDAgMCAxLTEtMS43M1Y0YTIgMiAwIDAgMC0yLTJ6IiAvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/settings
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Skip_forward($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["polygon", { "points": "5 4 15 12 5 20 5 4" }],
    ["line", { "x1": "19", "x2": "19", "y1": "5", "y2": "19" }]
  ];
  Icon($$renderer, spread_props([
    { name: "skip-forward" },
    $$sanitized_props,
    {
      /**
       * @component @name SkipForward
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWdvbiBwb2ludHM9IjUgNCAxNSAxMiA1IDIwIDUgNCIgLz4KICA8bGluZSB4MT0iMTkiIHgyPSIxOSIgeTE9IjUiIHkyPSIxOSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/skip-forward
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Trash_2($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    ["path", { "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }],
    ["path", { "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }],
    ["line", { "x1": "10", "x2": "10", "y1": "11", "y2": "17" }],
    ["line", { "x1": "14", "x2": "14", "y1": "11", "y2": "17" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trash-2" },
    $$sanitized_props,
    {
      /**
       * @component @name Trash2
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyA2aDE4IiAvPgogIDxwYXRoIGQ9Ik0xOSA2djE0YzAgMS0xIDItMiAySDdjLTEgMC0yLTEtMi0yVjYiIC8+CiAgPHBhdGggZD0iTTggNlY0YzAtMSAxLTIgMi0yaDRjMSAwIDIgMSAyIDJ2MiIgLz4KICA8bGluZSB4MT0iMTAiIHgyPSIxMCIgeTE9IjExIiB5Mj0iMTciIC8+CiAgPGxpbmUgeDE9IjE0IiB4Mj0iMTQiIHkxPSIxMSIgeTI9IjE3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/trash-2
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Trending_down($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["polyline", { "points": "22 17 13.5 8.5 8.5 13.5 2 7" }],
    ["polyline", { "points": "16 17 22 17 22 11" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trending-down" },
    $$sanitized_props,
    {
      /**
       * @component @name TrendingDown
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWxpbmUgcG9pbnRzPSIyMiAxNyAxMy41IDguNSA4LjUgMTMuNSAyIDciIC8+CiAgPHBvbHlsaW5lIHBvaW50cz0iMTYgMTcgMjIgMTcgMjIgMTEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/trending-down
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Trending_up($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["polyline", { "points": "22 7 13.5 15.5 8.5 10.5 2 17" }],
    ["polyline", { "points": "16 7 22 7 22 13" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trending-up" },
    $$sanitized_props,
    {
      /**
       * @component @name TrendingUp
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWxpbmUgcG9pbnRzPSIyMiA3IDEzLjUgMTUuNSA4LjUgMTAuNSAyIDE3IiAvPgogIDxwb2x5bGluZSBwb2ludHM9IjE2IDcgMjIgNyAyMiAxMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/trending-up
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function User($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.475.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["path", { "d": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }],
    ["circle", { "cx": "12", "cy": "7", "r": "4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "user" },
    $$sanitized_props,
    {
      /**
       * @component @name User
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTkgMjF2LTJhNCA0IDAgMCAwLTQtNEg5YTQgNCAwIDAgMC00IDR2MiIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/user
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function DashboardGrid($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { layouts, children } = $$props;
    $$renderer2.push(`<div class="dashboard-grid"><!--[-->`);
    const each_array = ensure_array_like(layouts.filter((l) => l.visible));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let layout = each_array[$$index];
      $$renderer2.push(`<div${attr("data-widget", layout.widgetType)}${attr_style(` grid-column: ${stringify(layout.colStart)} / ${stringify(layout.colEnd)}; grid-row: ${stringify(layout.rowStart)} / ${stringify(layout.rowEnd)}; min-height: 0; `)}>`);
      children($$renderer2, layout);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function QuoteSplash($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function QuoteWidget($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { quote } = $$props;
    $$renderer2.push(`<div class="flex h-full flex-col items-center justify-center px-8 py-4 text-center">`);
    if (quote) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<blockquote class="text-lg font-light italic md:text-xl" style="color: var(--text);">"${escape_html(quote.text)}"</blockquote> <cite class="mt-3 text-sm not-italic gradient-text font-medium">— ${escape_html(quote.author)}</cite>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p style="color: var(--text-muted);">No quote today.</p>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function WidgetContainer($$renderer, $$props) {
  let { title, children, actions, class: cls = "", scrollable = true } = $$props;
  $$renderer.push(`<div${attr_class(`widget-card flex h-full flex-col ${stringify(cls)}`)}><div class="widget-header-divider relative z-10 flex items-center justify-between px-4 py-3" style="border-bottom: 1px solid;"><h2 class="text-xs font-semibold tracking-widest uppercase" style="color: var(--text-muted);">${escape_html(title)}</h2> `);
  if (actions) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div class="flex items-center gap-2">`);
    actions($$renderer);
    $$renderer.push(`<!----></div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div> <div${attr_class(`relative z-10 flex-1 ${stringify(scrollable ? "overflow-y-auto" : "overflow-hidden")}`)}>`);
  children($$renderer);
  $$renderer.push(`<!----></div></div>`);
}
function CalendarWidget($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { events = [], icsSubscriptions: initialSubs = [] } = $$props;
    let subs = initialSubs;
    let localEvents = events;
    function dayLabel(iso) {
      if (isToday(iso)) return "Today";
      if (isTomorrow(iso)) return "Tomorrow";
      return formatDate(iso, { weekday: "short", month: "short", day: "numeric" });
    }
    {
      let actions = function($$renderer3) {
        $$renderer3.push(`<button class="rounded p-1 hover:bg-[var(--surface-alt)] text-xs text-[var(--text-muted)]" title="Manage calendars">`);
        Calendar($$renderer3, { size: 14 });
        $$renderer3.push(`<!----></button> <button class="rounded p-1 hover:bg-[var(--surface-alt)]" title="Add calendar">`);
        Plus($$renderer3, { size: 14, class: "text-[var(--accent)]" });
        $$renderer3.push(`<!----></button>`);
      };
      WidgetContainer($$renderer2, {
        title: "Calendar",
        actions,
        children: ($$renderer3) => {
          {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--> `);
          {
            $$renderer3.push("<!--[0-->");
            if (localEvents.length === 0) {
              $$renderer3.push("<!--[0-->");
              $$renderer3.push(`<div class="flex h-full flex-col items-center justify-center gap-3 p-6">`);
              Calendar($$renderer3, { size: 36, class: "text-[var(--text-muted)]" });
              $$renderer3.push(`<!----> `);
              if (subs.length === 0) {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<p class="text-center text-sm text-[var(--text-muted)]">Add a calendar using the <strong>+</strong> button above.</p> <p class="text-center text-xs text-[var(--text-muted)] leading-relaxed">Get your ICS URL from Google Calendar:<br/> Settings → [Calendar] → <em>Secret address in iCal format</em></p>`);
              } else {
                $$renderer3.push("<!--[-1-->");
                $$renderer3.push(`<p class="text-sm text-[var(--text-muted)]">No upcoming events</p>`);
              }
              $$renderer3.push(`<!--]--></div>`);
            } else {
              $$renderer3.push("<!--[-1-->");
              $$renderer3.push(`<ul class="divide-y divide-[var(--border)]"><!--[-->`);
              const each_array = ensure_array_like(localEvents);
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let event = each_array[$$index];
                $$renderer3.push(`<li class="px-4 py-3 hover:bg-[var(--surface-alt)]"><span class="text-xs font-semibold text-[var(--accent)]">${escape_html(dayLabel(event.startAt))}</span> <p class="mt-0.5 truncate text-sm font-medium text-[var(--text)]">${escape_html(event.title)}</p> `);
                if (event.isAllDay) {
                  $$renderer3.push("<!--[0-->");
                  $$renderer3.push(`<p class="text-xs text-[var(--text-muted)]">All day</p>`);
                } else {
                  $$renderer3.push("<!--[-1-->");
                  $$renderer3.push(`<p class="text-xs text-[var(--text-muted)]">${escape_html(formatTime(event.startAt))} – ${escape_html(formatTime(event.endAt))}</p>`);
                }
                $$renderer3.push(`<!--]--> `);
                if (event.location) {
                  $$renderer3.push("<!--[0-->");
                  $$renderer3.push(`<p class="mt-0.5 truncate text-xs text-[var(--text-muted)]">📍 ${escape_html(event.location)}</p>`);
                } else {
                  $$renderer3.push("<!--[-1-->");
                }
                $$renderer3.push(`<!--]--></li>`);
              }
              $$renderer3.push(`<!--]--></ul>`);
            }
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    }
  });
}
function PomodoroWidget($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const DURATIONS = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };
    const LABELS = { work: "FOCUS", short: "BREAK", long: "LONG" };
    const COLORS = { work: "#d43030", short: "#8090a8", long: "#5a9a6a" };
    let mode = "work";
    let timeLeft = DURATIONS.work;
    let completed = 0;
    let minutes = derived(() => Math.floor(timeLeft / 60));
    let seconds = derived(() => timeLeft % 60);
    let progress = derived(() => 1 - timeLeft / DURATIONS[mode]);
    let color = derived(() => COLORS[mode]);
    const R = 34;
    const CIRC = 2 * Math.PI * R;
    let dashOffset = derived(() => CIRC * (1 - progress()));
    function pad(n) {
      return n.toString().padStart(2, "0");
    }
    onDestroy(() => {
    });
    {
      let actions = function($$renderer3) {
        $$renderer3.push(`<button class="p-1 opacity-50 hover:opacity-100 transition-opacity" title="Reset" aria-label="Reset">`);
        Rotate_ccw($$renderer3, { size: 12, style: "color:var(--text-muted)" });
        $$renderer3.push(`<!----></button> <button class="p-1 opacity-50 hover:opacity-100 transition-opacity" title="Skip" aria-label="Skip">`);
        Skip_forward($$renderer3, { size: 12, style: "color:var(--text-muted)" });
        $$renderer3.push(`<!----></button>`);
      };
      WidgetContainer($$renderer2, {
        title: "Pomodoro",
        scrollable: false,
        actions,
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="flex h-full items-center justify-between px-5 gap-4"><div class="relative flex-shrink-0 flex items-center justify-center"><svg width="88" height="88" viewBox="0 0 88 88" style="transform:rotate(-90deg)"><circle cx="44" cy="44"${attr("r", R)} fill="none" stroke="var(--border)" stroke-width="2"></circle><circle cx="44" cy="44"${attr("r", R)} fill="none"${attr("stroke", color())} stroke-width="2" stroke-linecap="butt"${attr("stroke-dasharray", CIRC)}${attr("stroke-dashoffset", dashOffset())} style="transition: stroke-dashoffset 1s linear, stroke 0.4s ease;"></circle><!--[-->`);
          const each_array = ensure_array_like([0, 90, 180, 270]);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let deg = each_array[$$index];
            const rad = deg * Math.PI / 180;
            $$renderer3.push(`<line${attr("x1", 44 + (R - 5) * Math.cos(rad))}${attr("y1", 44 + (R - 5) * Math.sin(rad))}${attr("x2", 44 + (R + 5) * Math.cos(rad))}${attr("y2", 44 + (R + 5) * Math.sin(rad))}${attr("stroke", color())} stroke-width="1.5" style="transition: stroke 0.4s ease;"></line>`);
          }
          $$renderer3.push(`<!--]--></svg> <div class="absolute flex flex-col items-center"><span class="font-mono text-xl font-light tabular-nums" style="color:var(--text);">${escape_html(pad(minutes()))}:${escape_html(pad(seconds()))}</span> <span class="text-[9px] tracking-widest"${attr_style(`color:${stringify(color())};`)}>${escape_html(LABELS[mode])}</span></div></div> <div class="flex flex-col items-start gap-3 flex-1"><div class="flex gap-1.5"><!--[-->`);
          const each_array_1 = ensure_array_like([0, 1, 2, 3]);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let i = each_array_1[$$index_1];
            $$renderer3.push(`<div class="h-1 w-4 transition-all"${attr_style(`background:${stringify(i < completed ? COLORS.work : "var(--border)")};`)}></div>`);
          }
          $$renderer3.push(`<!--]--></div> <button class="flex items-center gap-2 px-4 py-1.5 text-xs tracking-widest uppercase transition-all"${attr_style(`border:1px solid ${stringify(color())}; color:${stringify(color())}; background:transparent;`)}>`);
          {
            $$renderer3.push("<!--[-1-->");
            Play($$renderer3, { size: 11 });
            $$renderer3.push(`<!----> START`);
          }
          $$renderer3.push(`<!--]--></button> <div class="flex gap-3"><!--[-->`);
          const each_array_2 = ensure_array_like(["work", "short", "long"]);
          for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
            let m = each_array_2[$$index_2];
            $$renderer3.push(`<button class="text-[10px] tracking-wider uppercase transition-all"${attr_style(` color:${stringify(mode === m ? COLORS[m] : "var(--text-muted)")}; border-bottom:1px solid ${stringify(mode === m ? COLORS[m] : "transparent")}; padding-bottom:1px; background:none; border-top:none; border-left:none; border-right:none; `)}>${escape_html(LABELS[m])}</button>`);
          }
          $$renderer3.push(`<!--]--></div></div></div>`);
        }
      });
    }
  });
}
function createChatStore() {
  let messages = [];
  let streamingContent = "";
  let streaming = false;
  let conversationId = null;
  return {
    get messages() {
      return messages;
    },
    get streamingContent() {
      return streamingContent;
    },
    get streaming() {
      return streaming;
    },
    init(initial, convId) {
      messages = initial;
      conversationId = convId;
    },
    async send(content) {
      const userMsg = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        createdAt: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
      };
      messages = [...messages, userMsg];
      streaming = true;
      streamingContent = "";
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, conversationId })
        });
        if (!res.ok || !res.body) {
          streaming = false;
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let assistantId = "";
        let assistantConvId = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                if (parsed.type === "text") {
                  streamingContent += parsed.text;
                } else if (parsed.type === "done") {
                  assistantId = parsed.messageId;
                  assistantConvId = parsed.conversationId;
                  conversationId = assistantConvId;
                }
              } catch {
              }
            }
          }
        }
        if (streamingContent) {
          messages = [
            ...messages,
            {
              id: assistantId || crypto.randomUUID(),
              role: "assistant",
              content: streamingContent,
              createdAt: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
            }
          ];
        }
      } finally {
        streaming = false;
        streamingContent = "";
      }
    }
  };
}
const chatStore = createChatStore();
function ChatWidget($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let input = "";
    WidgetContainer($$renderer2, {
      title: "AI Assistant",
      scrollable: false,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="flex h-full flex-col"><div class="flex-1 overflow-y-auto p-3 space-y-3">`);
        if (chatStore.messages.length === 0 && !chatStore.streamingContent) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<div class="flex flex-col items-center justify-center h-full gap-2 text-[var(--text-muted)]">`);
          Bot($$renderer3, { size: 32 });
          $$renderer3.push(`<!----> <p class="text-sm">Ask me anything…</p></div>`);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--> <!--[-->`);
        const each_array = ensure_array_like(chatStore.messages);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let msg = each_array[$$index];
          $$renderer3.push(`<div${attr_class(`flex gap-2 ${stringify(msg.role === "user" ? "flex-row-reverse" : "")}`)}><div${attr_class(`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${stringify(msg.role === "user" ? "bg-[var(--accent)]" : "bg-[var(--surface-alt)]")}`)}>`);
          if (msg.role === "user") {
            $$renderer3.push("<!--[0-->");
            User($$renderer3, { size: 12, class: "text-[var(--bg)]" });
          } else {
            $$renderer3.push("<!--[-1-->");
            Bot($$renderer3, { size: 12, class: "text-[var(--text-muted)]" });
          }
          $$renderer3.push(`<!--]--></div> <div${attr_class(`max-w-[80%] rounded-xl px-3 py-2 text-sm ${stringify(msg.role === "user" ? "bg-[var(--accent)] text-[var(--bg)]" : "bg-[var(--surface-alt)] text-[var(--text)]")}`)}>${escape_html(msg.content)}</div></div>`);
        }
        $$renderer3.push(`<!--]--> `);
        if (chatStore.streamingContent) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<div class="flex gap-2"><div class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-[var(--surface-alt)]">`);
          Bot($$renderer3, { size: 12, class: "text-[var(--text-muted)]" });
          $$renderer3.push(`<!----></div> <div class="max-w-[80%] rounded-xl px-3 py-2 text-sm bg-[var(--surface-alt)] text-[var(--text)]">${escape_html(chatStore.streamingContent)}<span class="animate-pulse">▌</span></div></div>`);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--></div> <div class="border-t border-[var(--border)] p-3"><div class="flex gap-2"><input${attr("value", input)} placeholder="Type a message…"${attr("disabled", chatStore.streaming, true)} class="flex-1 rounded-lg border border-[var(--border)] bg-[var(--bg-alt)] px-3 py-2 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50"/> <button${attr("disabled", chatStore.streaming || !input.trim(), true)} class="rounded-lg bg-[var(--accent)] px-3 py-2 disabled:opacity-50 hover:opacity-80">`);
        Send($$renderer3, { size: 14, class: "text-[var(--bg)]" });
        $$renderer3.push(`<!----></button></div></div></div>`);
      }
    });
  });
}
function NewsWidget($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { items = [], feeds = [] } = $$props;
    let localItems = items;
    let localFeeds = feeds;
    let refreshing = false;
    {
      let actions = function($$renderer3) {
        $$renderer3.push(`<button${attr("disabled", refreshing, true)} class="rounded p-1 hover:bg-[var(--surface-alt)] disabled:opacity-50" title="Refresh articles">`);
        Refresh_cw($$renderer3, {
          size: 13,
          class: `text-[var(--text-muted)] ${stringify("")}`
        });
        $$renderer3.push(`<!----></button> <button class="rounded p-1 hover:bg-[var(--surface-alt)]" title="Manage feeds">`);
        Rss($$renderer3, { size: 14, class: "text-[var(--text-muted)]" });
        $$renderer3.push(`<!----></button> <button class="rounded p-1 hover:bg-[var(--surface-alt)]" title="Add feed">`);
        Plus($$renderer3, { size: 14, class: "text-[var(--accent)]" });
        $$renderer3.push(`<!----></button>`);
      };
      WidgetContainer($$renderer2, {
        title: "News & RSS",
        scrollable: false,
        actions,
        children: ($$renderer3) => {
          {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--> `);
          {
            $$renderer3.push("<!--[-1-->");
            $$renderer3.push(`<ul class="divide-y divide-[var(--border)]"><!--[-->`);
            const each_array_1 = ensure_array_like(localItems.slice(0, 3));
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let item = each_array_1[$$index_1];
              $$renderer3.push(`<li class="px-4 py-2 hover:bg-[var(--surface-alt)]"><div class="flex items-center gap-2"><div class="flex-1 min-w-0"><a${attr("href", item.link ?? "#")} target="_blank" rel="noopener noreferrer" class="text-xs font-medium text-[var(--text)] hover:text-[var(--accent)] line-clamp-1 leading-snug">${escape_html(item.title)}</a> `);
              if (item.publishedAt) {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<p class="text-[10px] text-[var(--text-muted)]">${escape_html(formatDate(item.publishedAt))}</p>`);
              } else {
                $$renderer3.push("<!--[-1-->");
              }
              $$renderer3.push(`<!--]--></div> `);
              if (item.link) {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<a${attr("href", item.link)} target="_blank" rel="noopener noreferrer" class="flex-shrink-0 p-1">`);
                External_link($$renderer3, { size: 11, class: "text-[var(--text-muted)]" });
                $$renderer3.push(`<!----></a>`);
              } else {
                $$renderer3.push("<!--[-1-->");
              }
              $$renderer3.push(`<!--]--></div></li>`);
            }
            $$renderer3.push(`<!--]--> `);
            if (localItems.length === 0 && localFeeds.length > 0) {
              $$renderer3.push("<!--[0-->");
              $$renderer3.push(`<li class="flex flex-col items-center justify-center gap-2 h-32">`);
              Refresh_cw($$renderer3, { size: 20, class: "text-[var(--text-muted)]" });
              $$renderer3.push(`<!----> <p class="text-sm text-[var(--text-muted)]">Loading articles…</p> <button class="text-xs text-[var(--accent)] underline">Refresh now</button></li>`);
            } else if (localItems.length === 0) {
              $$renderer3.push("<!--[1-->");
              $$renderer3.push(`<li class="flex flex-col items-center justify-center gap-2 h-32">`);
              Rss($$renderer3, { size: 24, class: "text-[var(--text-muted)]" });
              $$renderer3.push(`<!----> <p class="text-sm text-[var(--text-muted)]">Add RSS feeds to see articles</p></li>`);
            } else {
              $$renderer3.push("<!--[-1-->");
            }
            $$renderer3.push(`<!--]--></ul>`);
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    }
  });
}
function BookmarksWidget($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { bookmarks: initial = [] } = $$props;
    let bookmarks = initial;
    let checking = /* @__PURE__ */ new Set();
    function statusColor(b) {
      if (b.statusCheckedAt === null || b.statusCheckedAt === void 0) return "#6c7086";
      if (b.isAlive === true) return "#a6e3a1";
      if (b.statusCode && b.statusCode >= 300 && b.statusCode < 400) return "#f9e2af";
      return "#f38ba8";
    }
    {
      let actions = function($$renderer3) {
        $$renderer3.push(`<button class="rounded p-1 hover:bg-[var(--surface-alt)]" title="Add bookmark">`);
        Plus($$renderer3, { size: 14, class: "text-[var(--accent)]" });
        $$renderer3.push(`<!----></button>`);
      };
      WidgetContainer($$renderer2, {
        title: "Bookmarks",
        actions,
        children: ($$renderer3) => {
          {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--> <ul class="divide-y divide-[var(--border)]"><!--[-->`);
          const each_array = ensure_array_like(bookmarks);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let b = each_array[$$index];
            $$renderer3.push(`<li class="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--surface-alt)] group"><span class="w-2 h-2 rounded-full flex-shrink-0"${attr_style(`background-color: ${stringify(statusColor(b))}`)}${attr("title", b.statusCode ? `HTTP ${b.statusCode}` : "Never checked")}></span> <div class="flex-1 min-w-0"><a${attr("href", b.url)} target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] truncate block">${escape_html(b.title)}</a> `);
            if (b.description) {
              $$renderer3.push("<!--[0-->");
              $$renderer3.push(`<p class="text-xs text-[var(--text-muted)] truncate">${escape_html(b.description)}</p>`);
            } else {
              $$renderer3.push("<!--[-1-->");
            }
            $$renderer3.push(`<!--]--></div> <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button${attr("disabled", checking.has(b.id), true)} class="p-1 rounded hover:bg-[var(--surface)] disabled:opacity-50" title="Check status">`);
            Refresh_cw($$renderer3, {
              size: 11,
              class: `text-[var(--text-muted)] ${stringify(checking.has(b.id) ? "animate-spin" : "")}`
            });
            $$renderer3.push(`<!----></button> <a${attr("href", b.url)} target="_blank" rel="noopener noreferrer" class="p-1 rounded hover:bg-[var(--surface)]">`);
            External_link($$renderer3, { size: 11, class: "text-[var(--text-muted)]" });
            $$renderer3.push(`<!----></a> <button class="p-1 rounded hover:bg-[var(--surface)]">`);
            Trash_2($$renderer3, { size: 11, class: "text-[var(--red)]" });
            $$renderer3.push(`<!----></button></div></li>`);
          }
          $$renderer3.push(`<!--]--> `);
          if (bookmarks.length === 0) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<li class="flex items-center justify-center h-32"><p class="text-sm text-[var(--text-muted)]">No bookmarks yet</p></li>`);
          } else {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--></ul>`);
        }
      });
    }
  });
}
function EmbedWidget($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { initialUrl = null } = $$props;
    let savedUrl = initialUrl;
    let inputUrl = initialUrl ?? "";
    let showConfig = !initialUrl;
    function hostname(url) {
      try {
        return new URL(url).hostname;
      } catch {
        return url;
      }
    }
    {
      let actions = function($$renderer3) {
        if (savedUrl) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<a${attr("href", savedUrl)} target="_blank" rel="noopener noreferrer" class="rounded p-1 hover:bg-[var(--surface-alt)]" title="Open in new tab">`);
          External_link($$renderer3, { size: 14, class: "text-[var(--text-muted)]" });
          $$renderer3.push(`<!----></a> <button class="rounded p-1 hover:bg-[var(--surface-alt)]" title="Change URL">`);
          Settings($$renderer3, { size: 14, class: "text-[var(--text-muted)]" });
          $$renderer3.push(`<!----></button>`);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]-->`);
      };
      WidgetContainer($$renderer2, {
        title: savedUrl ? hostname(savedUrl) : "Embed",
        scrollable: false,
        actions,
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="flex h-full flex-col">`);
          if (showConfig) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<div class="flex flex-col gap-3 p-4"><div class="flex items-center gap-2">`);
            Globe($$renderer3, { size: 20, class: "text-[var(--accent)]" });
            $$renderer3.push(`<!----> <p class="text-sm font-medium text-[var(--text)]">Embed a website</p></div> <p class="text-xs text-[var(--text-muted)] leading-relaxed">Paste any URL. Note: many sites (Google, GitHub, Reddit…) block iframe embedding.
					Local services (Home Assistant, Grafana, Portainer…) usually work.</p> <div class="flex gap-2"><input${attr("value", inputUrl)} placeholder="https://…" class="flex-1 rounded border border-[var(--border)] bg-[var(--bg-alt)] px-3 py-2 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"/> <button${attr("disabled", !inputUrl.trim(), true)} class="rounded bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--bg)] disabled:opacity-50">${escape_html("Load")}</button></div> `);
            {
              $$renderer3.push("<!--[-1-->");
            }
            $$renderer3.push(`<!--]--> `);
            if (savedUrl && showConfig) {
              $$renderer3.push("<!--[0-->");
              $$renderer3.push(`<button class="text-xs text-[var(--text-muted)] hover:text-[var(--text)] underline self-start">← Back to embed</button>`);
            } else {
              $$renderer3.push("<!--[-1-->");
            }
            $$renderer3.push(`<!--]--></div>`);
          } else {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (savedUrl && !showConfig) {
            $$renderer3.push("<!--[0-->");
            {
              $$renderer3.push("<!--[-1-->");
              $$renderer3.push(`<!---->`);
              {
                $$renderer3.push(`<div class="relative flex-1 h-full overflow-hidden" style="opacity: 0.45;"><iframe${attr("src", savedUrl)} title="Embedded site" class="h-full w-full border-0" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" loading="lazy"></iframe></div>`);
              }
              $$renderer3.push(`<!---->`);
            }
            $$renderer3.push(`<!--]-->`);
          } else {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--></div>`);
        }
      });
    }
  });
}
function WatchlistWidget($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { savedSymbols = [] } = $$props;
    let tickers = [];
    let loading = savedSymbols.length > 0;
    let refreshing = false;
    function fmt(price, currency) {
      const decimals = price < 1 ? 4 : price < 100 ? 2 : 2;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(price);
    }
    function fmtPct(pct) {
      return (pct >= 0 ? "+" : "") + pct.toFixed(2) + "%";
    }
    function marketLabel(state) {
      if (state === "PRE") return "Pre-market";
      if (state === "POST") return "After-hours";
      if (state === "CLOSED") return "Closed";
      return "Live";
    }
    {
      let actions = function($$renderer3) {
        {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--> <button${attr("disabled", refreshing, true)} class="rounded p-1 hover:bg-[var(--surface-alt)] disabled:opacity-50" title="Refresh prices">`);
        Refresh_cw($$renderer3, {
          size: 13,
          class: `text-[var(--text-muted)] ${stringify("")}`
        });
        $$renderer3.push(`<!----></button> <button class="rounded p-1 hover:bg-[var(--surface-alt)]" title="Add ticker">`);
        Plus($$renderer3, { size: 14, class: "text-[var(--accent)]" });
        $$renderer3.push(`<!----></button>`);
      };
      WidgetContainer($$renderer2, {
        title: "Watchlist",
        scrollable: false,
        actions,
        children: ($$renderer3) => {
          {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (loading) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<div class="flex h-full items-center justify-center gap-2 text-[var(--text-muted)]">`);
            Refresh_cw($$renderer3, { size: 16, class: "animate-spin" });
            $$renderer3.push(`<!----> <span class="text-sm">Loading prices…</span></div>`);
          } else if (tickers.length === 0) {
            $$renderer3.push("<!--[1-->");
            $$renderer3.push(`<div class="flex h-full flex-col items-center justify-center gap-3 p-6">`);
            Trending_up($$renderer3, { size: 36, class: "text-[var(--text-muted)]" });
            $$renderer3.push(`<!----> <p class="text-sm text-[var(--text-muted)]">No tickers yet</p> <p class="text-xs text-center text-[var(--text-muted)] leading-relaxed">Add stocks like <code class="text-[var(--accent)]">AAPL</code> or crypto like <code class="text-[var(--accent)]">BTC-USD</code>.<br/> For European stocks use suffix: <code class="text-[var(--accent)]">MC.PA</code> (LVMH), <code class="text-[var(--accent)]">AIR.PA</code> (Airbus)</p></div>`);
          } else {
            $$renderer3.push("<!--[-1-->");
            $$renderer3.push(`<ul class="divide-y divide-[var(--border)]"><!--[-->`);
            const each_array = ensure_array_like(tickers);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let ticker = each_array[$$index];
              $$renderer3.push(`<li class="flex items-center gap-3 px-4 py-2 hover:bg-[var(--surface-alt)] group"><div class="flex-shrink-0 w-5">`);
              if (ticker.error) {
                $$renderer3.push("<!--[0-->");
                Minus($$renderer3, { size: 14, class: "text-[var(--text-muted)]" });
              } else if (ticker.change > 0) {
                $$renderer3.push("<!--[1-->");
                Trending_up($$renderer3, { size: 14, class: "text-[var(--green)]" });
              } else if (ticker.change < 0) {
                $$renderer3.push("<!--[2-->");
                Trending_down($$renderer3, { size: 14, class: "text-[var(--red)]" });
              } else {
                $$renderer3.push("<!--[-1-->");
                Minus($$renderer3, { size: 14, class: "text-[var(--text-muted)]" });
              }
              $$renderer3.push(`<!--]--></div> <div class="flex-1 min-w-0"><div class="flex items-center gap-1.5"><span class="text-sm font-bold font-mono text-[var(--text)]">${escape_html(ticker.displayName ?? ticker.symbol)}</span> `);
              if (ticker.marketState !== "REGULAR") {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<span class="text-[10px] text-[var(--text-muted)] bg-[var(--surface-alt)] px-1 rounded">${escape_html(marketLabel(ticker.marketState))}</span>`);
              } else {
                $$renderer3.push("<!--[-1-->");
              }
              $$renderer3.push(`<!--]--></div> <p class="text-xs text-[var(--text-muted)] truncate">${escape_html(ticker.shortName)}</p></div> `);
              if (ticker.error) {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<span class="text-xs text-[var(--red)]">Error</span>`);
              } else {
                $$renderer3.push("<!--[-1-->");
                $$renderer3.push(`<div class="text-right flex-shrink-0"><p class="text-sm font-semibold font-mono text-[var(--text)]">${escape_html(fmt(ticker.price, ticker.currency))}</p> <p${attr_class(`text-xs font-mono ${stringify(ticker.change >= 0 ? "text-[var(--green)]" : "text-[var(--red)]")}`)}>${escape_html(fmtPct(ticker.changePct))}</p></div>`);
              }
              $$renderer3.push(`<!--]--> <button class="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-[var(--surface)]" title="Remove">`);
              Trash_2($$renderer3, { size: 12, class: "text-[var(--red)]" });
              $$renderer3.push(`<!----></button></li>`);
            }
            $$renderer3.push(`<!--]--></ul>`);
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    }
  });
}
function SpotifyWidget($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tickTimer = null;
    function stopTick() {
      if (tickTimer) clearInterval(tickTimer);
      tickTimer = null;
    }
    onDestroy(() => {
      stopTick();
    });
    {
      let actions = function($$renderer3) {
        {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]-->`);
      };
      WidgetContainer($$renderer2, {
        title: "Spotify",
        scrollable: false,
        actions,
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="flex h-full flex-col">`);
          {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<div class="flex flex-col items-center justify-center h-full gap-3 px-4">`);
            Music($$renderer3, { size: 24, style: "color: var(--text-muted)" });
            $$renderer3.push(`<!----> <a href="/api/spotify/login" class="flex items-center gap-2 px-5 py-2 text-xs tracking-widest uppercase" style="border: 1px solid #1ed760; color: #1ed760;">Connect Spotify</a></div>`);
          }
          $$renderer3.push(`<!--]--></div>`);
        }
      });
    }
  });
}
function LinksWidget($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let links = [];
    function favicon(url) {
      try {
        const host = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${host}&sz=32`;
      } catch {
        return null;
      }
    }
    {
      let actions = function($$renderer3) {
        $$renderer3.push(`<button class="p-1 transition-opacity opacity-60 hover:opacity-100" title="Add link">`);
        {
          $$renderer3.push("<!--[-1-->");
          Plus($$renderer3, { size: 13, style: "color: var(--accent)" });
        }
        $$renderer3.push(`<!--]--></button>`);
      };
      WidgetContainer($$renderer2, {
        title: "Links",
        scrollable: false,
        actions,
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="flex h-full flex-col">`);
          {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (links.length === 0 && true) {
            $$renderer3.push("<!--[0-->");
            $$renderer3.push(`<div class="flex flex-col items-center justify-center h-full gap-2">`);
            External_link($$renderer3, { size: 20, style: "color: var(--text-muted)" });
            $$renderer3.push(`<!----> <p class="text-xs tracking-wider" style="color: var(--text-muted);">NO LINKS YET</p></div>`);
          } else {
            $$renderer3.push("<!--[-1-->");
            $$renderer3.push(`<ul class="flex flex-col divide-y overflow-y-auto flex-1" style="border-color: var(--border);"><!--[-->`);
            const each_array = ensure_array_like(links);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let link = each_array[$$index];
              $$renderer3.push(`<li class="group flex items-center gap-2 px-3 py-2 hover:bg-[var(--surface-alt)] transition-colors">`);
              if (favicon(link.url)) {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<img${attr("src", favicon(link.url))} alt="" class="h-4 w-4 flex-shrink-0" style="opacity: 0.8;"/>`);
              } else {
                $$renderer3.push("<!--[-1-->");
              }
              $$renderer3.push(`<!--]--> <a${attr("href", link.url)} target="_blank" rel="noopener noreferrer" class="flex-1 text-xs font-medium truncate hover:underline" style="color: var(--text);">${escape_html(link.name)}</a> <button class="flex-shrink-0 opacity-0 group-hover:opacity-70 hover:!opacity-100 transition-opacity" aria-label="Remove">`);
              Trash_2($$renderer3, { size: 11, style: "color: var(--red)" });
              $$renderer3.push(`<!----></button></li>`);
            }
            $$renderer3.push(`<!--]--></ul>`);
          }
          $$renderer3.push(`<!--]--></div>`);
        }
      });
    }
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    QuoteSplash($$renderer2, { quote: data.quote });
    $$renderer2.push(`<!----> `);
    {
      let children = function($$renderer3, layout) {
        if (layout.widgetType === "quote") {
          $$renderer3.push("<!--[0-->");
          WidgetContainer($$renderer3, {
            title: "Daily Quote",
            scrollable: false,
            children: ($$renderer4) => {
              QuoteWidget($$renderer4, { quote: data.quote });
            }
          });
        } else if (layout.widgetType === "calendar") {
          $$renderer3.push("<!--[1-->");
          CalendarWidget($$renderer3, { events: data.events, icsSubscriptions: data.icsSubscriptions });
        } else if (layout.widgetType === "goals") {
          $$renderer3.push("<!--[2-->");
          PomodoroWidget($$renderer3);
        } else if (layout.widgetType === "chat") {
          $$renderer3.push("<!--[3-->");
          ChatWidget($$renderer3, {
            initialMessages: data.messages,
            conversationId: data.conversationId
          });
        } else if (layout.widgetType === "news") {
          $$renderer3.push("<!--[4-->");
          NewsWidget($$renderer3, { items: data.newsItems, feeds: data.feeds });
        } else if (layout.widgetType === "bookmarks") {
          $$renderer3.push("<!--[5-->");
          BookmarksWidget($$renderer3, { bookmarks: data.bookmarks });
        } else if (layout.widgetType === "embed") {
          $$renderer3.push("<!--[6-->");
          EmbedWidget($$renderer3, { initialUrl: data.embedUrl });
        } else if (layout.widgetType === "watchlist") {
          $$renderer3.push("<!--[7-->");
          WatchlistWidget($$renderer3, { savedSymbols: data.watchlistSymbols });
        } else if (layout.widgetType === "spotify") {
          $$renderer3.push("<!--[8-->");
          SpotifyWidget($$renderer3);
        } else if (layout.widgetType === "links") {
          $$renderer3.push("<!--[9-->");
          LinksWidget($$renderer3);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]-->`);
      };
      DashboardGrid($$renderer2, { layouts: data.layouts, children });
    }
    $$renderer2.push(`<!---->`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D4Nb2lc9.js.map
