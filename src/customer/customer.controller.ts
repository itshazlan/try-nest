import { Controller, Get, Param, Post, Body, Put, Delete, Res, HttpStatus, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    // Retrieve customers list
    @Get()
    async getAllCustomer(@Res() res) {
        const customers = await this.customerService.getAllCustomer();
        return res.status(HttpStatus.OK).json(customers);
    }

    // Fetch a particular customer using Id
    @Get(':customerID')
    async getCustomer(@Res() res, @Param('customerID') customerID) {
        const customer = await this.customerService.getCustomer(customerID);
        if (!customer) throw new NotFoundException("Customer does not exist!");
        return res.status(HttpStatus.OK).json(customer);
    }

    // Add a customer
    @Post()
    async createCustomer(@Res() res, @Body() createCustomerDto: CreateCustomerDto) {
        const customer = await this.customerService.addCustomer(createCustomerDto);
        return res.status(HttpStatus.OK).json({
            message: "Customer has been created successfully.",
            customer
        });
    }

    // Update a customer detail
    @Put(':customerID')
    async updateCustomer(@Res() res, @Query('customerID') customerID, @Body() createCustomerDto: CreateCustomerDto) {
        const customer = await this.customerService.updateCustomer(customerID, createCustomerDto);
        if (!customer) throw new NotFoundException("Customer does not exist!");
        return res.status(HttpStatus.OK).json({
            message: "Customer has been updated successfully.",
            customer
        });
    }

    // Delete a customer
    @Delete(':customerID')
    async deleteCustomer(@Res() res, @Query('customerID') customerID) {
        const customer = await this.customerService.deleteCustomer(customerID);
        if (!customer) throw new NotFoundException("Customer does not exist!");
        return res.status(HttpStatus.OK).json({
            message: "Customer has been deleted successfully.",
            customer
        });
    }
}
