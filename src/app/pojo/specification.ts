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
