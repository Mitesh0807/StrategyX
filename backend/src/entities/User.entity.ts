import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import bcrypt from "bcryptjs";
import { Product } from "./Product.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ default: true, name: "is_active" })
  isActive: boolean;

  @Column({ nullable: true, name: "last_login" })
  lastLogin: Date;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  private isPasswordPlain: boolean = false;

  setPassword(rawPassword: string) {
    this.password = rawPassword;
    this.isPasswordPlain = true;
  }
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.isPasswordPlain) {
      this.password = await bcrypt.hash(this.password, 12);
      this.isPasswordPlain = false;
    }
  }
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  toJSON() {
    const { password, ...user } = this;
    return user;
  }
}
