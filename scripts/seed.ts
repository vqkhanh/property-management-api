import { AppDataSource } from '../ormconfig';
import { Space } from '../src/spaces/entities/space.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(Space);

  await repo.save([
    { displayName: 'Việt Nam' },
    { displayName: 'Hà Nội', parentId: 1 },
    { displayName: 'Đà Nẵng', parentId: 1 },
    { displayName: 'Hồ Chí Minh', parentId: 1 },
  ]);

  console.log('✅ Seed done');
  process.exit(0);
}

seed();
