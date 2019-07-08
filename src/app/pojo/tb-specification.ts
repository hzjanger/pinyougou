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
