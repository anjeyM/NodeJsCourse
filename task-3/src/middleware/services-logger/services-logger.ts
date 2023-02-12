import {Request, Response, NextFunction} from "express";

export const servicesLogger = (req: Request, res: Response, next: NextFunction) => {
    (function () {
        const oldCall = Function.prototype.call;
        const newCall = function(this: any, self: any) {
          Function.prototype.call = oldCall;
          // eslint-disable-next-line prefer-rest-params
          const args = Array.prototype.slice.call(arguments, 1);
          console.log(`Function called: ${this.name} with arguments: ${args}`);
          const res = this.apply(self, args);
          Function.prototype.call = newCall;
          return res
        }
        Function.prototype.call = newCall;
      })();
    next();
}