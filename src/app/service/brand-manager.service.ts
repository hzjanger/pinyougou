import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TbBrand} from '../entity/tb-brand';

@Injectable({
  providedIn: 'root'
})
export class BrandManagerService {

  baseUrl: string = "/hzjMa";

  constructor(private http: HttpClient) { }

  /**
   * 查找所有的品牌列表
   */
  findAllBrand():Observable<TbBrand[]> {
    return this.http.get<TbBrand[]>(`${this.baseUrl}/brand/findAll.do`);
  }

  /**
   * 品牌分页条件查询
   * @param brand 查询条件
   * @param pageNum 当前页数
   * @param pageSize 每页的大小
   */
  search(brand: TbBrand, pageNum: number, pageSize: number) {
    return this.http.post(`${this.baseUrl}/brand/search.do?pageNum=${pageNum}&pageSize=${pageSize}`, brand);
  }

  /**
   * 添加品牌
   * @param brand
   */
  add(brand: TbBrand) {
    return this.http.post(`${this.baseUrl}/brand/add.do`, brand);
  }

  /**
   * 查找单个品牌信息
   * @param id
   */
  findOne(id: number): Observable<TbBrand> {
    return this.http.get<TbBrand>(`${this.baseUrl}/brand/findOne.do?id=${id}`);
  }

  /**
   * 更新品牌信息
   * @param brand
   */
  update(brand: TbBrand) {
    return this.http.post(`${this.baseUrl}/brand/update.do`, brand);
  }

  /**
   * 批量删除品牌
   * @param ids
   */
  delete(ids: number[]) {
    return this.http.get(`${this.baseUrl}/brand/delete.do?ids=${ids}`);
  }

  /**
   * 查找所有的品牌名称
   */
  findAllName() {
    return this.http.get(`${this.baseUrl}/brand/findAllName.do`);

  }
}
