import { Component, OnInit } from '@angular/core';
import {BrandManagerService} from '../../../service/brand-manager.service';
import {TbBrand} from '../../../entity/tb-brand';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-brand-manager',
  templateUrl: './brand-manager.component.html',
  styleUrls: ['./brand-manager.component.scss']
})
export class BrandManagerComponent implements OnInit {

  //添加品牌和更新品牌
  brand: TbBrand = new TbBrand(null, "", "");

  constructor(
    private brandManagerService: BrandManagerService,
    private fb: FormBuilder
  ) { }

  //添加品牌
  isAddVisible: boolean = false;
  //更新品牌
  isUpdateVisible: boolean = false;

  //条件查询表单
  validateForm: FormGroup;



  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 !== 0));
        this.refreshStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 === 0));
        this.refreshStatus();
      }
    }
  ];
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: TbBrand[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  ngOnInit(): void {
    //初始化条件查询表单
    this.validateForm = this.fb.group({
      name: [null],
      firstChar: [null]
    });
    //查找所有的数据
    this.findAllBrand();
  }




  /**
   * 显示弹窗
   */
  showModal(id: any): void {
    if (id) {
      this.findOne(id);
      this.isUpdateVisible = true;
    } else {
      this.isAddVisible = true;
    }
  }

  /**
   * 点击确定
   */
  handleOk(): void {
    console.log('Button ok clicked!');
    if (this.isAddVisible) {
      this.add();
    } else if (this.isUpdateVisible) {
      this.update();
    }
    this.isAddVisible = false;
    this.isUpdateVisible = false;
  }

  /**
   * 点击取消
   */
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isAddVisible = false;
    this.isUpdateVisible = false;
  }

  updateHandleCancel(): void {

  }

  /**
   * 从后台获取所有的品牌列表
   */
  findAllBrand() {
    this.brandManagerService.findAllBrand()
      .subscribe((data: TbBrand[]) => {
        console.log(data);
        this.listOfAllData = data;
      })
  }

  /**
   * 添加品牌
   */
  add() {
    this.brandManagerService.add(this.brand)
      .subscribe((data) => {
        console.log(data);
      })
  }

  /**
   * 查找单个品牌信息
   * @param id
   */
  findOne(id: number) {
    this.brandManagerService.findOne(id)
      .subscribe((data: TbBrand) => {
        this.brand = data;
      })
  }


  /**
   * 更新品牌信息
   */
  update() {
    this.brandManagerService.update(this.brand)
      .subscribe((data: any) => {
        console.log(data);
      })
  }

  delete() {
    console.log(this.mapOfCheckedId);
    // console.log(this.listOfAllData);

    let ids = [];
    this.listOfAllData.forEach((value: TbBrand) => {
      if (this.mapOfCheckedId[value.id]) {
        ids.push(value.id);
      }
    });
    this.brandManagerService.delete(ids)
      .subscribe((data: any) => {
        console.log(data);
      })

  }


  submitForm(): void {
    console.log(this.validateForm.value);
    this.brandManagerService.search(this.validateForm.value, 1, 10)
      .subscribe((data: any) => {
        // this.listOfAllData = data;
        this.listOfAllData = data.rows;
      })
  }


}
