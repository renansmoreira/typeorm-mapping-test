import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Community } from './community.entity';

@Entity('tags', { schema: 'public' })
export class Tag {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'slug', comment: 'Readable URL encoded ID' })
  slug: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @Column('uuid', {
    name: 'community_id',
    nullable: true,
    comment: 'Id of the community associated with the tag',
  })
  communityId: string | null;

  @OneToOne(() => Community, (communities) => communities.tag, {
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
  })
  @JoinColumn([{ name: 'community_id', referencedColumnName: 'id' }])
  community: Community;
}