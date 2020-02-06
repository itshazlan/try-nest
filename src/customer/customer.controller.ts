import { Controller, Get, Param, Post, Body, Put, Delete, Res, HttpStatus, NotFoundException, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Customer } from './interfaces/customer.interface';

@ApiBearerAuth()
@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    // Retrieve customers list
    @Get()
    @UseGuards(AuthGuard())
    @ApiOperation({ summary: 'Get all customers' })
    @ApiResponse({ status: 200, description: 'Return all customers.' })
    async getAllCustomer(@Res() res): Promise<Customer> {
        const customers = await this.customerService.getAllCustomer();
        return res.status(HttpStatus.OK).json(customers);
    }

    // Fetch a particular customer using Id
    @Get(':customerID')
    @UseGuards(AuthGuard())
    async getCustomer(@Res() res, @Param('customerID') customerID) {
        const customer = await this.customerService.getCustomer(customerID);
        if (!customer) throw new NotFoundException("Customer does not exist!");
        return res.status(HttpStatus.OK).json(customer);
    }

    // Add a customer
    @Post()
    @ApiOperation({ summary: 'Create customer' })
    @ApiResponse({ status: 201, description: 'The customer has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createCustomer(@Res() res, @Body() createCustomerDto: CreateCustomerDto) {
        const customer = await this.customerService.addCustomer(createCustomerDto);
        return res.status(HttpStatus.OK).json({
            message: "Customer has been created successfully.",
            customer
        });
    }

    // Update a customer detail
    @Put()
    @UseGuards(AuthGuard())
    @ApiOperation({ summary: 'Update customer' })
    @ApiResponse({ status: 201, description: 'The customer has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async updateCustomer(@Res() res, @Query('customerID') customerID, @Body() createCustomerDto: CreateCustomerDto) {
        const customer = await this.customerService.updateCustomer(customerID, createCustomerDto);
        if (!customer) throw new NotFoundException("Customer does not exist!");
        return res.status(HttpStatus.OK).json({
            message: "Customer has been updated successfully.",
            customer
        });
    }

    // Delete a customer
    @Delete()
    @UseGuards(AuthGuard())
    @ApiOperation({ summary: 'Delete customer' })
    @ApiResponse({ status: 201, description: 'The customer has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async deleteCustomer(@Res() res, @Query('customerID') customerID) {
        const customer = await this.customerService.deleteCustomer(customerID);
        if (!customer) throw new NotFoundException("Customer does not exist!");
        return res.status(HttpStatus.OK).json({
            message: "Customer has been deleted successfully.",
            customer
        });
    }
}
