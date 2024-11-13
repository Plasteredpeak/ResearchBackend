const models = require("../../models");
const { Op } = require("sequelize");

const ServiceError = require("../utils/serviceError");

const List = models.List;

exports.getUserList = async (userId) => {
  try {
    const list = await List.findAll({
      where: {
        userId: userId,
      },
    });

    return list;
  } catch (error) {
    throw new ServiceError(error.message, 500);
  }
};

exports.addToList = async (list) => {
  try {
    const existingList = await List.findOne({
      where: {
        userId: list.userId,
        mediaId: list.mediaId,
      },
    });

    if (existingList) {
      throw new ServiceError("Already in your list", 400);
    }

    const newList = await List.create(list);

    if (!newList) {
      throw new ServiceError("Could not add Item", 500);
    }

    return newList;
  } catch (error) {
    throw new ServiceError(error.message, 500);
  }
};

exports.updateList = async (id, list) => {
  try {
    const updatedList = await List.update(list, {
      where: {
        id: id,
      },
    });

    if (!updatedList) {
      throw new ServiceError("Could not update Item", 500);
    }

    return updatedList;
  } catch (error) {
    throw new ServiceError(error.message, 500);
  }
};

exports.removeFromList = async (id) => {
  try {
    const removedList = await List.destroy({
      where: {
        id: id,
      },
    });

    if (!removedList) {
      throw new ServiceError("Could not remove Item", 500);
    }

    return removedList;
  } catch (error) {
    throw new ServiceError(error.message, 500);
  }
};

exports.totalReviews = async (userId) => {
  try {
    const totalReviews = await List.count({
      where: {
        userId: userId,
        userReview: {
          [Op.not]: [null, 0],
        },
      },
    });

    return totalReviews;
  } catch (error) {
    throw new ServiceError(error.message, 500);
  }
};
