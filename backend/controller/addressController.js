import Address from "../model/addressModel.js";

/*
@desc   Add new address
@route  POST /api/addresses
@access Private
*/
export const addAddress = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      houseNo,
      area,
      landmark,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    // If setting this as default → remove old default
    if (isDefault) {
      await Address.updateMany({ user_id: req.user._id }, { isDefault: false });
    }

    const address = await Address.create({
      user_id: req.user._id,
      fullName,
      phone,
      houseNo,
      area,
      landmark,
      city,
      state,
      postalCode,
      country,
      isDefault,
    });

    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
@desc   Get all addresses of logged in user
@route  GET /api/addresses
@access Private
*/
export const getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user_id: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
@desc   Get single address
@route  GET /api/addresses/:id
@access Private
*/
export const getSingleAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (address.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
@desc   Update address
@route  PUT /api/addresses/:id
@access Private
*/
export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (address.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // If updating default → remove other defaults
    if (req.body.isDefault) {
      await Address.updateMany({ user_id: req.user._id }, { isDefault: false });
    }

    Object.assign(address, req.body);

    const updatedAddress = await address.save();

    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
@desc   Delete address
@route  DELETE /api/addresses/:id
@access Private
*/
export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (address.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await address.deleteOne();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
