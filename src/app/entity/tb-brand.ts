export class TbBrand {
  /**
   * id
   */
  id: number;
  /**
   * 品牌名称
   */
  name: string;
  /**
   * 品牌的第一个字母
   */
  firstChar: string;


  constructor(id: number, name: string, firstChar: string) {
    this.id = id;
    this.name = name;
    this.firstChar = firstChar;
  }
}
