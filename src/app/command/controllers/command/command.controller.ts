import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandService } from '../../services/command/command.service';
import { CreateCommandDto } from '../../schema/dto/command.dto';

@Controller('command')
export class CommandController {

    constructor(private command: CommandService){}

    @Get('/one/:id')
    public async findOne(@Param('id') id: string){ return await this.command.findOne(id) }

    
    @Put('/:idpackage')
    public async deliver(@Param('idpackage') idpackage: string){ return await this.command.deliver(idpackage) }

    @Get()
    public async find(){ return await this.command.find() }

    @Get('/generate')
    public async generate(){ return await this.command.generate() }

    @Post()
    public async create(@Body() dto: CreateCommandDto){ return await this.command.create(dto) }

}
