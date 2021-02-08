/**
 * 抽象语法树节点。
 * 这里偷懒了，一个类型节点表示所有，用 type 字段区分。
 * 可能的节点类型：
 * identifier: 标识符
 * number: 数值
 * add: 加法
 * sub: 减法
 * mul: 乘法
 * div: 除法
 * minus: 取负
 * prior: 括号优先运算
 */
class ASTNode {
  /**
   * 初始化。
   * @param {*} type 
   */
  constructor(type) {
    this.type = type;
  }

  toObject() {
    let r = {};
    for (let k of Object.keys(this)) {
      let v = this[k];
      if (v instanceof ASTNode) {
        r[k] = v.toObject();
      } else {
        r[k] = v;
      }
    }
    return r;
  }

  toJSON() {
    let v = this.toObject();
    return JSON.stringify(v, null, 2);
  }
}

/**
 * 词法分析器。
 * 
 */
class Lexer {
  constructor() {
    this.index = 0;
  }

  /**
   * 词法分析。
   * 
   * @param {*} text 
   */
  lex(text) {
    this.text = text;
    this.index = 0;
    this.count = text.length;
    this.result = [];
    while (this.index < this.count) {
      let c = this.text[this.index];
      if (/[0-9]/.test(c)) {
        this.asNumber();
      } else if (/[A-Za-z]/.test(c)) {
        this.asIdentifier();
      } else if (/([\(\)+-]|\/|\*)/.test(c)) {
        this.asOperation();
      } else if (/\s+/.test(c)) {
        this.index += 1;
      } else {
        throw Error(`未知字符 ${c}`);
      }
    }
    return this.result;
  }

  /**
   * 判定位标识符。
   * 
   */
  asIdentifier() {
    let i = this.index;
    let buffer = [this.text[i++]];
    while (i < this.count) {
      let c = this.text[i];
      if (/[0-9A-Za-z_]/.test(c)) {
        buffer.push(c);
      } else {
        break;
      }
      ++i;
    }
    this.index = i;
    this.result.push({
      type: "identifier",
      info: buffer.join(""),
    });
  }

  /**
   * 判定为运算符。
   * 
   */
  asOperation() {
    let c = this.text[this.index];
    this.index += 1;
    this.result.push({
      type: "operation",
      info: c,
    });
  }

  /**
   * 判定为数字。
   * 
   */
  asNumber() {
    let buffer = this.asInteger();
    if (this.text[this.index] == ".") {
      buffer.push(".");
      this.index += 1;
    }
    this.asInteger().map((i) => buffer.push(i));
    this.result.push({
      type: "number",
      info: buffer.join(""),
    });
  }

  /**
   * 判定为整数。
   * 
   */
  asInteger() {
    let i = this.index;
    let buffer = [];
    while (i < this.count) {
      let c = this.text[i];
      if (/[0-9]/.test(c)) {
        buffer.push(c);
      } else {
        break;
      }
      ++i;
    }
    this.index = i;
    return buffer;
  }
}

/**
 * 语法分析器。
 * 
 */
class Parser {
  constructor() {
    this.index = 0;
  }

  /**
   * 语法分析。
   * 
   * @param {*} lexemes 
   */
  parse(lexemes) {
    this.index = 0;
    this.lexemes = lexemes;
    this.count = lexemes.length;
    return this.asEquLv1();
  }

  /**
   * 一级运算。
   * 
   */
  asEquLv1() {
    let equlv2 = this.asEquLv2();
    let equlv1next = this.asEquLv1Next();
    if (equlv1next == null) {
      return equlv2;
    }
    // 简单结构
    equlv1next.left = equlv2;
    let right = equlv1next.right;
    let rt = right.type;
    if (rt != "add" && rt != "sub") {
      return equlv1next;
    }

    // 左结合
    let arrow = equlv1next.right;
    let at = arrow.type;
    while (at == "add" || at == "sub") {
      let left = arrow.left;
      let lt = left.type;
      if (lt != "add" && lt != "sub") {
        break;
      }
      arrow = left;
      at = lt;
    }
    equlv1next.right = arrow.left;
    arrow.left = equlv1next;

    return right;
  }

  /**
   * 提取公因式后的一级运算部分。
   * 
   */
  asEquLv1Next() {
    if (this.index >= this.count) {
      return null;
    }
    let lexeme = this.lexemes[this.index];
    if (lexeme.info == "+") {
      this.index += 1;
      let node = new ASTNode("add");
      node.right = this.asEquLv1();
      return node;
    } else if (lexeme.info == "-") {
      this.index += 1;
      let node = new ASTNode("sub");
      node.right = this.asEquLv1();
      return node;
    }
    return null;
  }

  /**
   * 二级运算。
   */
  asEquLv2() {
    let factor = this.asEquLv3();
    let equlv2next = this.asEquLv2Next();
    if (equlv2next == null) {
      return factor;
    }

    // 简单结构
    equlv2next.left = factor;
    let right = equlv2next.right;
    let rt = right.type;
    if (rt != "mul" && rt != "div") {
      return equlv2next;
    }

    // 左结合
    let arrow = equlv2next.right;
    let at = arrow.type;
    while (at == "mul" || at == "div") {
      let left = arrow.left;
      let lt = left.type;
      if (lt != "mul" && lt != "div") {
        break;
      }
      arrow = left;
      at = lt;
    }
    equlv2next.right = arrow.left;
    arrow.left = equlv2next;

    // 返回根
    return right;
  }

  /**
   * 提取公因式后的二级运算部分。
   */
  asEquLv2Next() {
    if (this.index >= this.count) {
      return null;
    }
    let lexeme = this.lexemes[this.index];
    // 乘号
    if (lexeme.info == "*") {
      this.index += 1;
      let node = new ASTNode("mul");
      node.right = this.asEquLv2();
      return node;
    } // 除号
    else if (lexeme.info == "/") {
      this.index += 1;
      let node = new ASTNode("div");
      node.right = this.asEquLv2();
      return node;
    }
    return null;
  }

  /**
   * 因子。
   * 
   */
  asEquLv3() {
    let lexeme = this.lexemes[this.index];
    // 正号
    if (lexeme.info == "+") {
      this.index += 1;
      return this.asFactor();
    } // 负号
    else if (lexeme.info == "-") {
      this.index += 1;
      let node = new ASTNode("minus");
      node.value = this.asFactor();
      return node;
    } // 括号
    else if (lexeme.info == "(") {
      this.index += 1;
      let equlv1 = this.asEquLv1();
      let pr = this.lexemes[this.index];
      if (pr.info != ")") {
        throw new Error("非正常括号闭合");
      }
      this.index += 1;
      let node = new ASTNode("prior");
      node.value = equlv1;
      return node;
    }
    return this.asFactor();
  }

  /**
   * 计算操作数。
   * 
   */
  asFactor() {
    let lexeme = this.lexemes[this.index];
    if (lexeme.type == "number") {
      this.index += 1;
      let node = new ASTNode("number");
      node.value = Number(lexeme.info);
      return node;
    }
    if (lexeme.type == "identifier") {
      this.index += 1;
      let node = new ASTNode("identifier");
      node.identifier = lexeme.info;
      return node;
    }
    throw new Error("非预期的操作数类型");
  }
}

let formula = "1.69 + x * 1.1 / 0.3 * (10.5 - 5.6 + 3.2 - 4.0)";
let lexer = new Lexer();
let ls = lexer.lex(formula);
let parser = new Parser();
let r = parser.parse(ls);
console.log(ls);
console.log(r.toJSON());

/*
1. 正向语法分析 LL
2. 遇到 变量 转归约式
3. 归约式局部求逆
4. 逆向展开归约式

y1 = x * 1.1
y2 = y1 / 4.9
y3 = 1.69 + y2

x = y1 / 1.1
y1 = y2 * 4.9
y2 = y3 - 1.69

y1 = (y3 - 1.69) * 4.9


x = (y - 1.69) * 4.9 / 1.1
y = 1.69 + x * 1.1 / 4.9

1.69 + x * 1.1 / 4.9
1.69 + y1 / 4.9
1.69 + y2
*/
