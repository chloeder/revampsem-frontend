import {AxiosInstance} from "axios";
import {api} from "../../lib/api.ts";

export class EventApiService{
   api: AxiosInstance = api;
   
   async getEvents() {
      const data = await this.api.get('/events');
      return data.data;
   }
   
   async getEventAttendees(eventId: string) {
      const data = await this.api.get(`/events/attendance?event_id=${eventId}`);
      return data.data;
   }
}