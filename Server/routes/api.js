const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const nomination = require('../models/nomination')
const jobfunction = require('../models/jobfunctions')
const contact = require('../models/contacts')
const customer = require('../models/customer')
const customersuccess = require('../models/customersuccess')
const tier1 = require('../models/tier1')
const tier2 = require('../models/tier2')
const tier3 = require('../models/tier3')
const mongoose = require('mongoose')
const multer = require('multer')
const db = 'mongodb://raghavd:rakrag123@ds223015.mlab.com:23015/authdb'
var path = require('path')


//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Public/Uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname);
    }

})
const upload = multer({ storage: storage }).single('file')


mongoose.connect(db, function (err) {
    if (err) {
        console.error('Error is' + err);
    }
    else {
        console.log("Susccesfully connected")
    }
})
router.get('/', (req, res) => {
    res.send('Sent from API')
})
function verifytoken(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized Request")
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        res.status(401).send("Unauthorized Request1")
    }
    let payload = jwt.verify(token, 'secretkey')
    if (!payload) {
        res.status(401).send("Unauthorized Request2")
    }
    else {
        req.userId = payload.subject;
        req.adminstatus = payload.adminstatus
        req.firstname=payload.firstname
        req.lastname=payload.lastname
        next()
    }

}
router.post('/register', function (req, res) {
    let userdata = req.body
    let user = new User(userdata)
    user.save(function (error, registereduser) {
        if (error) {
            console.error('error is' + error)
        } else {
            res.status(200).send(registereduser)
        }
    })
})
router.post('/login', function (req, res) {
    let userData = req.body
    User.findOne({ email: userData.email }, function (error, user) {
        if (error) {
            console.log(error)
        } else
            if (!user) {
                res.send("Invalid E-mail")
            } else
                if (user.password !== userData.password) {
                    res.status(401).send("Invalid Password")
                }
                else {
                    let payload = { subject: user._id, adminstatus: user.adminstatus,firstname:user.firstname,lastname:user.lastname }
                    let token = jwt.sign(payload, 'secretkey')
                    res.status(200).send({ token })
                }
    })
})
router.post('/newnomination', function (req, res) {
    let nominationdata = req.body;
    let nominee = new nomination(nominationdata)
    nominee.save(function (error, nomineedata) {
        if (error) {
            console.log(error)
        }
        else {
            res.json(nomineedata)
        }

    })

})
router.get('/nominationdata', verifytoken, function (req, res) {
    nomination.find({ loginid: req.userId }, 'transactionid customername status',
        function (err, loggednomdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(loggednomdata)
            }
        })
})
router.get('/nominationview', verifytoken, function (req, res) {
    nomination.find({ loginid: req.userId },
        function (err, loggednomdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(loggednomdata)
            }
        })
})
router.post('/getdetails', function (req, res) {
    let singleData = req.body
    nomination.findOne({ transactionid: singleData.transactionid }, function (error, singleuser) {
        if (error) {
            console.log(error)
        } else {
            res.json(singleuser)
        }

    })
})

router.get('/userdata', verifytoken, function (req, res) {
    res.json(req.userId)
})
router.get('/useradmindata', verifytoken, function (req, res) {
    res.json(req.adminstatus)
})
router.get('/usernamedata', verifytoken, function (req, res) {
    let fullname=req.firstname + " " + req.lastname
    res.json(fullname)
})
router.get('/jobfunctions', function (req, res) {
    jobfunction.find({}, 'jobfunction',
        function (err, positiondata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(positiondata)
            }
        })
})
router.post('/newjobfunction', function (req, res) {
    let jobfunctiondata = req.body;
    let jfdata = new jobfunction(jobfunctiondata)
    jfdata.save(function (error, listdata) {
        if (error) {
            console.log(error)
        }
        else {
            res.json(listdata)
        }

    })

})
router.post('/uploads', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err)
        } else {
            return res.json({ originalname: req.file.originalname, uploadname: req.file.filename, filepath: req.file.path })
        }
    })
})
router.post('/download', function (req, res, next) {
    filepath = path.join(__dirname, '../') + req.body.filepath;
    res.sendFile(filepath);
});

router.post('/search', function (req, res) {
    let searchData = req.body
    nomination.find({ $or: [{ customername: searchData.searchtext }, { transactionid: searchData.searchtext}] }, 'customername transactionid',
        function (err, searchdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(searchdata)
            }
        })
})
router.post('/getsearch', function (req, res) {
    let searchData = req.body
    nomination.findOne({transactionid: searchData.transactionid},
        function (err, searchdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(searchdata)
            }
        })
})
router.post('/searchcustomer', function (req, res) {
    let searchData = req.body
    customer.find({ $or: [{ customername: searchData.searchtext }, { customerid: searchData.searchtext }] }, 'customername customerid',
        function (err, searchdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(searchdata)
            }
        })
})
router.post('/getsearchcustomer', function (req, res) {
    let searchData = req.body
    customer.findOne({ $or: [{ customername: searchData.searchtext }, { customerid: searchData.searchtext }] },
        function (err, searchdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(searchdata)
            }
        })
})
router.post('/searchcontact', function (req, res) {
    let searchData = req.body
    contact.find({ $or: [{ contactname: searchData.searchtext }, { contactid: searchData.searchtext }] }, 'contactname contactid',
        function (err, searchdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(searchdata)
            }
        })
})
router.post('/getsearchcontact', function (req, res) {
    let searchData = req.body
    contact.findOne({ $or: [{ contactname: searchData.searchtext }, { contactid: searchData.searchtext }] },
        function (err, searchdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(searchdata)
            }
        })
})
router.post('/searchcustomersuccess', function (req, res) {
    let searchData = req.body
    customersuccess.find({ $or: [{ customername: searchData.searchtext }, { measurementid: searchData.searchtext }] }, 'customername measurementid',
        function (err, searchdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(searchdata)
            }
        })
})
router.post('/getcustomersuccess', function (req, res) {
    console.log(req.body)
    let searchData = req.body
    customersuccess.findOne({measurementid:searchData.measurementid},
        function (err, searchdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(searchdata)
            }
        })
})

router.post('/deletenominee', function (req, res) {
    nomination.findOneAndDelete({ transactionid: req.body.transactionid }, function (err, deletednominee) {
        if (err) {
            console.log(err)
        } else {
            res.json(deletednominee)
        }

    })
})
router.put('/updatenominee', function (req, res) {
    nomination.findOneAndUpdate({ transactionid: req.body.transactionid },
        {
            $set: {
                phonenumber: req.body.phonenumber,
                customername: req.body.customername,
                address: req.body.address,
                industry: req.body.industry,
                contactid: req.body.contactid,
                contactPhoneNumber: req.body.contactphonenumber,
                contactName: req.body.contactName,
                contactAddress: req.body.contactAddress,
                jobfunction: req.body.jobfunction,
                customerrelationship: req.body.customerrelationship,
                id: req.body.id,
                tier1: req.body.tier1,
                tier2: req.body.tier2,
                tier3: req.body.tier3,
                Transactionid: req.body.transactionid,
                createdby: req.body.createdby,
                createdOn: req.body.createdOn,
                description: req.body.description,
                status: req.body.status,
                customercontact: req.body.customercontact,
                Jobfunction: req.body.jobfunction,
                CreatedOn: req.body.createdOn,
                cancustomercall: req.body.cancustomercall,
                customerpublic: req.body.customerpublic,
                customerdigital: req.body.customerdigital,
                nomineezip: req.body.nomineezip,
                notes: req.body.notes
            }
        },
        {
            upsert: true,
            new: true
        },
        function (err, updatednominee) {
            if (err) {
                console.log(err)
            } else {
                res.json(updatednominee)
            }
        }
    )

})
router.get('/customer', function (req, res) {
    customer.find({}, 'customername',
        function (err, customerdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(customerdata)
            }
        })
})
router.post('/newcustomer', function (req, res) {
    let customerdata = req.body;
    let custdata = new customer(customerdata)
    custdata.save(function (error, listdata) {
        if (error) {
            console.log(error)
        }
        else {
            res.json(listdata)
        }

    })

})
router.post('/editcustomer', function (req, res) {
    customer.findOneAndUpdate({ customerid: req.body.customerid },
        {
            $set: {
                phonenumber: req.body.phonenumber,
                customername: req.body.customername,
                address: req.body.address,
                industry: req.body.industry,
                status: req.body.status
            }
        },
        {
            upsert: true,
            new: true
        },
        function (err, updatedcustomer) {
            if (err) {
                console.log(err)
            } else {
                res.json(updatedcustomer)
            }
        }
    )

})
router.post('/deletecustomer', function (req, res) {
    customer.findOneAndDelete({ customerid: req.body.customerid }, function (err, deletednominee) {
        if (err) {
            console.log(err)
        } else {
            res.json(deletednominee)
        }

    })
})
router.post('/customerdetails', function (req, res) {
    let singleData = req.body
    customer.findOne({ customername: singleData.customername }, function (error, singleuser) {
        if (error) {
            console.log(error)
        } else {
            res.json(singleuser)
        }

    })
})
router.get('/contact', function (req, res) {
    contact.find({}, 'contactname',
        function (err, contactdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(contactdata)
            }
        })
})
router.post('/newcontact', function (req, res) {
    let contactdata = req.body;
    let contdata = new contact(contactdata)
    contdata.save(function (error, listdata) {
        if (error) {
            console.log(error)
        }
        else {
            res.json(listdata)
        }

    })

})
router.post('/contactdetails', function (req, res) {
    let singleData = req.body
    contact.findOne({ contactname: singleData.contactname }, function (error, singleuser) {
        if (error) {
            console.log(error)
        } else {
            res.json(singleuser)
        }

    })
})
router.post('/editcontact', function (req, res) {
    contact.findOneAndUpdate({ contactid: req.body.contactid },
        {
            $set: {
                contactphonenumber: req.body.contactphonenumber,
                contactname: req.body.contactname,
                contactaddress: req.body.contactaddress,
                jobfunction: req.body.jobfunction,
                customerrelationship: req.body.customerrelationship,
                status: req.body.status
            }
        },
        {
            upsert: true,
            new: true
        },
        function (err, updatedcontact) {
            if (err) {
                console.log(err)
            } else {
                res.json(updatedcontact)
            }
        }
    )

})
router.post('/deletecontact', function (req, res) {
    contact.findOneAndDelete({ contactid: req.body.contactid }, function (err, deletednominee) {
        if (err) {
            console.log(err)
        } else {
            res.json(deletednominee)
        }

    })
})
router.post('/customersuccess', function (req, res) {
    let successdata = req.body;
    let custsucdata = new customersuccess(successdata)
    custsucdata.save(function (error, listdata) {
        if (error) {
            console.log(error)
        }
        else {
            res.json(listdata)
        }

    })

})
router.post('/deletecustsuccess', function (req, res) {
    customersuccess.findOneAndDelete({ measurementid: req.body.measurementid }, function (err, deletednominee) {
        if (err) {
            console.log(err)
        } else {
            res.json(deletednominee)
        }

    })
})
router.post('/editcustsuccess', function (req, res) {
    customersuccess.findOneAndUpdate({ measurementid: req.body.measurementid },
        {
            $set: {
                measurementid:req.body.measurementid,
                customerid: req.body.customerid,
                customername: req.body.customername,
                phonenumber: req.body.phonenumber,
                address: req.body.address,
                email:req.body.email,
                industry: req.body.industry,
                contactid: req.body.contactid,
                contactname: req.body.contactname,
                contactphonenumber: req.body.contactphonenumber,
                contactaddress: req.body.contactaddress,
                jobfunction: req.body.jobfunction,
                customerrelationship: req.body.customerrelationship,
                transactionid:req.body.transactionid,
                createdBy: req.body.createdby,
                day: req.body.day,
                month: req.body.month,
                year: req.body.year,
                description: req.body.description,
                downloadpath: req.body.downloadpath,
                status: req.body.status
            }
        },
        {
            upsert: true,
            new: true
        },
        function (err, updatedcontactsuccess) {
            if (err) {
                console.log(err)
            } else {
                res.json(updatedcontactsuccess)
            }
        }
    )

})
router.post('/chartdata', function (req, res) {
    let chartdata = req.body
    nomination.find({ $and: [{ customername: chartdata.company }, { month: chartdata.month }, { year: chartdata.year }] }).count(function (err, chartitem) {
        if (err) {
            console.log(err)
        } else {
            res.json(chartitem)
        }
    })
})
router.post('/tabledata', function (req, res) {
    let chartdata = req.body
    nomination.find({ $and: [{ customername: chartdata.customer }, { year: chartdata.year }] }, function (error, singleuser) {
        if (error) {
            console.log(error)
        } else {
            res.json(singleuser)
        }

    })
})
router.post('/successchartdata', function (req, res) {
    let chartdata = req.body
    customersuccess.count({ $and: [{ customername: chartdata.company }, { month: chartdata.month }, { year: chartdata.year }] }, function (err, chartitem) {
        if (err) {
            console.log(err)
        } else {
            res.json(chartitem)
        }
    })
})
router.post('/successtabledata', function (req, res) {
    let chartdata = req.body
    customersuccess.find({ $and: [{ customername: chartdata.customer }, { year: chartdata.year }] }, function (error, singleuser) {
        if (error) {
            console.log(error)
        } else {
            res.json(singleuser)
        }

    })
})
router.get('/tier1', function (req, res) {
    tier1.find({}, 'tier1',
        function (err, positiondata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(positiondata)
            }
        })
})
router.post('/newtier1', function (req, res) {
    let tier1data = req.body;
    let t1data = new tier1(tier1data)
    t1data.save(function (error, listdata) {
        if (error) {
            console.log(error)
        }
        else {
            res.json(listdata)
        }

    })

})
router.get('/tier2', function (req, res) {
    tier2.find({}, 'tier2',
        function (err, positiondata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(positiondata)
            }
        })
})
router.post('/newtier2', function (req, res) {
    let tier2data = req.body;
    let t2data = new tier2(tier2data)
    t2data.save(function (error, listdata) {
        if (error) {
            console.log(error)
        }
        else {
            res.json(listdata)
        }

    })

})
router.get('/tier3', function (req, res) {
    tier3.find({}, 'tier3',
        function (err, positiondata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(positiondata)
            }
        })
})
router.post('/newtier3', function (req, res) {
    let tier3data = req.body;
    let t3data = new tier3(tier3data)
    t3data.save(function (error, listdata) {
        if (error) {
            console.log(error)
        }
        else {
            res.json(listdata)
        }

    })

})
router.get('/specificnominationdata',function (req, res) {
    nomination.find({}, 'transactionid day month year createdby description',
        function (err, loggednomdata) {
            if (err) {
                console.log(err)
            }
            else {
                res.json(loggednomdata)
            }
        })
})
router.post('/specificnomineedata', function (req, res) {
    let singleData = req.body
    nomination.findOne({ transactionid: singleData.transactionid }, function (error, singleuser) {
        if (error) {
            console.log(error)
        } else {
            res.json(singleuser)
        }

    })
})






module.exports = router