import {AxiosInstance} from "axios";
import {api} from "../../lib/api.ts";
import {UserEntity} from "../users/entities/UserEntity.ts";
import {LoginDTO} from "./dtos";

export class AuthApiService{
   api: AxiosInstance = api;
   
   async login(dto: LoginDTO): Promise<UserEntity> {
      const data = await this.api.post<UserEntity>('/auth/login', dto);
      
      return data.data;
   }
   
   async isAuth(): Promise<UserEntity> {
      const data = await this.api.get<UserEntity>('/auth/is-auth');
      
      return data.data;
   }
}