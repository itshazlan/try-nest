import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async addUser(@Res() res, @Body() createUserDto: UserDto) {
    try {
      const user = await this.userService.addUser(createUserDto);
      return res.status(HttpStatus.OK).json({
        msg: 'User has been created successfully',
        user
      });
    } catch (e) {
      return res.status(HttpStatus.CONFLICT).json({
        msg: 'User already exists'
      });
    }
  }

  @Get(':userID')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return user by id.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getUser(@Res() res, @Param('userID') userID) {
    const user = await this.userService.getUser(userID);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  @Put(':userID')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateUser(@Res() res, @Param('userID') userID, @Body() createUserDto: UserDto) {
    const user = await this.userService.updateUser(userID, createUserDto);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      msg: 'User has been successfully updated',
      user,
    });
  }

  @Delete(':userID')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteUser(@Res() res, @Param('userID') userID) {
    const user = await this.userService.deleteUser(userID);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      msg: 'User has been deleted',
      user,
    });
  }

  @UseGuards(AuthGuard())
  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, description: 'Return all customers.' })
  async getAllUser(@Res() res) {
    const users = await this.userService.getAllUser();
    return res.status(HttpStatus.OK).json(users);
  }
}
