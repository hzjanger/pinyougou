import { Component, OnInit } from '@angular/core';
import {TypeTemplateService} from '../../../service/type-template.service';
import {TbTypeTemplate} from '../../../pojo/tb-type-template';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {SpecificationService} from '../../../service/specification.service';
import {BrandManagerService} from '../../../service/brand-manager.service';

@Component({
  selector: 'app-type-template',
  templateUrl: './type-template.component.html',
  styleUrls: ['./type-template.component.scss']
})
export class TypeTemplateComponent implements OnInit {

  /**
   * 列表数据
   */
  listOfData: TbTypeTemplate[] = [];

  /**
   * 控制模态框是否显示
   */
  visible: boolean = false;

  /**
   * 关联规格下拉列表选项
   */
  specIdsListOfOption: {id: number, text: string}[] = [];

  /**
   * 选择的下拉选项
   */
  listOfSelectedValue: string[] = [];

  brandNameListOption: {id: number, text: string}[] = []

  /**
   * 模板数据表单
   */
  typeTemplateForm: FormGroup;


  isAllDisplayDataChecked: boolean = false;

  isIndeterminate: boolean = false;

  mapOfCheckedId: {[key: string]: boolean} = {};

  listOfDisplayData: any[] = [];

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

  constructor(
    private typeTemplateService: TypeTemplateService,
    private fb: FormBuilder,
    private specificationService: SpecificationService,
    private brandManagerService: BrandManagerService
  ) { }

  ngOnInit() {
    this.typeTemplateForm = this.fb.group({
      name: [],
      specIds: [],
      brandIds: [],
      customAttributeItems: this.fb.array([
        this.fb.control('')
      ])
    });
    //查找所有的模板
    this.findAll();
    //查找所有的规格名称
    this.findAllSpecName();
    //查找所有的品牌名称
    this.findAllName();
  }

  get customAttributeItems() {
    return this.typeTemplateForm.get('customAttributeItems') as FormArray;
  }

  submitForm() {

  }

  /**
   * 选择所有
   * @param value
   */
  checkAll(value: boolean): void {
    this.listOfData.forEach(item => {
      this.mapOfCheckedId[item.id] = value;
    });
    this.refreshStatus();
  }

  /**
   * 当前页面展示数据改变的回调函数
   * @param $event
   */
  currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();

  }


  /**
   * 更新选择状态
   */
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate = this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id] && !this.isAllDisplayDataChecked);
  }

  /**
   * 显示模态框
   */
  showModal() {
    this.visible = true;
  }

  /**
   * 点击模态框的取消按钮
   */
  handleCancel() {
    this.visible = false;
  }

  /**
   * 点击模态框的确定按钮
   */
  handleOk() {
    console.log(this.typeTemplateForm.value);
    this.visible = false;

  }


  /**
   * 规格名称下拉列表显示
   * @param value
   */
  isNotSelected(value: string): boolean {
    if (this.typeTemplateForm.value.specIds) {
      return this.typeTemplateForm.value.specIds.indexOf(value) === -1;
    } else {
      return true;
    }
  }

  /**
   * 品牌名称下拉列表显示
   * @param value
   */
  brandNameSelected(value: string): boolean {
    if (this.typeTemplateForm.value.brandIds) {
      return this.typeTemplateForm.value.brandIds.indexOf(value) === -1;
    } else {
      return true;
    }
  }

  /**
   * 添加扩展属性输入框
   */
  addOption() {
    this.customAttributeItems.push(this.fb.control(''));
  }

  deleteOption(index: number): void {
    this.customAttributeItems.removeAt(index);
  }

  /**
   * 查找所有的模板
   */
  findAll() {
    this.typeTemplateService.findAll()
      .subscribe((data: TbTypeTemplate[]) => {
        this.listOfData = data;
      })
  }

  /**
   * 查找所有的规格名称
   */
  findAllSpecName() {
    this.specificationService.findAllSpecName()
      .subscribe((data: {id: number, text: string}[]) => {
        this.specIdsListOfOption = data;
      })
  }

  /**
   * 查找所有的品牌名称
   */
  findAllName() {
    this.brandManagerService.findAllName()
      .subscribe((data: {id: number, text: string}[]) => {
        this.brandNameListOption = data;
      })

  }
}
