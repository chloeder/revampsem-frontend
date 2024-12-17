import {AxiosInstance} from "axios";
import {api} from "../../lib/api.ts";
import {UserEntity} from "./entity/UserEntity.ts";
import {CreateUserDTO, UpdateUserDTO} from "./dto";
import {ProfitCenterEntity} from "./entity/ProfitCenterEntity.ts";

export class UserApiService {
   api: AxiosInstance = api;
   
   async getUsers(): Promise<UserEntity[] | undefined> {
      const data = await this.api.get<UserEntity[] | undefined>('/users');
      
      return data.data;
   }
   
   async getUser(id: number): Promise<UserEntity | undefined> {
      const data = await this.api.get<UserEntity | undefined>(`/users/${id}`);
      
      return data.data;
   }
   
   async createUser(dto: CreateUserDTO): Promise<UserEntity | undefined> {
      const data = await this.api.post<UserEntity | undefined>('/users', dto);
      
      return data.data;
   }
   
   async updateUser(id: number, dto: UpdateUserDTO): Promise<UserEntity | undefined> {
      const data = await this.api.patch<UserEntity | undefined>(`/users/${id}`, dto);
      
      return data.data;
   }
   
   async deleteUser(id: number): Promise<void> {
      await this.api.delete(`/users/${id}`);
      
      return;
   }
   
   async getProfitCenters(): Promise<ProfitCenterEntity[]> {
      const data = await this.api.get<ProfitCenterEntity[]>('/users/profit-center');
      
      return data.data;
   }
}