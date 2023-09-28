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
