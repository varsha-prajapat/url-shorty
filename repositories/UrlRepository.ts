import Url,{IUrl} from "@/models/Url";
import connectDB from "@/config/db";

export  default class UrlRepository{
   private UrlModel;
    constructor(){
        connectDB();
        this.UrlModel=Url;

    }
    async getUrlById(id:string):Promise<IUrl | null>{
       return await this.UrlModel.findById(id).lean();
    }

    async getUrlByShortUrl(shortUrl:string):Promise<IUrl | null >{
        return await this.UrlModel.findOne({shortUrl}).lean();
    }

    async getUrlByOrignalUrl(originalUrl:string):Promise<IUrl | null >{
        return await this.UrlModel.findOne({originalUrl}).lean();
    }

    async getAllUrls():Promise<IUrl[]>{
        return this.UrlModel.find().lean();
    }
   
    async deleteUrl(id:string):Promise<IUrl | null>{
       return await this.UrlModel.findByIdAndDelete(id).lean();
    }
    
    async createUrl(originalUrl:string,shortUrl:string):Promise<IUrl>{
        const newUrl=new this.UrlModel({originalUrl,shortUrl});
        return await newUrl.save();
    }

    async updateUrl(id: string,originalUrl: string,shortUrl: string): Promise<IUrl | null> {
     return await this.UrlModel.findByIdAndUpdate(
      id,
      { originalUrl, shortUrl },
      { new: true, runValidators: true }
      ).lean();
}
    
}