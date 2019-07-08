import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TbSpecification} from '../../../pojo/tb-specification';
import {SpecificationService} from '../../../service/specification.service';
import {Specification} from '../../../pojo/specification';
import {TbSpecificationOption} from '../../../pojo/tb-specification-option';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {valueFunctionProp} from 'ng-zorro-antd';
import {Result} from '../../../entity/result';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss']
})
export class SpecificationComponent implements OnInit {





  specification: Specification = new Specification(new TbSpecification(null, ''), [new TbSpecificationOption(null, '', null, null)]);


  specificationForm: FormGroup;
  /**
   * 更新
   */
  isUpdate: boolean = false;
  /**
   * 添加
   */
  isAdd: boolean = false;


  searchForm: FormGroup;

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

  listOfAllData: TbSpecification[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  constructor(
    private fb: FormBuilder,
    private specificationService: SpecificationService
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      userName: [null, [Validators.required]]
    });

    this.specificationForm = this.fb.group({
      userName: [null],
      specificationOption: this.fb.array([
        this.fb.group({
          optionName: [],
          orders: []
        })
      ])
    });

    this.findAll();
    console.log(this.specification);
  }

  /**
   * 查找所有的规格
   */
  findAll() {
    this.specificationService.findAll()
      .subscribe((data: TbSpecification[]) => {
        this.listOfAllData = data;
      })
  }

  /**
   * 查找规格，通过id查找
   * @param id 规格id
   */
  findOne(id: number) {
    this.specificationService.findOne(id)
      .subscribe((data: Specification) => {
        this.specification = data;
        this.specificationForm.patchValue({
          userName: data.specification.specName
        });
        this.specificationOption.clear();
        data.specificationOption.forEach((value: TbSpecificationOption) => {
          this.pushSpecificationOption(value.optionName, value.orders);
        })
      });
  }

  /**
   * 删除规格
   */
  delete() {
    let ids: number[] = [];
    for (let a in this.mapOfCheckedId) {
      ids.push(+a);
    }
    this.specificationService.delete(ids)
      .subscribe((data: Result) => {
        console.log(data);
      })
  }

  /**
   * 更新数据
   */
  update() {
    this.specificationFormValueToSpecification();
    this.specificationService.update(this.specification)
      .subscribe((data: Result) => {
        console.log(data);
      })
  }

  /**
   * 添加规格
   */
  add() {
    console.log(this.specificationForm.value);
    //将specification里面原来的值清空
    this.specification.reset();
    //将表单的值赋值给specification
    this.specificationFormValueToSpecification();
    this.specificationService.add(this.specification)
      .subscribe((data: any) => {
        console.log(data);
      })
  }

  /**
   * 将表单的值赋值给specification
   */
  specificationFormValueToSpecification() {
    this.specification.specification.specName = this.specificationForm.value.userName;
    this.specificationForm.value.specificationOption.forEach((valueFunctionProp, index) => {
      console.log(index);
      console.log(this.specification.specificationOption[index]);
      if (!this.specification.specificationOption[index]) {
        this.specification.specificationOption[index] = new TbSpecificationOption(null, '', null, null);
      }
      this.specification.specificationOption[index].optionName = valueFunctionProp.optionName;
      this.specification.specificationOption[index].orders = valueFunctionProp.orders;
    });
  }



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

  submitForm(): void {
  }


  /**
   * 显示模态框
   * @param id
   */
  showModal(id: any): void {
    if (id) {
      this.findOne(id);
      this.isUpdate = true;
    } else {
      this.isAdd = true;
    }
  }

  /**
   * 点击确定
   */
  handleOk(): void {
    if (this.isUpdate) {
      this.update();
    } else if (this.isAdd) {
      this.add();

    }
    this.isUpdate = false;
    this.isAdd = false;
    console.log('Button ok clicked!');
    console.log(this.specificationForm.value);
  }

  /**
   * 点击取消
   */
  handleCancel(): void {
    this.resetForm();
    this.isUpdate = false;
    this.isAdd = false;
  }

  /**
   * 重置表单数据
   */
  resetForm() {
    this.specificationOption.clear();
    this.specificationOption.push(this.fb.group({
      optionName: [],
      orders: []
    }));
  }

  get specificationOption() {
    return this.specificationForm.get('specificationOption') as FormArray;
  }

  pushSpecificationOption(optionName: string, orders: number) {
    this.specificationOption.push(this.fb.group({
      optionName: [optionName],
      orders: [orders]
    }));
  }

  /**
   * 添加一个新的输入框
   */
  addSpecificationOption() {
    console.log(this.specificationOption);
    this.specificationOption.push(this.fb.group({
      optionName: [],
      orders: []
    }));
  }

  /**
   * 删除一个输入框
   * @param index
   */
  deleteSpecificationOption(index: number) {
    this.specificationOption.removeAt(index);
  }
}


