const express = require("express")
const mongo = require("./models/mongo")
const router = express.Router()


router.get("/get", async (req, res) => {
	const get = await mongo.find()
	res.send(get)
});
router.get("/get/:id", async (req, res) => {
	const get = await mongo.findOne({ _id: req.params.id })
	res.send(get)
});
router.post("/post", async (req, res) => {
	const post = new mongo({
		name: req.body.name,
		age: req.body.age,
        address:req.body.address,
        //available:req.body.available
	})
	await post.save()
	res.send("Successfully Added!")
});
router.put("/put/:id", async (req, res) => {
	try {
		const put= await mongo.findOne({ _id: req.params.id })

		if (req.body.name) {
			put.name= req.body.name
		}

		if (req.body.age) {
			put.age = req.body.age
		}
        if (req.body.address) {
			put.address = req.body.address
		}

		await put.save()
		res.send(put)
	} catch {
		res.send("Error in updating the values")
	}
});
router.delete("/delete/:id", async (req, res) => {
	try {
		await mongo.deleteOne({ _id: req.params.id })
		res.send("successfully deleted!")
	} catch {
		res.send("Error not deleted!")
	}
});
module.exports = router