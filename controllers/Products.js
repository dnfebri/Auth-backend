import { Op } from "sequelize";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";

export const getProducts = async(req, res) => {
  try {
    let response;
    if (req.role === 1) {
      response = await Product.findAll({
        include:({
          model: User,
          attributes:['name', 'role']
        })
      })
    } else {
      response = await Product.findAll({
        where:{
          [Op.and]:[{userId: req.userId}]
          
        },
        include:({
          model: User,
          attributes:['name', 'role']
        })
      })
    }
    res.status(200).json({response});
  } catch (error) {
    res.status(500).json({msg: error.massage});
  }

}

export const getProductById = async(req, res) => {
  let where  = {uuid:req.params.id};
  if (req.role !== 1) {
    where.userId = req.userId;
    where = {[Op.and]:[where]}
  }
  try {
    const response = await Product.findOne({
      attributes: ['id', 'uuid', 'name', 'price', 'userId'],
      where: where,
      include:({
        model: User,
        attributes:['name', 'role']
      })
    })
    if(!response) return res.status(404).json({msg: "Product tidak ditemukan"});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}

export const createProduct = async(req, res) => {
  const {name, price} = req.body;
  try {
    let save = await Product.create({
      name: name,
      price: price,
      userId: req.userId
    });
    res.status(201).json({
      msg: "Product Berhasil di simpan",
      save
    });
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}

export const updateProduct = async(req, res) => {
  try {
    let where  = {uuid:req.params.id};
    if (req.role !== 1) {
      where.userId = req.userId;
      where = {[Op.and]:[where]}
    }
    const product = await Product.findOne({
      where: where
    });
    if(!product) return res.status(403).json({msg: "Update Product Ditolek"});
    // if(req.role !== 1 || product.userId !== req.userId) {
    //   return res.status(403).json({msg: "Akses Product Ditolek"});
    // }
    const {name, price} = req.body;
    await Product.update({name, price}, {
      where: {
        id: product.id
      }
    });
    res.status(200).json({msg: "product berhasil di Update"})
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}

export const deleteProduct = async(req, res) => {
  try {
    let where  = {uuid:req.params.id};
    if (req.role !== 1) {
      where.userId = req.userId;
      where = {[Op.and]:[where]}
    }
    const product = await Product.findOne({
      where: where
    });
    if(!product) return res.status(403).json({msg: "Delete Product Ditolek"});
    await Product.destroy({
      where: {
        id: product.id
      }
    });
    res.status(200).json({msg: "Product berhasil di Hapus"})
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}