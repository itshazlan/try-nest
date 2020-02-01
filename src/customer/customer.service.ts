import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {

    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) { }

    // Fetch all customers
    async getAllCustomer(): Promise<Customer[]> {
        const customers = await this.customerModel.find().exec();
        return customers;
    }

    // Get a single customer
    async getCustomer(customerID): Promise<Customer> {
        const customer = await this.customerModel.findById(customerID).exec();
        return customer;
    }

    // Post a single customer
    async addCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const newCustomer = new this.customerModel(createCustomerDto);
        return newCustomer;
    }

    // Edit customer details
    async updateCustomer(customerID, createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const updateCustomer = await this.customerModel
            .findByIdAndUpdate(customerID, createCustomerDto, { new: true });
        return updateCustomer;
    }

    // Delete a customer
    async deleteCustomer(customerID): Promise<any> {
        const deleteCustomer = await this.customerModel.findByIdAndRemove(customerID);
        return deleteCustomer;
    }
}
