const express = require("express")
const router_lunch = express.Router()
const router_sign = express.Router()
const router_login = express.Router()
const router_teacher = express.Router()
const router_event = express.Router()
const router_alert = express.Router()
const router_suggest = express.Router()
const router_talk = express.Router()
const router_start = express.Router()
const {lunch,sign,login,teacher,event,alert,suggest,talk,start} = require("./router_2")

router_lunch.route("/")
 .get(lunch.get)
 .put(lunch.put)
 .post(lunch.post)
 .delete(lunch.delete)


router_suggest.route("/")
 .get(suggest.get)
 .put(suggest.put)
 .post(suggest.post)
 .delete(suggest.delete)

 
router_talk.route("/")
 .get(talk.get)
 .put(talk.put)
 .post(talk.post)
 .delete(talk.delete)

router_start.route("/")
 .get(start.get)
 .put(start.put)
 .post(start.post)
 .delete(start.delete)


router_sign.route("/")
 .get(sign.get)
 .put(sign.put)
 .post(sign.post)
 .delete(sign.delete)

router_login.route("/")
 .get(login.get)
 .put(login.put)
 .post(login.post)
 .delete(login.delete)

router_teacher.route("/")
 .get(teacher.get)
 .put(teacher.put)
 .post(teacher.post)
 .delete(teacher.delete)
 
router_event.route("/")
 .get(event.get)
 .put(event.put)
 .post(event.post)
 .delete(event.delete)

router_alert.route("/")
 .get(alert.get)
 .put(alert.put)
 .post(alert.post)
 .delete(alert.delete)


 module.exports = {router_start, router_lunch, router_login, router_sign, router_teacher, router_event, router_alert, router_talk, router_suggest}
