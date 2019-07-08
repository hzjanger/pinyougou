# 规格管理

## 文件目录

```
src/
├── app
│   ├── ...
│   ├── entity
│   │   ├── ...
│   ├── layout
│   │   └── manager-admin
│   │       ├── ...
│   │       └── specification
│   │           ├── specification.component.html
│   │           ├── specification.component.scss
│   │           ├── specification.component.spec.ts
│   │           └── specification.component.ts
│   ├── login
│   │   ├── ...
│   ├── menu
│   │   ├── ...
│   ├── pojo
│   │   ├── specification.ts
│   │   ├── tb-specification-option.ts
│   │   └── tb-specification.ts
│   ├── service
│   │   ├── ...
│   │   ├── specification.service.spec.ts
│   │   └── specification.service.ts
│   └── shared
│       └── ...

```

## 实体建立

1. 建立规格实体

```typescript
/**
 * 规格
 * @author hzj
 */
export class TbSpecification {
  /**
   * 规格主键
   */
  id: number;

  /**
   * 规格名称
   */
  specName: string;


  constructor(id: number, specName: string) {
    this.id = id;
    this.specName = specName;
  }
}

```

2. 建立规格选项实体

```typescript
/**
 * 规格选项
 * @author hzj
 */
export class TbSpecificationOption {
  /**
   * 规格项id
   */
  id: number;

  /**
   * 规格项名称
   */
  optionName: string;

  /**
   * 规格ID,外键
   */
  specId: number;

  /**
   * 排序值
   */
  orders: number;


  constructor(id: number, optionName: string, specId: number, orders: number) {
    this.id = id;
    this.optionName = optionName;
    this.specId = specId;
    this.orders = orders;
  }
}

```

3. 建立规格和规格选项实体

```typescript
import {TbSpecification} from './tb-specification';
import {TbSpecificationOption} from './tb-specification-option';

/**
 * 规格和规格选项的组合实体类
 * 规格和规格选项存在一对多关系
 * @author hzj
 */
export class Specification {
  /**
   * 规格
   */
  specification: TbSpecification;

  /**
   * 规格选项
   */
  specificationOption: TbSpecificationOption[];


  constructor(specification: TbSpecification, specificationOption: TbSpecificationOption[]) {
    this.specification = specification;
    this.specificationOption = specificationOption;
  }

  /**
   * 重置
   */
  reset() {
    this.specification = new TbSpecification(null, '');
    this.specificationOption = [new TbSpecificationOption(null, '', null, null)];
  }
}

```

## 添加规格

### 前端实现

1. 添加规格时，需要添加一个到多个规格选项，所以需要动态添加表单，所以使用`FormArray`,使用`FormBuilder`来生成表单控件

```javascript

specificationForm: FormGroup;
ngOnInit() {
  this.specificationForm = this.fb.group({
    userName: [null],
    specificationOption: this.fb.array([
      this.fb.group({
        optionName: [],
        orders: []
      })
    ])
  });
}
```

2. 添加一个新的输入框

```typescript

/**
* 访问FormArray控件
*/
get specificationOption() {
  return this.specificationForm.get('specificationOption') as FormArray;
}

/**
 * 添加一个新的输入框
 */
addSpecificationOption() {
  this.specificationOption.push(this.fb.group({
    optionName: [],
    orders: []
  }));
}
```

3. 删除一个输入框

```typescript
/**
 * 删除一个输入框
 * @param index
 */
deleteSpecificationOption(index: number) {
  this.specificationOption.removeAt(index);
}
```

4. 向后台发送数据，存储规格

```typescript
/**
 * 添加规格
 */
add() {
  //将specification里面原来的值清空
  this.specification.reset();
  //将表单的值赋值给specification
  this.specificationFormValueToSpecification();
  this.specificationService.add(this.specification)
    .subscribe((data: any) => {
      console.log(data);
    })
}

//对应的service
/**
 * 添加
 * @param specification
 */
add(specification: Specification) {
  return this.http.post(`${this.baseUrl}/add.do`, specification);
}
```



5. 前台规格弹窗部分编写

```html
<h3>规格管理</h3>
<div>
  <button nz-button nzType="default" (click)="showModal(false)">新建</button>
  <button nz-button nzType="default" (click)="delete()">删除</button>
</div>

<!-- 其他代码省略 -->

<nz-modal [nzWidth]="600" [(nzVisible)]="isUpdate || isAdd" nzTitle="规格编辑" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
  <form nz-form [nzLayout]="'inline'" [formGroup]="specificationForm">
    <nz-form-item >
      <nz-form-control nzErrorTip="Please input your username!" >
        <nz-input-group>
          <input formControlName="userName" nz-input placeholder="规格" />
        </nz-input-group>
      </nz-form-control>
    </nz-form-item>
    <div>
      <button nz-button nzType="primary" (click)="addSpecificationOption()">新增规格选项</button>
    </div>
    <!-- 主要是这部分 -->
    <div formArrayName="specificationOption">
      <div *ngFor="let specification of specificationOption.controls; let i=index;">
        <div [formGroupName]="i">
          <nz-form-item >
            <nz-form-control nzErrorTip="Please input your username!" >
              <nz-input-group>
                <input formControlName="optionName" nz-input placeholder="规格" />
              </nz-input-group>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item >
            <nz-form-control nzErrorTip="Please input your username!" >
              <nz-input-group>
                <input formControlName="orders" nz-input placeholder="排序" />
              </nz-input-group>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control>
              <button nz-button nzType="primary" (click)="deleteSpecificationOption(i)">删除</button>
            </nz-form-control>
          </nz-form-item>
        </div>
      </div>
    </div>
  </form>
</nz-modal>

```

因为在新增和修改所用的弹窗是一样的，所有用`isUpdate`和`isAdd`来标记是新增还是修改

## 删除实体

删除实体支持批量删除，向后台发送的是一个规格id的数组

```typescript
/**
 * 删除规格
 */
delete() {
  let ids: number[] = [];
  //遍历mapOfCheckedId对象
  for (let a in this.mapOfCheckedId) {
    ids.push(+a);
  }
  this.specificationService.delete(ids)
    .subscribe((data: Result) => {
      console.log(data);
    })
}

//对应的service

/**
 * 删除规格
 * @param ids 规格id数组
 */
delete(ids: number[]) {
  //不管是数组也好，同样是使用这种方法传递参数
  return this.http.get(`${this.baseUrl}/delete.do?id=${ids}`);
}
```

## 获取所用的规格

```typescript
/**
 * 查找所有的规格
 */
findAll() {
  this.specificationService.findAll()
    .subscribe((data: TbSpecification[]) => {
      this.listOfAllData = data;
    })
}

//对应的service

/**
 * 查找所有的规格
 */
findAll(): Observable<TbSpecification[]> {
  return this.http.get<TbSpecification[]>(`${this.baseUrl}/findAll.do`);
}
```

## 修改规格

修改操作与增删查操作相比较起来一般要复杂一些

1. 从后台得到需要修改的数据

```typescript
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

//对应的service
/**
 * 通过id查找规格
 * @param id
 */
findOne(id: number) {
  return this.http.get(`${this.baseUrl}/findOne.do?id=${id}`);
}
```

2. 向后台发送修改之后的数据

```typescript
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

//对应的service

/**
 * 修改规格
 */
update(specification: Specification) {
  return this.http.post(`${this.baseUrl}/update.do`, specification);
}
```

3. 后台的实现，这里实现不是特别完美，简单的说下实现的思路

- 先删除需要修改的数据

- 把数据插入进去，这样就达到了修改的目的

为什么说不是很完美呢

- 我没有用事务，如果删除之后，插入失败，那么数据就没了

- 先删除再插入对于损耗是比较大的，因为首先需要查找这条数据，然后在删除，最后在插入


至于我为啥还用这种方法，是因为这里的修改与一般的修改有区别

对于规格选项来说

- 有可能只是修改了里面的数据，没增加也没减少规格选项，所以使用`update`就可以了

- 有可能增加了一个新的规格选项，所以使用`update`是不行的，因为里面没有这条数据，无法更新，需要插入

- 有可能减少了一个新的规格选项，所以使用`update`也是不行的，需要使用`delete`进行删除

所以有可能增加、有可能减少、有可能只是修改了里面的数据，`update`无法做到，不想做过多的判断，用最简单的方法达到目的，但是数据可靠性(用事务回滚)和性能等方面就没那么好了

看代码


1. 接口的定义

```java
package com.pinyougou.sellergoods.service;

import com.pinyougou.pojo.TbSpecification;
import com.pinyougou.pojogroup.Specification;

import java.util.List;

/**
 * 规格接口
 * @author hzj
 */
public interface SpecificationService {

    /**
     * 查找所有的规格
     * @return
     */
    public List<TbSpecification> findAll();

    /**
     * 添加规格
     * @param specification
     */
    public void add(Specification specification);

    /**
     * 获取规格
     * @param id 规格id
     * @return
     */
    public Specification findOne(Long id);

    /**
     * 更新规格
     * @param specification
     */
    public void update(Specification specification);

    /**
     * 删除规格
     * @param ids 规格id数组
     */
    public void delete(Long[] ids);
}

```

2. 接口的实现

```java
package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.pinyougou.mapper.TbSpecificationMapper;
import com.pinyougou.mapper.TbSpecificationOptionMapper;
import com.pinyougou.pojo.TbSpecification;
import com.pinyougou.pojo.TbSpecificationExample;
import com.pinyougou.pojo.TbSpecificationOption;
import com.pinyougou.pojo.TbSpecificationOptionExample;
import com.pinyougou.pojogroup.Specification;
import com.pinyougou.sellergoods.service.SpecificationService;
import javafx.scene.shape.Circle;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * @author hzj
 *
 */
@Service
public class SpecificationServiceImpl implements SpecificationService {

    @Autowired
    private TbSpecificationMapper specificationMapper;

    @Autowired
    private TbSpecificationOptionMapper specificationOptionMapper;

    /**
     * 查找所有的规格
     * @return
     */
    @Override
    public List<TbSpecification> findAll() {
        return specificationMapper.selectByExample(null);
    }

    /**
     * 添加规格
     * @param specification
     */
    @Override
    public void add(Specification specification) {
        //获取规格信息
        TbSpecification tbSpecification = specification.getSpecification();
        //插入规格到时候会返回自增的id到tbSpecification中的id成员属性中
        System.out.println(tbSpecification);
        specificationMapper.insert(tbSpecification);

        System.out.println("添加完成之后");
        //获取规格选项列表
        List<TbSpecificationOption> tbSpecificationOption = specification.getSpecificationOption();
        for (TbSpecificationOption specificationOption: tbSpecificationOption) {
            //设置规格选项的id
            specificationOption.setSpecId(tbSpecification.getId());
            System.out.println(tbSpecification);
            System.out.println("添加完成之前");
            //插入规格选项
            specificationOptionMapper.insert(specificationOption);
        }
    }

    /**
     * 获取规格
     * @param id 规格id
     * @return
     */
    @Override
    public Specification findOne(Long id) {
        Specification specification = new Specification();
        //获取规格
        TbSpecification tbSpecification = specificationMapper.selectByPrimaryKey(id);
        //设置规格
        specification.setSpecification(tbSpecification);
        //获取规格选项
        TbSpecificationOptionExample example = new TbSpecificationOptionExample();
        TbSpecificationOptionExample.Criteria circle = example.createCriteria();
        circle.andSpecIdEqualTo(id);
        List<TbSpecificationOption> tbSpecificationOption = specificationOptionMapper.selectByExample(example);
        //设置规格选项
        specification.setSpecificationOption(tbSpecificationOption);
        return specification;
    }

    @Override
    public void update(Specification specification) {
        TbSpecification tbSpecification = specification.getSpecification();

        //更新规格
        specificationMapper.updateByPrimaryKey(tbSpecification);

        TbSpecificationOptionExample example = new TbSpecificationOptionExample();
        TbSpecificationOptionExample.Criteria circle = example.createCriteria();
        //设置条件
        circle.andSpecIdEqualTo(tbSpecification.getId());
        //删除原来的规格
        specificationOptionMapper.deleteByExample(example);
        //重新插入数据
        for (TbSpecificationOption tbSpecificationOption: specification.getSpecificationOption()) {
            tbSpecificationOption.setSpecId(tbSpecification.getId());
            specificationOptionMapper.insert(tbSpecificationOption);
        }
    }

    @Override
    public void delete(Long[] ids) {
        for (Long id: ids) {
            //删除规格
            specificationMapper.deleteByPrimaryKey(id);
            TbSpecificationOptionExample example = new TbSpecificationOptionExample();
            TbSpecificationOptionExample.Criteria criteria = example.createCriteria();
            //设置删除规格选项的条件
            criteria.andSpecIdEqualTo(id);
            //删除规格选项
            specificationOptionMapper.deleteByExample(example);
        }
    }
}

```

3. 控制层的编写

```java
package com.pinyougou.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbSpecification;
import com.pinyougou.pojogroup.Specification;
import com.pinyougou.sellergoods.service.SpecificationService;
import entity.Result;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 *
 * @author hzj
 */

@RestController
@RequestMapping("/specification")
public class SpecificationController {

    @Reference
    private SpecificationService specificationService;


    /**
     * 查找所有的规格
     * @return
     */
    @RequestMapping("/findAll")
    public List<TbSpecification> findAll() {
        return specificationService.findAll();
    }

    /**
     * 添加规格
     * @param specification 规格信息
     * @return
     */
    @RequestMapping("/add")
    public Result add(@RequestBody Specification specification) {
        try {
            //添加规格
            System.out.println(specification.getSpecification());
            System.out.println(specification.getSpecificationOption());
            specificationService.add(specification);
            return new Result(true, "规格添加成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "规格添加失败");
        }

    }

    /**
     * 通过id查找规格
     * @param id 规格id
     * @return
     */
    @RequestMapping("/findOne")
    public Specification findOne(@RequestParam("id") Long id) {
        return specificationService.findOne(id);
    }

    /**
     * 更新
     * @param specification 规格和规格选项的组合实体
     * @return
     */
    @RequestMapping("/update")
    public Result update(@RequestBody Specification specification) {
        try {
            specificationService.update(specification);
            return new Result(true, "品牌修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "品牌修改失败");
        }
    }

    /**
     * 删除
     * @return
     */
    @RequestMapping("/delete")
    public Result delete(@RequestParam("id") Long[] ids) {
        try {
            specificationService.delete(ids);
            return new Result(true, "规格删除成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "规格删除失败");
        }
    }
}

```