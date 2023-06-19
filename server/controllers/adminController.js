const { Category, User, Product, Image, sequelize } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jws");

class AdminController {
  static async login(req, res, next) {
    try {
      if (!req.body.email || !req.body.password) {
        throw { name: "EmailPasswordisRequired" };
      }

      const checkUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!checkUser) {
        throw { name: "UserNotFound" };
      }

      const isAuthenticated = comparePassword(
        req.body.password,
        checkUser.password
      );
      if (!isAuthenticated) {
        throw { name: "EmailPasswordInvalid" };
      }

      let payload = {
        id: checkUser.id,
      };

      const token = signToken(payload);

      res.status(200).json({
        message: "Login successful",
        access_token: token,
        email: checkUser.email,
        role: checkUser.role,
      });
    } catch (err) {
      next(err);
    }
  }

  static async productList(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [
          { model: Image, attributes: ["imgUrl", "id"] },
          { model: Category, attributes: ["name", "id"] },
          { model: User, attributes: ["username", "email"] },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async addAdmin(req, res, next) {
    try {
      let role = "Admin";
      let { username, email, password, phoneNumber, address } = req.body;
      let newUser = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      let data = {
        id: newUser.id,
        email: newUser.email,
      };
      res.status(201).json({
        message: "Succeeded registering a new admin",
        data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async categoryList(req, res, next) {
    try {
      const categories = await Category.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const productFound = await Product.findByPk(productId);
      if (!productFound) {
        throw { name: "Entity not found" };
      }
      await Product.destroy({
        where: {
          id: productId,
        },
      });
      res.status(200).json({
        message: "Product has been deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      await Category.destroy({
        where: {
          id: categoryId,
        },
      });
      res.status(200).json({
        message: "Category has been deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      const categoryInput = {
        name,
      };
      await Category.create(categoryInput);
      res.status(201).json({
        message: "Category has been added successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { name } = req.body;
      const { categoryId } = req.params;
      const categoryInput = {
        name,
      };
      const categoryFound = await Category.findByPk(categoryId);
      if (!categoryFound) {
        throw { name: "Entity not found" };
      }
      await Category.update(categoryInput, {
        where: {
          id: categoryId,
        },
      });
      res.status(201).json({
        message: "Category has been updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async addProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        description,
        price,
        mainImg,
        CategoryId,
        Images,
      } = req.body;
      const productInput = {
        name,
        slug : name.split(" ").join("-"),
        description,
        price: +price,
        mainImg,
        AuthorId: req.user.id,
        CategoryId: +CategoryId,
      };
      console.log(Images, '>>>AAA<<<')
      const product = await Product.create(productInput, { transaction: t });
      const imageInput = Images.map((image) => {
        return { imgUrl: image.imgUrl, ProductId: product.id };
      });
      console.log(imageInput, '<<<VVV>>>')
      await Image.bulkCreate(imageInput, { transaction: t });

      await t.commit();
      res.status(201).json({
        message: "Product has been added successfully",
      });
    } catch (err) {
      console.log(err, '<<<')
      await t.rollback();
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const {
        name,
        description,
        price,
        mainImg,
        CategoryId,
        Images,
      } = req.body;
      const productInput = {
        name,
        description,
        price: +price,
        mainImg,
        CategoryId: +CategoryId,
      };
      const { productId } = req.params;
      const productFound = await Product.findByPk(productId);
      if (!productFound) {
        throw { name: "Entity Not Found" };
      }
      await Product.update(productInput, {
        where: {
          id: productId,
        }
      });
      console.log(Images)
      const imageInput = Images.map((image) => {
        return { imgUrl: image.imgUrl, ProductId: productId };
      });
      await Image.destroy({
        where: {
          ProductId: productId,
        }
      });
      await Image.bulkCreate(imageInput);
      res.status(200).json({
        message: "Product has been updated successfully",
      });
    } catch (err) {
    console.log(err)
      next(err);

    }
  }

}

module.exports = AdminController;
