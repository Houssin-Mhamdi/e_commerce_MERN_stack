const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utlis/apiError");
const ApiFeatures = require("../utlis/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      //res.status(404).json({msg:`No category found for this id ${id}`})
      return next(new ApiError(`No document found for this id ${id}`, 404));
    }
    res.status(204).send({ msg: `document deleted successfully` });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      //res.status(404).json({msg:`No category found for this id ${id}`})
      return next(
        new ApiError(`No document found for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      //res.status(404).json({msg:`No category found for this id ${id}`})
      return next(new ApiError(`No document found for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model,modelName) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj){
      filter = req.filterObj
    }
    const countDocuments = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(countDocuments)
      .filter()
      .search(modelName)
      .limitFields()
      .sort()
      
    // build query
    //execute the query
    // const products = await apiFeatures.mongooseQuery;
    const { mongooseQuery, paginationResult } = apiFeatures;

    const document = await mongooseQuery;
    res
      .status(200)
      .json({ result: document.length, paginationResult, data: document });
  });
