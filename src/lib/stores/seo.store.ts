import { writable } from "svelte/store";

export const SEO_DEFAULTS = {
    title: 'Feather Finder: Discover Birds Nearby',
    description: 'Explore and identify species of birds that have been spotted in your vicinity. Join the Feather Finder community today!',
    url: 'https://feather-finder.com',
    image: '/og_image_banner.png'
}

export const seoData = writable(SEO_DEFAULTS);

export function updateSEOData(data: { title?: string, description?: string, url?: string, image?: string }) {
    seoData.update(() => {
        return {
            ...SEO_DEFAULTS,
            ...data
        }
    })
}