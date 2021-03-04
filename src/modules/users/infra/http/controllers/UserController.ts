import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import IndexUserService from '@modules/users/services/IndexUserService';
import ShowUserService from '@modules/users/services/ShowUserService';

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

  public async update(req: Request, res: Response): Promise<Response> {
    const updateUser = container.resolve(UpdateUserService);
    const { name, email, status, type_id, password } = req.body;
    const { id } = req.params;

    const currentUserId = req.user.id;

    const user = await updateUser.execute({
      id,
      currentUserId,
      name,
      email,
      password,
      status,
      type_id,
    });

    return res.json({ user: classToClass(user) });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const deleteUser = container.resolve(DeleteUserService);
    const { id } = req.params;

    const rootId = req.user.id;

    const user = await deleteUser.execute({ id, rootId });

    return res.json({ user: classToClass(user) });
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const indexUser = container.resolve(IndexUserService);

    const { id } = req.user;

    const users = await indexUser.execute({ id });

    return res.json({ users: classToClass(users) });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showUser = container.resolve(ShowUserService);

    const { id } = req.user;

    const users = await showUser.execute({ id });

    return res.json({ users: classToClass(users) });
  }
}
