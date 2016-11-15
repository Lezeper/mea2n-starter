var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var userCtrl = require('../controllers/user');
var config = require('../config');
var logCtrl = require("../controllers/log");
var settingsCtrl = require("../controllers/settings");
var mmCtrl = require("../controllers/module_model");

var auth = jwt({
  secret: config.secretKey
});

router.get('/user', logCtrl.createLog, userCtrl.findAllUsers);
router.get('/user/:id', userCtrl.findUserById);
router.post('/login', logCtrl.createLog, userCtrl.login);
router.post('/user', userCtrl.createUser);
router.put('/user', userCtrl.updateUser);
router.delete('/user?', userCtrl.deleteUser);

router.get("/log?", auth, logCtrl.findAllLogs);
router.delete("/log", auth, logCtrl.deleteAllLogs);

router.get("/settings", auth, settingsCtrl.findSettings);
router.put("/settings", auth, settingsCtrl.updateSettings);
router.delete("/settings", auth, settingsCtrl.deleteSettings);
router.get("/settings/dbbu", auth, settingsCtrl.doDBBackup);

router.get("/mm", auth, mmCtrl.findAllModuleModel);
router.post("/mm", auth, mmCtrl.createModuleModel);
router.put("/mm", auth, mmCtrl.updateModuleModel);
router.delete("/mm?", auth, mmCtrl.deleteModuleModelById);

require('express');
var router = express.Router();
var jwt = require('express-jwt');

var userCtrl = require('../controllers/user');
var config = require('../config');
var logCtrl = require("../controllers/log");
var settingsCtrl = require("../controllers/settings");
var mmCtrl = require("../controllers/module_model");

var auth = jwt({
  secret: config.secretKey
});

router.get('/user', logCtrl.createLog, userCtrl.findAllUsers);
router.get('/user/:id', userCtrl.findUserById);
router.post('/login', logCtrl.createLog, userCtrl.login);
router.post('/user', userCtrl.createUser);
router.put('/user', userCtrl.updateUser);
router.delete('/user?', userCtrl.deleteUser);

router.get("/log?", auth, logCtrl.findAllLogs);
router.delete("/log", auth, logCtrl.deleteAllLogs);

router.get("/settings", auth, settingsCtrl.findSettings);
router.put("/settings", auth, settingsCtrl.updateSettings);
router.delete("/settings", auth, settingsCtrl.deleteSettings);
router.get("/settings/dbbu", auth, settingsCtrl.doDBBackup);

router.get("/mm", auth, mmCtrl.findAllModuleModel);
router.post("/mm", auth, mmCtrl.createModuleModel);
router.put("/mm", auth, mmCtrl.updateModuleModel);
router.delete("/mm?", auth, mmCtrl.deleteModuleModelById);

require('express');
var router = express.Router();
var jwt = require('express-jwt');

var userCtrl = require('../controllers/user');
var config = require('../config');
var logCtrl = require("../controllers/log");
var settingsCtrl = require("../controllers/settings");
var mmCtrl = require("../controllers/module_model");

var auth = jwt({
  secret: config.secretKey
});

router.get('/user', logCtrl.createLog, userCtrl.findAllUsers);
router.get('/user/:id', userCtrl.findUserById);
router.post('/login', logCtrl.createLog, userCtrl.login);
router.post('/user', userCtrl.createUser);
router.put('/user', userCtrl.updateUser);
router.delete('/user?', userCtrl.deleteUser);

router.get("/log?", auth, logCtrl.findAllLogs);
router.delete("/log", auth, logCtrl.deleteAllLogs);

router.get("/settings", auth, settingsCtrl.findSettings);
router.put("/settings", auth, settingsCtrl.updateSettings);
router.delete("/settings", auth, settingsCtrl.deleteSettings);
router.get("/settings/dbbu", auth, settingsCtrl.doDBBackup);

router.get("/mm", auth, mmCtrl.findAllModuleModel);
router.post("/mm", auth, mmCtrl.createModuleModel);
router.put("/mm", auth, mmCtrl.updateModuleModel);
router.delete("/mm?", auth, mmCtrl.deleteModuleModelById);

require('express');
var router = express.Router();
var jwt = require('express-jwt');

var userCtrl = require('../controllers/user');
var config = require('../config');
var logCtrl = require("../controllers/log");
var settingsCtrl = require("../controllers/settings");
var mmCtrl = require("../controllers/module_model");

var auth = jwt({
  secret: config.secretKey
});

router.get('/user', logCtrl.createLog, userCtrl.findAllUsers);
router.get('/user/:id', userCtrl.findUserById);
router.post('/login', logCtrl.createLog, userCtrl.login);
router.post('/user', userCtrl.createUser);
router.put('/user', userCtrl.updateUser);
router.delete('/user?', userCtrl.deleteUser);

router.get("/log?", auth, logCtrl.findAllLogs);
router.delete("/log", auth, logCtrl.deleteAllLogs);

router.get("/settings", auth, settingsCtrl.findSettings);
router.put("/settings", auth, settingsCtrl.updateSettings);
router.delete("/settings", auth, settingsCtrl.deleteSettings);
router.get("/settings/dbbu", auth, settingsCtrl.doDBBackup);

router.get("/mm", auth, mmCtrl.findAllModuleModel);
router.post("/mm", auth, mmCtrl.createModuleModel);
router.put("/mm", auth, mmCtrl.updateModuleModel);
router.delete("/mm?", auth, mmCtrl.deleteModuleModelById);
/*MG*//*** Test ***/
var testCtrl = require("../controllers/test");
router.get("/test", testCtrl.findTest);
router.get("/test?", testCtrl.findTestById);
router.put("/test", testCtrl.updateTest);
router.post("/test", testCtrl.createTest);
router.delete("/test?", testCtrl.deleteTestById);
/*** /Test ***/

module.exports = router;