import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

/**
 * Space entity = generic representation of a property unit:
 * Building, Floor, Room, Facility...
 *
 * Self-relation allows us to build hierarchy trees
 * (e.g., Building -> Floor -> Room).
 */
@Entity('spaces')
@Unique(['refCode'])
@Index(['building'])
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  building: string; // "A", "B", etc.

  @Column({ length: 200 })
  displayName: string; // "Lobby Level 1"

  @Column({ length: 100 })
  refCode: string; // "A-01-Lobby"

  @Column('numeric', { precision: 12, scale: 3, nullable: true })
  floorArea: string | null; // square meters

  @ManyToOne(() => Space, (space) => space.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent?: Space | null;

  @OneToMany(() => Space, (space) => space.parent)
  children?: Space[];
}
