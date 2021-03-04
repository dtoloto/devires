import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRootUserService from '@modules/users/services/CreateRootUserService';

export default class RootUserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createRootUser = container.resolve(CreateRootUserService);

    const { user } = await createRootUser.execute(req.body);

    return res.json({ user: classToClass(user) });
  }
}
