export type CreateEventDTO = {
   name: string;
   created_by?: number;
   modified_by?: number;
   profit_center?: number;
   event_date_from: Date | undefined;
   event_date_to: Date | undefined;
}

export interface EventDetailDTO {
   name: string;
   email: string;
   phone: string;
   created_by?: number;
   modified_by?: number;
   event_id?: number;
   attendance?: boolean;
   file?: File | undefined;
}