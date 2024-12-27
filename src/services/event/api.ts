import {AxiosInstance} from "axios";
import {api} from "../../lib/api.ts";

export class EventApiService{
   api: AxiosInstance = api;
   
   async getEvents() {
      const data = await this.api.post('/events');
      return data.data.data;
   }
}