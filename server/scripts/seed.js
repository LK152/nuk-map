const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const spot = await prisma.spot.create({
    data: {
      name: '綜合大樓',
      lat: 22.73138313628186,
      lng: 120.2772143968683,
      description: '綜合大樓為多功能教學大樓，常見通識課程與大型活動在此舉行。設備新穎，樓內設有演講廳、教室、會議空間等，學生聚集與換課頻繁之處。綜合院樓下也有學生餐廳，經過翻新即將開幕，可以想像到未來絡繹不絕的人潮。',
      classrooms: {
        create: [
          { name: '204' },
          { name: '200' }
        ]
      }
    }
  });

  console.log('✅ 成功新增：', spot);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });