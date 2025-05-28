import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { User } from "./User.entity";

export enum ProductStatus {
  IN_STOCK = "In Stock",
  OUT_OF_STOCK = "Out of Stock",
  DISCONTINUED = "Discontinued",
}

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: "product_id" })
  productId: string;

  @Column()
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  category: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({
    type: "enum",
    enum: ProductStatus,
    default: ProductStatus.OUT_OF_STOCK,
  })
  status: ProductStatus;

  @Column({ nullable: true })
  image: string;

  @Column({ name: "user_id" })
  userId: number;

  @ManyToOne(() => User, (user) => user.products, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateStatus() {
    this.status =
      this.quantity > 0 ? ProductStatus.IN_STOCK : ProductStatus.OUT_OF_STOCK;
  }
}
