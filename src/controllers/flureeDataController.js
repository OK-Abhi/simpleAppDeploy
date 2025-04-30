// ADD PATH TO ALL THE ROUTES
// FOR TESTING ONLY

//@desc Get all the Infos from the ledger this is just template
//@route GET /api/Info
//@access public | later private
const getInfos = (req, res) => {
  res.status(200).json({ message: "Get the infos" });
};

//@desc Create the ledger/datamodel this is just template
//@route POST /api/Info
//@access public
const createLedger = (req, res) => {
    console.log("THIS IS THE RESPONSE",req.body)
  res.status(200).json({ message: "ledger Created" });
};

//@desc Get the particular Info from the ledger this is just template
//@route GET /api/Info
//@access public
const getInfo = (req, res) => {
  res.status(200).json({ message: `Get the info the info ${req.params.id}` });
};

//@desc Update the Info from the ledger this is just template
//@route PUT /api/Info/id:
//@access public
const updateInfo = (req, res) => {
  res.status(200).json({ message: `Update the info ${req.params.id} ` });
};

//@desc Delete the Info from the ledger this is just template
//@route DELETE /api/Info/id:
//@access public
const DeleteInfo = (req, res) => {
  res.status(200).json({ message: `Delete the info ${req.params.id}` });
};

module.exports = {
  getInfos,
  createLedger,
  getInfo,
  DeleteInfo,
  updateInfo,
};
