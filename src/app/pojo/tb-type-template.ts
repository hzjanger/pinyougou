/**
 * 模板实体
 * @author hzj
 */
export class TbTypeTemplate {

  /**
   * 模板id, 主键
   */
  id;

  /**
   * 模板名称
   */
  name: string;

  /**
   * 关联规格
   */
  specIds: string;

  /**
   * 关联品牌
   */
  brandIds: string;

  /**
   * 自定义属性
   */
  customAttributeItems: string;


  constructor() {
    this.id = 0;
    this.name = null;
    this.specIds = null;
    this.brandIds = null;
    this.customAttributeItems = null;
  }
}
