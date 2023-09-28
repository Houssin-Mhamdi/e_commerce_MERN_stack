const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utlis/apiError");

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
