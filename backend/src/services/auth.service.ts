import { AppDataSource } from "@/config/database";
import { User } from "@/entities/User.entity";
import { LoginDto, SignupDto } from "@/dto/auth.dto";
import { JwtUtil } from "@/utils/jwt.util";
import { BaseService } from "./base.service";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService extends BaseService<User> {
  constructor() {
    super(AppDataSource.getRepository(User));
  }

  async login(loginDto: LoginDto): Promise<{ user: User; tokens: AuthTokens }> {
    const { email, password } = loginDto;

    const user = await this.repository.findOne({
      where: { email, isActive: true },
    });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const tokens = this.generateTokens(user);

    // Update last login
    user.lastLogin = new Date();
    await this.repository.save(user);

    return { user, tokens };
  }

  async signup(
    signupDto: SignupDto,
  ): Promise<{ user: User; tokens: AuthTokens }> {
    const { email, password, firstName, lastName } = signupDto;

    const existingUser = await this.repository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const user = this.repository.create({
      email,
      password,
      firstName,
      lastName,
    });

    const savedUser = await this.repository.save(user);
    const tokens = this.generateTokens(savedUser);

    return { user: savedUser, tokens };
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const decoded = JwtUtil.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new Error("Invalid refresh token");
    }

    const user = await this.repository.findOne({
      where: { id: decoded.userId, isActive: true },
    });
    if (!user) {
      throw new Error("User not found");
    }

    return this.generateTokens(user);
  }

  private generateTokens(user: User): AuthTokens {
    const payload = { userId: user.id, email: user.email };
    return {
      accessToken: JwtUtil.generateAccessToken(payload),
      refreshToken: JwtUtil.generateRefreshToken(payload),
    };
  }
}
