import * as path from "path";
import * as fs from "fs/promises";
export const uploadScreenshot = async (req, res) => {
    try {
        const { name, phone, tariff, purpose } = req.body;

        if (!name?.length || phone?.length !== 12 || !tariff || !purpose ) {
            return res.status(400).send({
                ok: false,
                message: 'Malumotlar xato'
            });
        }

        const screenshot = req.files?.img;

        if (screenshot?.size > 3145728 || ![ 'image/jpeg', 'image/png', 'image/jpg' ].includes(screenshot?.mimetype)) {
            return res.status(400).send({
                ok: false,
                message: `Skrinshot rasmining hajmi 3Mb dan oshmasligi kerak va fayl turi PNG, JPG yoki JPEG formatida bo'lishi kerak`
            });
        }

        const users = JSON.parse(await fs.readFile(path.join('db', 'db.json'), { encoding: 'utf-8' })) || [];

        await screenshot.mv(path.join('public', `${ screenshot.md5 }.${ screenshot.mimetype.split('/')[1] }`));

        users.push({
            id: users.length + 1,
            name,
            phone,
            purpose,
            tariff,
            date: new Date().toLocaleString(),
            img: `${ screenshot.md5 }.${ screenshot.mimetype.split('/')[1] }`
        })

        await fs.writeFile(path.join('db', 'db.json'), JSON.stringify(users));

        return res.status(200).send({
            ok: true,
            message: 'Screenshot file uploaded'
        });
    } catch (e) {

    }
};

export const getScreenshots = async (req, res) => {
    try {
        const users = JSON.parse(await fs.readFile(path.join('db', 'db.json'), { encoding: 'utf-8' }));

        return res.status(200).send({
            ok: true,
            users
        });
    } catch (e) {

    }
};
