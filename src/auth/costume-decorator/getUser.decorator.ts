import { createParamDecorator, ExecutionContext } from '@nestjs/common';
//this will replace @Req() req:Request from controller
//get user from request.(req.user from user and more)
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest(); //getRequest will take req. from client
    if (data) {
      //this will axecuted if we use @GetUser('id') with params to select spesific field in controller
      return request.user[data];
    }
    return request.user;
  },
);
