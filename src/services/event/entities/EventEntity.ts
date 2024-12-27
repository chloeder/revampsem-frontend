export interface EventEntity {
   name: string;
   created_at: string;
   created_by: number;
   updated_at: string;
   modified_by: number;
   profit_center: string | null;
   event_date_from: string;
   event_type: string | null;
   event_date_to: string;
   id: number;
}