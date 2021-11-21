// UTILS
export { ExpressionEvaluation } from "./expression-evaluation";
export { MathematicalExpressionValidator } from "./mathematical-expression-validator";
export { stack } from "./stack";

export const isNumber = (value: any): boolean => !isNaN(Number(value));
