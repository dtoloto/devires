import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);
    const { name, email, status, type_id, password } = req.body;

    const currentUserId = req.user.id;

    const { user } = await createUser.execute({
      currentUserId,
      name,
      email,
      password,
      status,
      type_id,
    });

    return res.json({ user: classToClass(user) });
  }
}
