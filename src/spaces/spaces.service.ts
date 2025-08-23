import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space } from './entities/space.entity';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { QuerySpaceDto } from './dto/query-space.dto';

@Injectable()
export class SpacesService {
  private readonly logger = new Logger(SpacesService.name);

  constructor(
    @InjectRepository(Space)
    private readonly repo: Repository<Space>,
  ) {}

  async create(dto: CreateSpaceDto) {
    this.logger.log(
      `Creating space "${dto.displayName}" in building ${dto.building}`,
    );

    const space = this.repo.create({
      building: dto.building,
      displayName: dto.displayName,
      refCode: dto.refCode,
      floorArea: dto.floorArea?.toString() ?? null,
    });

    if (dto.parentId) {
      const parent = await this.repo.findOne({ where: { id: dto.parentId } });
      if (!parent) throw new NotFoundException('Parent not found');
      if (parent.id === space.id) {
        throw new BadRequestException('parentId cannot be self');
      }
      space.parent = parent;
    }

    return this.repo.save(space);
  }

  findAll(params?: { building?: string }) {
    this.logger.log(
      `Fetching all spaces ${
        params?.building ? 'for building ' + params.building : ''
      }`,
    );
    const where = params?.building ? { building: params.building } : {};
    return this.repo.find({ where, relations: ['parent'] });
  }

  async findOne(id: number) {
    this.logger.log(`Fetching space #${id}`);
    const space = await this.repo.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
    if (!space) throw new NotFoundException('Space not found');
    return space;
  }

  async update(id: number, dto: UpdateSpaceDto) {
    this.logger.warn(`Updating space #${id}`);
    const space = await this.repo.findOne({
      where: { id },
      relations: ['parent'],
    });
    if (!space) throw new NotFoundException('Space not found');

    if (dto.parentId !== undefined) {
      if (dto.parentId === id) {
        throw new BadRequestException('parentId cannot be self');
      }
      if (dto.parentId === null) {
        space.parent = null;
      } else {
        const parent = await this.repo.findOne({ where: { id: dto.parentId } });
        if (!parent) throw new NotFoundException('Parent not found');
        space.parent = parent;
      }
    }

    if (dto.displayName !== undefined) space.displayName = dto.displayName;
    if (dto.building !== undefined) space.building = dto.building;
    if (dto.refCode !== undefined) space.refCode = dto.refCode;
    if (dto.floorArea !== undefined)
      space.floorArea = dto.floorArea?.toString() ?? null;

    return this.repo.save(space);
  }

  async remove(id: number) {
    this.logger.warn(`Deleting space #${id}`);
    const space = await this.repo.findOne({ where: { id } });
    if (!space) throw new NotFoundException('Space not found');
    await this.repo.remove(space);
    return { deleted: true };
  }

  // Build tree from flat list
  async getTree(building?: string) {
    this.logger.log(`Building tree ${building ? 'for ' + building : ''}`);
    const list = await this.repo.find({
      where: building ? { building } : {},
      relations: ['parent'],
      order: { id: 'ASC' },
    });

    const byId = new Map<number, any>();
    const roots: any[] = [];
    list.forEach((l) => byId.set(l.id, { ...l, children: [] }));

    byId.forEach((node) => {
      if (node.parent?.id) {
        const parent = byId.get(node.parent.id);
        if (parent) parent.children.push(node);
        else roots.push(node);
      } else {
        roots.push(node);
      }
    });
    return roots;
  }

  async findAllPaginated(query: QuerySpaceDto) {
    const { q, building, page, limit, sort } = query;

    const qb = this.repo
      .createQueryBuilder('space')
      .leftJoinAndSelect('space.parent', 'parent');

    if (q) {
      qb.andWhere('LOWER(space.displayName) LIKE LOWER(:q)', { q: `%${q}%` });
    }

    if (building) {
      qb.andWhere('space.building = :building', { building });
    }

    qb.orderBy('space.displayName', sort)
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
