import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, documentTitle, findRouteMeta } from './routeMeta';
import { site } from '@data/data/site';

function upsertMeta(key: string, attr: 'name' | 'property', value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keeps the document head correct across client-side navigation.
 *
 * The first load already arrives with the right tags baked in by
 * scripts/prerender.mjs — this only has to maintain them as the user moves
 * between routes. Both read the same route table, so they cannot disagree.
 */
export function useSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = findRouteMeta(pathname);
    const url = absoluteUrl(meta.path === '/404' ? pathname : meta.path);
    const title = documentTitle(meta);

    document.title = title;

    upsertMeta('description', 'name', meta.description);
    upsertMeta('robots', 'name', meta.noindex ? 'noindex, follow' : 'index, follow');

    upsertMeta('og:title', 'property', title);
    upsertMeta('og:description', 'property', meta.description);
    upsertMeta('og:type', 'property', meta.type);
    upsertMeta('og:url', 'property', url);
    upsertMeta('og:site_name', 'property', site.name);

    upsertMeta('twitter:card', 'name', 'summary_large_image');
    upsertMeta('twitter:title', 'name', title);
    upsertMeta('twitter:description', 'name', meta.description);

    if (meta.image) {
      const image = `${site.url}${meta.image}`;
      upsertMeta('og:image', 'property', image);
      upsertMeta('twitter:image', 'name', image);
    }

    // The 404 view has no canonical URL to point at.
    if (meta.noindex) {
      document.head.querySelector('link[rel="canonical"]')?.remove();
    } else {
      upsertLink('canonical', url);
    }
  }, [pathname]);
}
