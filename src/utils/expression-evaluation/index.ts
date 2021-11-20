import { MathematicalOperation, OperatorAssociativity } from "enums";
import { stack } from "../stack";

type PrecedenceType = Record<
  Exclude<
    MathematicalOperation,
    MathematicalOperation.LEFT_PARENTHESIS | MathematicalOperation.RIGHT_PARENTHESIS
  >,
  number
>;

type AssociativityType = Record<
  Exclude<
    MathematicalOperation,
    MathematicalOperation.LEFT_PARENTHESIS | MathematicalOperation.RIGHT_PARENTHESIS
  >,
  OperatorAssociativity
>;

export class ExpressionEvaluation {
  // static precedence: PrecedenceType = {
  //   [MathematicalOperation.MULTIPLICATION]: 3,
  //   [MathematicalOperation.DIVISION]: 3,
  //   [MathematicalOperation.ADDICTION]: 2,
  //   [MathematicalOperation.SUBTRACTION]: 2
  // };

  // static operators: string[] = [
  //   MathematicalOperation.MULTIPLICATION,
  //   MathematicalOperation.DIVISION,
  //   MathematicalOperation.ADDICTION,
  //   MathematicalOperation.SUBTRACTION
  // ];

  static operators = "-+/*";

  // TODO remove unnecessary
  // static associativity: AssociativityType = {
  //   [MathematicalOperation.MULTIPLICATION]: OperatorAssociativity.LEFT,
  //   [MathematicalOperation.DIVISION]: OperatorAssociativity.LEFT,
  //   [MathematicalOperation.ADDICTION]: OperatorAssociativity.LEFT,
  //   [MathematicalOperation.SUBTRACTION]: OperatorAssociativity.LEFT
  // };

  static precedence = { "*": 3, "/": 3, "+": 2, "-": 2 };
  static associativity = { "*": "Left", "/": "Left", "+": "Left", "-": "Left" };

  static calculate = (mathematicalExpression: string): number => {
    console.log("mathematicalExpression: ", mathematicalExpression);
    // console.log();
    // preprocess string
    mathematicalExpression = this.removeWhiteSpaces(mathematicalExpression);
    console.log("mathematicalExpression -- after pre processing: ", mathematicalExpression);

    this.createExpressionToken(mathematicalExpression);

    return 123;
  };

  static removeWhiteSpaces = (mathematicalExpression: string): string => {
    return mathematicalExpression.replace(/\s+/g, ""); // remove spaces
  };

  static createExpressionToken = (mathematicalExpression: string) => {
    const s = stack();

    let postfix = "";
    let token: string = "";

    let o1: string;
    let o2: string;

    for (let i = 0; i < mathematicalExpression.length; i++) {
      token = mathematicalExpression[i];

      console.log(token);
      console.log(s.dataStore);

      if (token >= "0" && token <= "9") {
        // if token is number
        postfix += token + " ";

        o1 = token;
        o2 = s.peek();

      } else if (this.operators.indexOf(token) !== -1) {
        // if token is an operator
        o1 = token;
        o2 = s.peek();
        while (
          this.operators.indexOf(o2) !== -1 && // while operator token, o2, on top of the stack
          // and o1 is left-associative and its precedence is less than or equal to that of o2
          // @ts-ignore
          this.associativity[o1] === "Left" &&// @ts-ignore
          this.precedence[o1] <= this.precedence[o2]
        ) {
          postfix += o2 + " "; // add o2 to output queue
          s.pop(); // pop o2 of the stack
          o2 = s.peek(); // next round
        }
        s.push(o1); // push o1 onto the stack
      } else if (token === "(") {
        // if token is left parenthesis
        s.push(token); // then push it onto the stack
      } else if (token === ")") {
        // if token is right parenthesis
        while (s.peek() !== "(") {
          // until token at top is (
          postfix += s.pop() + " ";
        }
        // console.log(token, s.pop())
        s.pop(); // pop (, but not onto the output queue
      }
    }

    postfix += s.dataStore.reverse().join(" ");
    console.log(postfix);
  };
}

export function getEnumKeyByEnumValue(myEnum: any, enumValue: number | string): string {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : "";
}
