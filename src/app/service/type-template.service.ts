import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TbTypeTemplate} from '../pojo/tb-type-template';

@Injectable({
  providedIn: 'root'
})
export class TypeTemplateService {

  baseUrl: string = "/hzjMa/typeTemplate";

  constructor(private http: HttpClient) { }

  /**
   * 查找所有的模板
   */
  findAll(): Observable<TbTypeTemplate[]> {
    return this.http.get<TbTypeTemplate[]>(`${this.baseUrl}/findAll.do`);
  }
}
