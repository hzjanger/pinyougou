import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TbSpecification} from '../pojo/tb-specification';
import {Specification} from '../pojo/specification';
import {TbSpecificationOption} from '../pojo/tb-specification-option';

@Injectable({
  providedIn: 'root'
})
export class SpecificationService {

  baseUrl: string = "/hzjMa/specification";

  constructor(private http: HttpClient) { }

  /**
   * 查找所有的规格
   */
  findAll(): Observable<TbSpecification[]> {
    return this.http.get<TbSpecification[]>(`${this.baseUrl}/findAll.do`);
  }


  /**
   * 添加
   * @param specification
   */
  add(specification: Specification) {
    return this.http.post(`${this.baseUrl}/add.do`, specification);
  }


  /**
   * 通过id查找规格
   * @param id
   */
  findOne(id: number) {
    return this.http.get(`${this.baseUrl}/findOne.do?id=${id}`);
  }

  /**
   * 修改规格
   */
  update(specification: Specification) {
    return this.http.post(`${this.baseUrl}/update.do`, specification);
  }

  /**
   * 删除规格
   * @param ids 规格id数组
   */
  delete(ids: number[]) {
    return this.http.get(`${this.baseUrl}/delete.do?id=${ids}`);
  }

  /**
   * 查找所有的品牌名称
   */
  findAllSpecName() {
    return this.http.get(`${this.baseUrl}/findAllSpecName.do`);
  }
}



