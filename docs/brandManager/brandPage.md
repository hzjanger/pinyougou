# 品牌列表分页的实现

## 编写存储分页数据的类

1. pinyougou-pojo的src目录结构

```
src/
├── main
│   ├── java
│   │   ├── com
│   │   │   └── pinyougou
│   │   │       └── ....
│   │   └── entity
│   │       └── PageResult.java
│   └── resources
```

2. 代码实现

```java
package entity;

import java.io.Serializable;
import java.util.List;


/**
 * 分页结果类
 * @author hzj
 */
public class PageResult implements Serializable {

    /**
     * 总记录数
     */
    private long total;

    /**
     * 当前页记录
     */
    private List rows;

    public PageResult() {
    }

    public PageResult(long total, List rows) {
        this.total = total;
        this.rows = rows;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List getRows() {
        return rows;
    }

    public void setRows(List rows) {
        this.rows = rows;
    }

    @Override
    public String toString() {
        return "PageResult{" +
                "total=" + total +
                ", rows=" + rows +
                '}';
    }
}

```
## 定义分页的接口

1. pinyougou-sellergoods-interface的src目录结构

```
src/
├── main
│   ├── java
│   │   └── com
│   │       └── pinyougou
│   │           └── sellergoods
│   │               └── service
│   │                   └── BrandService.java
```

2. 定义分页接口

```java
package com.pinyougou.sellergoods.service;

import com.pinyougou.pojo.TbBrand;
import entity.PageResult;

import java.util.List;

/**
 * 品牌接口
 * @author hzj
 */
public interface BrandService {
	//...

    /**
     * 品牌分页
     * @param pageNum 当前页数
     * @param pageSize 每页的大小
     * @return
     */
    public PageResult findPage(int pageNum, int pageSize);
    
}

```

## 分页的接口实现

1. pinyougou-sellergoods-service的src目录结构

```
src/
├── main
│   ├── java
│   │   └── com
│   │       └── pinyougou
│   │           └── sellergoods
│   │               └── service
│   │                   └── impl
│   │                       └── BrandServiceImpl.java
```

2. 添加分页的接口

```java
package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.mapper.TbBrandMapper;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.sellergoods.service.BrandService;
import entity.PageResult;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


@Service
public class BrandServiceImpl implements BrandService {

	//...

    /**
     * 品牌分页
     * @param pageNum 当前页数
     * @param pageSize 每页的大小
     * @return
     */
    @Override
    public PageResult findPage(int pageNum, int pageSize) {
        //mybatis的分页插件
        PageHelper.startPage(pageNum, pageSize);
        Page<TbBrand> page = (Page<TbBrand>) brandMapper.selectByExample(null);
        return new PageResult(page.getTotal(), page.getResult());
    }
}

```

## 分页控制层实现

1. pinyougou-manager-web的src目录结构

```
src/
├── main
│   ├── java
│   │   └── com
│   │       └── pinyougou
│   │           └── manager
│   │               └── controller
│   │                   └── BrandController.java
```

2. 分页控制层实现

```java
package com.pinyougou.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.sellergoods.service.BrandService;
import entity.PageResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author hzj
 */
@RestController
@RequestMapping("/brand")
public class BrandController {

	//...

    @RequestMapping("/findPage")
    public PageResult findPage(int pageNum, int pageSize) {
        return brandService.findPage(pageNum, pageSize);
    }
}

```

代码套路 编写实体 ---> 定义接口 ---> 实现接口 ---> 编写控制层