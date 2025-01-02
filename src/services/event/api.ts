import {AxiosInstance} from "axios";
import {api} from "../../lib/api.ts";
import {CreateEventDTO} from "./dtos";

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
   
   async insertEvent(dto: CreateEventDTO) {
      const data = await this.api.post('/events', dto);
      return data.data;
   }
   
   async insertAttendance(eventId: number, file: File){
      const formData = new FormData();
      formData.append('event_id', eventId.toString());
      formData.append('file', file);
      
      const data = await this.api.post('/events/attendance', formData);
      return data.data;
   }
}