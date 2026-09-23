import { redirect } from "next/navigation";
import { UrlShortenerService } from "@/services/UrlShortenerService";

async function fetchOriginalUrl(url: string) {
    const urlService = new UrlShortenerService();
    const response = await urlService.getUrlByShortUrl(url);
    return response?.originalUrl;
}

export default async function urlRedirect({ params }: { params: { id: string } }) {
    const originalUrl = await fetchOriginalUrl(`urls/${params.id}`);
    if (originalUrl) redirect(originalUrl);
    redirect("/404");
    return null;
}