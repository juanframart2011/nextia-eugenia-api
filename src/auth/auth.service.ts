import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UserRecovery } from 'src/users/entities/user-recovery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

import * as bcryptjs from 'bcryptjs';
import { ChangePassword } from './dto/change-password.dto';
import { CreateTokenDto } from './dto/create-token.dto';

const readFileAsync = promisify(fs.readFile);

@Injectable()
export class AuthService {
  
  private smtpHost: string;
  private smtpUser: string;
  private smtpPort: string;
  private smtpPassword: string;
  private urlWeb: string;
  private appName: string;
  
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(UserRecovery)
    private readonly userRecoveryRepository:Repository<UserRecovery>,
  ) {

    this.appName = process.env.APP_NAME;
    this.smtpHost = process.env.SMTP_HOST;
    this.smtpUser = process.env.SMTP_USER;
    this.smtpPort = process.env.SMTP_PORT;
    this.smtpPassword = process.env.SMTP_PASSWORD;
    this.urlWeb = process.env.URL;
  }

  async login(loginDto: LoginDto) {
    
    const user = await this.userService.findOneByEmail(loginDto.email);
    
    if (!user) {
      throw new BadRequestException('El correo electronico no existe');
    }

    const isPasswordValid = await bcryptjs.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Los datos son incorrectos');
    }

    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      email: loginDto.email,
      name: user.name,
      last_name: user.last_name,
      rol: user.rol_id,
      no_department:user.no_department
    };
  }

  async logout(userId: string) {}

  async changePassword(changePassword: ChangePassword){

    const token = await this.userRecoveryRepository.find({
      where: {
        statu: 1,
        token: changePassword.token
      }
    });

    if(token.length == 0){
      throw new BadRequestException('El token no existe o ya fue utilizado');
    }

    await this.userService.changePassword(token[0].user_id,changePassword.password);

    return this.userRecoveryRepository.update({id:token[0].id},{
      statu:0
    });
  }
  
  private async _createToken(createTokenDto: CreateTokenDto) {
    return this.userRecoveryRepository.save(createTokenDto);
  }

  private _generateToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }

  async recovery(email: string) {

    const user = await this.userService.findOneByEmail(email);
    if(!user){
      throw new BadRequestException('El correo electronico no existe');
    }
    
    // Generar un token de recuperación de contraseña aquí
    // Esto es solo un ejemplo, debes reemplazar esto con tu generador de token real
    const recoveryToken = await this._createToken({
      user_id:user.id,
      token:this._generateToken(8)
    });

    // Llamar a la función de envío de correo electrónico
    const emailInfo = await this.sendRecoveryEmail(email, recoveryToken.token);

    // Devolver una respuesta o información si es necesario
    return 'Correo Enviado';
  }

  async sendRecoveryEmail(to: string, token: string) {

    // Configura tu transporter como antes...

    // Leer el contenido del archivo HTML

    const htmlContent = await readFileAsync(path.join(__dirname, './templates/recovery-email.html'), 'utf8');

    // Inserta datos dinámicos usando plantillas literales
    const htmlToSend = htmlContent
    .replace('{{appName}}', this.appName)
    .replace('{{name}}', to)
    .replace('{{link}}', this.urlWeb+'/recuperar/'+token)
    .replace('{{urlStatic}}', this.urlWeb+'/recuperar/'+token);

    // Configurar el transporter de nodemailer
    let transporter = nodemailer.createTransport({
      host: this.smtpHost, // Reemplaza con tu host SMTP
      port: this.smtpPort,
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: this.smtpUser, // tu correo
        pass: this.smtpPassword, // tu contraseña
      },
    });
  
    // Configurar las opciones del correo electrónico
    let mailOptions = {
      from: '"'+this.appName+'" no-reply@eugenia.ia', // dirección del remitente
      to: to, // lista de receptores (correo electrónico del destinatario)
      subject: 'Recuperación de contraseña', // Línea de asunto
      text: 'Aquí está tu enlace de recuperación de contraseña: ' + token, // cuerpo del texto plano
      html: htmlToSend, // cuerpo del HTML
    };
  
    // Enviar el correo electrónico
    let info = await transporter.sendMail(mailOptions);
    return info;
  }
}