# 模板管理

## 项目目录

```
src/
├── app
│   ├── layout
│   │   └── manager-admin
│   │       └── type-template
│   │           ├── type-template.component.html
│   │           ├── type-template.component.scss
│   │           ├── type-template.component.spec.ts
│   │           └── type-template.component.ts
│   ├── pojo
│   │   └── tb-type-template.ts
│   ├── service
│   │   ├── type-template.service.spec.ts
│   │   └── type-template.service.ts

```

## 增加模板

其实模板管理与规格管理都差不多，唯一的区别就是比规格管理多了一个下拉框选项

```html
<nz-modal [(nzVisible)]="visible" nzTitle="商品类型模板编辑" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
  <form nz-form [formGroup]="typeTemplateForm">
    <nz-form-item>
      <nz-form-control>
        <input nz-input placeholder="商品类型" formControlName="name">
      </nz-form-control>
    </nz-form-item>
    <nz-select
      style="width: 100%"
      nzMode="multiple"
      nzPlaceHolder="Inserted are removed"
      formControlName="specIds">
      <ng-container *ngFor="let option of specIdsListOfOption">
        <nz-option [nzLabel]="option.text" [nzValue]="option.text" *ngIf="isNotSelected(option.text)"></nz-option>
      </ng-container>
    </nz-select>
    <nz-select style="width: 100%;"
               nzMode="multiple"
               nzPlaceHolder="规格"
               formControlName="brandIds">
      <ng-container *ngFor="let option of brandNameListOption">
        <nz-option [nzLabel]="option.text" [nzValue]="option.text" *ngIf="brandNameSelected(option.text)"></nz-option>
      </ng-container>
    </nz-select>
    <div>
      扩展属性<button nz-button type="button" (click)="addOption()">新增扩展属性</button>
    </div>
    <div formArrayName="customAttributeItems">
      <div nz-row *ngFor="let custom of customAttributeItems.controls; let i = index;">
        <div nz-col nzSpan="20">
          <nz-form-item>
            <nz-form-control>
              <input nz-input placeholder="名称" [formControlName]="i">
            </nz-form-control>
          </nz-form-item>
        </div>
        <div nz-col nzSpan="4">
          <button nz-button (click)="deleteOption(i)">删除</button>
        </div>
      </div>
    </div>
  </form>
</nz-modal>
```

所对应的ts代码

```typescript
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
   * 控制模态框是否显示
   */
  visible: boolean = false;

  /**
   * 关联规格下拉列表选项
   */
  specIdsListOfOption: {id: number, text: string}[] = [];

  /**
  * 关联品牌下拉列表选项
  */
  brandNameListOption: {id: number, text: string}[] = []

  /**
   * 模板数据表单
   */
  typeTemplateForm: FormGroup;

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

  /**
  * 删除扩展属性输入框
  */
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

```

增加模板、删除模板、修改模板啥的就不写了，与规格管理差不多，就不写了，这里主要展示的是一个下拉列表框的运用，其他的就没啥新的东西了