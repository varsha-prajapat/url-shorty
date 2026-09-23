import { UrlShortenerService } from "@/services/UrlShortenerService";
import { NextResponse } from "next/server";
import { cache } from "react";

const fetchUrls = cache(async () => {
    const shortenerService = new UrlShortenerService();
    const response = await shortenerService.getAllUrls();
    return response;
})

export async function GET() {
    const urls = await fetchUrls();
    const response = NextResponse.json({ urls });
    response.headers.set('Cache-Control', 'public, max-age=60 s-maxage=60, stale-while-revalidate=59');
    return response;

}