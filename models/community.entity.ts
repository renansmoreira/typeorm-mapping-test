import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Tag } from './tag.entity';

@Index('index_communities_on_slug', ['slug'], { unique: true })
@Entity('communities', { schema: 'public' })
export class Community {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    name: 'slug',
    comment: 'A readable identifier for the community',
  })
  slug: string;

  @Column('varchar', { name: 'name', comment: 'The name of the community' })
  name: string;

  @Column('boolean', {
    name: 'is_private',
    default: () => 'false',
    comment: 'Whether the community is public',
  })
  isPrivate: boolean;

  @Column('varchar', {
    name: 'description',
    nullable: true,
    comment: 'The description for the community',
  })
  description: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @Column('uuid', {
    name: 'tag_id',
    nullable: true,
    comment: 'A link to the dedicated community tag',
  })
  tagId: string | null;
  
  @OneToOne(() => Tag, (tags) => tags.community, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tag: Tag;
}