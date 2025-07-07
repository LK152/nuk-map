const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const prisma = require('../prisma/prismaClient')

const router = express.Router();

// 搜尋 Spot
router.get('/search-by-building', async (req, res) => {
  const keyword = (req.query.keyword)?.trim().toLowerCase();
  if (!keyword) return res.status(400).json({ error: '缺少搜尋關鍵字' });

  try {
    const allSpots = await prisma.spot.findMany({ include: { classrooms: true } });
    const results = allSpots.filter(spot =>
      spot.name.toLowerCase().includes(keyword)
    );
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: '搜尋失敗', detail: err });
  }
});

// 搜尋 Classroom
router.get('/search-by-classroom', async (req, res) => {
  const keyword = (req.query.keyword)?.trim().toLowerCase();
  if (!keyword) return res.status(400).json({ error: '缺少搜尋關鍵字' });

  try {
    const allSpots = await prisma.spot.findMany({ include: { classrooms: true } });
    const results = allSpots.filter(spot =>
      spot.classrooms.some(cls =>
        cls.name.toLowerCase().includes(keyword)
      )
    );
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: '搜尋失敗', detail: err });
  }
});

// 取得 Spot
router.get('/', async (req, res) => {
  try {
    const results = await prisma.spot.findMany({ include: { classrooms: true } });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: '讀取失敗', detail: err });
  }
});


// 刪除 Spot
router.delete('/:name', async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  console.log('---DELETE DEBUG---');
  console.log('req.params.name:', req.params.name);
  console.log('Decoded name:', name);

  try {
    const spot = await prisma.spot.findUnique({ where: { name } });

    console.log('Spot found:', spot);
    if (!spot) {
      return res.status(404).json({ error: '找不到該景點' });
    }

    await prisma.classroom.deleteMany({ where: { spotId: spot.id } });
    await prisma.spot.delete({ where: { name } });

    console.log('Spot and classrooms deleted');
    res.status(200).json('刪除成功');
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ error: '刪除失敗', detail: err });
  }
});


// 上傳圖檔用
const uploadDir = path.join(__dirname, '..', 'public', 'images', 'spots');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  },
});

const upload = multer({ storage });

// 新增 Spot
router.post('/upload', upload.single('image'), async (req, res) => {
  console.log('---DEBUG---');
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);

  const { name, lat, lng, description } = req.body;
  let classrooms = req.body.classrooms;

  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);

  let classroomList = [];
  if (Array.isArray(classrooms)) {
    classroomList = classrooms.map(name => ({ name }));
  } else if (typeof classrooms === 'string') {
    classroomList = classrooms
      .split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0)
      .map(name => ({ name }));
  }

  if (!name || isNaN(latNum) || isNaN(lngNum) || !description) {
    return res.status(400).json({ error: '缺少必要欄位或格式錯誤' });
  }

  try {
    console.log('Uploaded file:', req.file);
    const createdSpot = await prisma.spot.create({
      data: {
        name,
        lat: latNum,
        lng: lngNum,
        description,
        image: req.file ? req.file.filename : null,
        classrooms: {
            create: classroomList,
        // PostgreSQL
        //   createMany: {
        //     data: classroomList,
        //     skipDuplicates: true,
        //   },
        },
      },
      include: { classrooms: true },
    });

    res.status(200).json('新增成功');
  } catch (err) {
    console.error('新增錯誤', err);
    res.status(500).json({ error: '新增失敗', detail: err });
  }
});

// 更新 Spot
router.post('/update', upload.single('image'), async (req, res) => {
  try {
    const { name, lat, lng, description } = req.body;
    const classrooms = Array.isArray(req.body.classrooms)
      ? req.body.classrooms
      : [req.body.classrooms].filter(Boolean);

    console.log('---UPDATE DEBUG---');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const spot = await prisma.spot.findUnique({ where: { name } });
    if (!spot) {
      return res.status(404).send('找不到該景點');
    }

    await prisma.classroom.deleteMany({
      where: { spotId: spot.id }
    });

    const updated = await prisma.spot.update({
      where: { name },
      data: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        description,
        image: req.file ? req.file.filename : spot.image,
        classrooms: {
          create: classrooms.map(name => ({ name }))
        }
      }
    });

    res.send('修改成功');
  } catch (err) {
    console.error('更新失敗', err);
    res.status(500).json({ error: '更新失敗', detail: err.message });
  }
});

module.exports = router;