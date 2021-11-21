import { MathematicalOperation } from "enums";

export class MathematicalExpressionValidator {
  static letterPattern = new RegExp(/[a-z]/i);

  static parenthesesCorrectness = (mathematicalExpression: string): boolean => {
    let parenthesesCount: number = 0;

    mathematicalExpression.split("").forEach((token) => {
      if (token === MathematicalOperation.LEFT_PARENTHESIS) ++parenthesesCount;
      if (token === MathematicalOperation.RIGHT_PARENTHESIS) --parenthesesCount;

      if (parenthesesCount < 0) {
        return false;
      }
    });

    return parenthesesCount === 0;
  };

  static lettersOccurrence = (mathematicalExpression: string): boolean => {
    return !this.letterPattern.test(mathematicalExpression);
  };
}
