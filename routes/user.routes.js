import {Router} from 'express';
import fileUpload from 'express-fileupload';
import { getScreenshots, uploadScreenshot} from "../services/user.service.js";
const router = Router();

router.post('/upload-screenshot', fileUpload(), uploadScreenshot);

router.get('/get-screenshots', getScreenshots);

export default { route: '/', router };
