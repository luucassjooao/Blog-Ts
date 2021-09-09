import { Request, Response } from 'express';
import { Category } from '../models/categoryModel';
import { IReqAuth } from '../config/interfaces';

class CategoryController {
  async createCategory(req: IReqAuth, res: Response) {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication.' });

    if (req.user.role !== 'admin')
      return res.status(400).json({ msg: 'Invalid Authentication.' });
    try {
      const name = req.body.name.toLowerCase();

      const newCategory = new Category({ name });
      await newCategory.save();

      res.json({ newCategory });
    } catch (err: any) {
      let errMsg;

      if (err.code === 11000) {
        errMsg = Object.values(err.keyValue)[0] + ' alredy exists';
      } else {
        let name = Object.keys(err.errors)[0];
        errMsg = err.errors[`${name}`].message;
      }
      return res.status(500).json({ msg: errMsg });
    }
  }
  async getCategory(req: Request, res: Response) {
    try {
      const categories = await Category.find().sort('-createdAt');

      res.json({ categories });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async updateCategory(req: IReqAuth, res: Response) {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication.' });

    if (req.user.role !== 'admin')
      return res.status(400).json({ msg: 'Invalid Authentication.' });
    try {
      const category = await Category.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { name: req.body.name }
      );

      res.json({ msg: 'Update Success' });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async deleteCategory(req: IReqAuth, res: Response) {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication.' });

    if (req.user.role !== 'admin')
      return res.status(400).json({ msg: 'Invalid Authentication.' });
    try {
      const category = await Category.findByIdAndDelete(req.params.id);

      res.json({ msg: 'Delete Success' });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export { CategoryController };