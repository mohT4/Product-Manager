# Product-Manager - Node.js **REST-API** for Product Management
## Product Manager is a Node.js application that facilitates the management of products, providing CRUD operations, purchase tracking, and insightful statistics on product purchases. It leverages Node.js, Express, and Mongoose for seamless product management.

## Getting started 
Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation
1- Clone Repository:

```bash
git clone https://github.com/mohT4/Product-Manager.git
cd product-manager
```
2- Set Up Environment Variables:


Duplicate the .env.example file  and name it .env

Then start the application using the following commands:
```bash
npm run dev
```

# Features 
## Authentication
product manager provides a secure authentication system to manage user accounts. Users can perform the following actions:

- Sign Up: Create a new account.
- Log In: Access the API with their credentials.
- Forget Password: Easily reset their password.

## Products EndPoints 
1) - Create: Add a new product to the system. : api/v1/products 
2) - Read: Retrieve product information, including pagination and search features. : api/v1/products
3) - Update: Update product details. : api/v1/products/:id
4) - Delete: Remove a product from the system.  : api/v1/products/:id
 
## Purchase EndPoints 
1) - Create: crate a new purchase to the system. : api/v1/products/:id/purchase 
2) - Read: Retrieve purchase stats, including total purchses, best seling products and trends. : api/v1/products/:id/purchase

## External API Integration
Integrate the Random Data API to fetch credit card data. Customize the data size and limit credit card types to Visa.



