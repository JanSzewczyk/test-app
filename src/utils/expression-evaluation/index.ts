import { stack } from "../stack";
import { isNumber } from "utils";

// type PrecedenceType = Record<
//   Exclude<
//     MathematicalOperation,
//     MathematicalOperation.LEFT_PARENTHESIS | MathematicalOperation.RIGHT_PARENTHESIS
//   >,
//   number
// >;
//
// type AssociativityType = Record<
//   Exclude<
//     MathematicalOperation,
//     MathematicalOperation.LEFT_PARENTHESIS | MathematicalOperation.RIGHT_PARENTHESIS
//   >,
//   OperatorAssociativity
// >;

export class ExpressionEvaluation {
  static operators = "-+/*";
  static precedence: Record<string, number> = { "*": 3, "/": 3, "+": 2, "-": 2 };

  static calculate = (mathematicalExpression: string): number => {
    // preprocess string
    mathematicalExpression = this.removeWhiteSpaces(mathematicalExpression);

    // get postfix notation array from getPostfix Notation string
    const postfixNotationArray: string[] = this.getPostfixNotation(mathematicalExpression);

    return this.computePostfixNotation(postfixNotationArray);
  };

  static removeWhiteSpaces = (mathematicalExpression: string): string => {
    return mathematicalExpression.replace(/\s+/g, ""); // remove spaces
  };

  static getPostfixNotation = (mathematicalExpression: string): string[] => {
    const operatorStack = stack();
    const expressionStack = stack();

    let token: string = "";

    let o1: string;
    let o2: string;

    for (let i = 0; i < mathematicalExpression.length; i++) {
      token = mathematicalExpression[i];

      if (isNumber(token)) {
        // if token is number

        if (
          i > 0 &&
          (isNumber(mathematicalExpression[i - 1]) || mathematicalExpression[i - 1] === ".")
        ) {
          // if earlier token is number
          const earlierToken = expressionStack.pop();

          expressionStack.push(earlierToken + token);
        } else {
          expressionStack.push(token);
        }
      } else if (token === ".") {
        // if token is a dot
        if (i > 0 && isNumber(mathematicalExpression[i - 1])) {
          const earlierToken = expressionStack.pop();
          expressionStack.push(earlierToken + token);
        }
      } else if (this.operators.indexOf(token) !== -1) {
        // if token is an operator
        o1 = token;
        o2 = operatorStack.peek();
        while (
          this.operators.indexOf(o2) !== -1 && // while operator token, o2, on top of the stack
          // and o1 is left-associative and its precedence is less than or equal to that of o2
          this.precedence[o1] <= this.precedence[o2]
        ) {
          expressionStack.push(o2); // add o2 to output queue
          operatorStack.pop(); // pop o2 of the stack
          o2 = operatorStack.peek(); // next round
        }
        operatorStack.push(o1); // push o1 onto the stack
      } else if (token === "(") {
        // if token is left parenthesis
        operatorStack.push(token); // then push it onto the stack
      } else if (token === ")") {
        // if token is right parenthesis
        while (operatorStack.peek() !== "(") {
          // until token at top is (
          expressionStack.push(operatorStack.pop());
        }

        operatorStack.pop(); // pop (, but not onto the output queue
      }
    }

    return [...expressionStack.dataStore, ...operatorStack.dataStore.reverse()];
  };

  static computePostfixNotation = (tokenArray: string[]): number => {
    const s: number[] = [];

    tokenArray.forEach((token) => {
      if (isNumber(token)) {
        s.push(Number(token));
      } else {
        if (s.length < 2) {
          throw new Error(`${token}: ${s}: insufficient operands.`);
        }

        const o2 = s.pop() as number;
        const o1 = s.pop() as number;

        switch (token) {
          case "+":
            s.push(o1 + o2);
            break;
          case "-":
            s.push(o1 - o2);
            break;
          case "*":
            s.push(o1 * o2);
            break;
          case "/":
            s.push(o1 / o2);
            break;
          case "^":
            s.push(Math.pow(o1, o2));
            break;
          default:
            throw new Error(`Unrecognized operator: [${token}]`);
        }
      }
    });

    if (s.length > 1) {
      throw new Error(`${s}: insufficient operators.`);
    }

    return s[0];
  };
}
