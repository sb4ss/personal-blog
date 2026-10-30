import { useState, useEffect, useCallback } from "react";
import { articles } from "../data/articles";

const STORAGE_KEY_LIKES = "sb4ss_blog_likes_cache";
const STORAGE_KEY_USER_LIKED = "sb4ss_blog_user_liked_articles";
const EVENT_NAME = "sb4ss_likes_updated";
const API_BASE = "https://countapi.mileshilliard.com/api/v1";
const NAMESPACE = "sb4ss-blog-v1";

export function getDefaultLikes(articleIdOrUrl: string): number {
  const cleanId = articleIdOrUrl.replace(/^\/|article-/, "");
  const article = articles.find(
    (a) =>
      a.id === cleanId ||
      a.url === cleanId ||
      a.url === `article-${cleanId}` ||
      a.id === `article-${cleanId}`
  );
  if (article && typeof article.likes === "number") {
    return article.likes;
  }
  let hash = 0;
  for (let i = 0; i < cleanId.length; i++) {
    hash = (hash << 5) - hash + cleanId.charCodeAt(i);
    hash |= 0;
  }
  return 20 + Math.abs(hash % 35);
}

function getApiKey(cleanId: string): string {
  return `${NAMESPACE}-${cleanId}`;
}

export function getAllLikesCache(): Record<string, number> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LIKES);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function getUserLiked(): Record<string, boolean> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_USER_LIKED);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function useArticleLikes(articleIdOrUrl: string) {
  const cleanId = articleIdOrUrl.replace(/^\/|article-/, "");
  const defaultLikes = getDefaultLikes(cleanId);
  const apiKey = getApiKey(cleanId);

  const [likes, setLikes] = useState<number>(() => {
    const cache = getAllLikesCache();
    return cache[cleanId] !== undefined ? cache[cleanId] : defaultLikes;
  });

  const [isLiked, setIsLiked] = useState<boolean>(() => {
    const userLiked = getUserLiked();
    return !!userLiked[cleanId];
  });

  // Fetch real global likes from the cloud API on mount
  useEffect(() => {
    let isMounted = true;

    async function syncWithCloud() {
      try {
        const res = await fetch(`${API_BASE}/get/${apiKey}`);
        if (!res.ok) {
          // Si no existe la llave todavía, la inicializamos con el valor base
          await fetch(`${API_BASE}/set/${apiKey}?value=${defaultLikes}`);
          if (isMounted) {
            setLikes(defaultLikes);
          }
          return;
        }

        const data = await res.json();
        if (typeof data.value === "number") {
          const finalCount = Math.max(data.value, defaultLikes);
          if (isMounted) {
            setLikes(finalCount);
            // Guardar en cache local
            const cache = getAllLikesCache();
            cache[cleanId] = finalCount;
            localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(cache));
          }
        }
      } catch {
        // En caso de fallo de red, el valor por defecto/local sigue disponible
      }
    }

    syncWithCloud();

    return () => {
      isMounted = false;
    };
  }, [cleanId, apiKey, defaultLikes]);

  // Sincronizar entre componentes montados (tarjeta, cabecera y pie de página)
  useEffect(() => {
    const handleUpdate = () => {
      const cache = getAllLikesCache();
      const userLiked = getUserLiked();
      if (cache[cleanId] !== undefined) {
        setLikes(cache[cleanId]);
      }
      setIsLiked(!!userLiked[cleanId]);
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [cleanId]);

  const toggleLike = useCallback(
    async (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const cache = getAllLikesCache();
      const userLiked = getUserLiked();

      const currentlyLiked = !!userLiked[cleanId];
      const currentCount =
        cache[cleanId] !== undefined ? cache[cleanId] : defaultLikes;

      const nextLiked = !currentlyLiked;
      const nextCount = nextLiked
        ? currentCount + 1
        : Math.max(defaultLikes, currentCount - 1);

      // Actualización optimista inmediata (0ms lag para el usuario)
      cache[cleanId] = nextCount;
      userLiked[cleanId] = nextLiked;

      try {
        localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(cache));
        localStorage.setItem(STORAGE_KEY_USER_LIKED, JSON.stringify(userLiked));
      } catch (err) {
        console.warn("Could not save to localStorage", err);
      }

      setLikes(nextCount);
      setIsLiked(nextLiked);

      // Notificar a todos los componentes en pantalla
      window.dispatchEvent(new CustomEvent(EVENT_NAME));

      // Persistir en la nube para que toda la gente lo vea
      try {
        if (nextLiked) {
          // Incrementa el contador global en la nube
          const res = await fetch(`${API_BASE}/hit/${apiKey}`);
          if (res.ok) {
            const data = await res.json();
            if (typeof data.value === "number") {
              const cloudVal = Math.max(data.value, nextCount);
              cache[cleanId] = cloudVal;
              localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(cache));
              setLikes(cloudVal);
              window.dispatchEvent(new CustomEvent(EVENT_NAME));
            }
          }
        } else {
          // Si quita el like, actualizamos el valor en la nube
          await fetch(`${API_BASE}/set/${apiKey}?value=${nextCount}`);
        }
      } catch {
        // En caso de fallo de red, se mantiene el estado optimista local
      }
    },
    [cleanId, apiKey, defaultLikes]
  );

  return { likes, isLiked, toggleLike };
}
