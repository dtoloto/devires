import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTypeService from '@modules/types/services/CreateTypeService';
import IndexTypeService from '@modules/types/services/IndexTypeService';

export default class TypeController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createService = container.resolve(CreateTypeService);

    const { type } = await createService.execute(req.body.type);

    return res.json({ type });
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const indexService = container.resolve(IndexTypeService);

    const { types } = await indexService.execute();

    return res.json({ types });
  }
}
