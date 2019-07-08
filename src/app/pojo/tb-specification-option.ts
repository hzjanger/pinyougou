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
