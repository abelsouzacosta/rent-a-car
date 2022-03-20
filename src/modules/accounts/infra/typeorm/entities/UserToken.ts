import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

import { User } from "./User";

@Entity("users_tokens")
class UserToken {
  @PrimaryColumn()
  id?: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.token)
  @JoinColumn({ name: "user_id" })
  user: User;
}

export { UserToken };
