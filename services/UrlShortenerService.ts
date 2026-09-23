import UrlRepository from "@/repositories/UrlRepository";
import shortId from 'shortid';
import { IUrl } from "@/models/Url";

export class UrlShortenerService {
  private urlRepository;
  constructor() {
    this.urlRepository = new UrlRepository();
  }

  async shortenUrl(originalUrl?: string): Promise<string> {
    if (!originalUrl) {
      return "";
    }
    let url = await this.urlRepository.getUrlByOrignalUrl(originalUrl);
    if (url) {
      return url.shortUrl;
    }
    let shortUrl = shortId();
    url = await this.urlRepository.getUrlByShortUrl(shortUrl);
    while (url) {
      shortUrl = shortId();
      url = await this.urlRepository.getUrlByShortUrl(shortUrl);
    }
    await this.urlRepository.createUrl(originalUrl, `urls/${shortUrl}`);
    return shortUrl;
  }

  async getAllUrls() {
    return await this.urlRepository.getAllUrls();
  }

  async getUrlByShortUrl(shortUrl: string) {
    return await this.urlRepository.getUrlByShortUrl(shortUrl);
  }

  async getUrlById(id: string): Promise<IUrl | null> {
    return await this.urlRepository.getUrlById(id);
  }

  async getUrlByOriginalUrl(originalUrl: string): Promise<IUrl | null> {
    return await this.urlRepository.getUrlByOrignalUrl(originalUrl);
  }

  async deleteUrl(id: string): Promise<IUrl | null> {
    return await this.urlRepository.deleteUrl(id);
  }

  async createUrl(originalUrl: string, shortUrl: string): Promise<IUrl> {
    return await this.urlRepository.createUrl(originalUrl, shortUrl);
  }

  async updateUrl(
    id: string,
    originalUrl: string,
    shortUrl: string
  ): Promise<IUrl | null> {
    return await this.urlRepository.updateUrl(
      id,
      originalUrl,
      shortUrl
    );
  }
}