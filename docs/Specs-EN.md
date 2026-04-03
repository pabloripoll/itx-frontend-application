- [GO BACK](./../../README.md)

# ITX - FRONT END EXAM - OVERVIEW

This test consists of creating a mini-application for purchasing mobile devices.

- The application will only have two views:
    1. Main View - Product List
    2. Product details

- The implementation of the designs is free choice, but must follow the structure that has been defined in the screenshots. The level of detail of the proposal will be positively valued.

- The use of React is required for application development and can be complemented with other JS libraries if deemed appropriate.

- The use of JS with ES6 is allowed.

- A boilerplate template can be used to create the project structure.

- The application will be a SPA, where the routing of the client code view will be added, without it being an MPA or the use of SSR.

- The project will have to contain the following script, to be able to manage the application:
    1. START - Development mode.
    2. BUILD - Compilation for Production mode.
    3. TEST - Test launch.
    4. LINT - Code Checking.

- The project must be presented in an open source repository (Github, Gitlab, Bitbucket), with the solution to the problem. We want the code to be uploaded in an evolutionary manner so that milestones are reached.

- A README document must be included in the repository (preferably included in the first commit), where the explanation for executing the project will be included, as well as any explanatory note or additional information that is considered necessary.

## DESCRIPTION OF THE VIEWS

### PLP - Product List Page

- Page where the list of products will be displayed.

- On this page, all the elements returned by the API request will be displayed.

- It will allow filtering of content based on the search criteria that the user enters.

- When selecting a product, you will need to navigate to its details.

- A maximum of four elements will be displayed per row, and it must be adaptive depending on the resolution.

<div style="with:100%;height:auto;text-align:center;">
    <img src="./images/products-plp.png">
</div>

### PDP - Product Details Page

- This page will be divided into two columns:
    1. The first will display the product image component.
    2. In the second, the details and actions of the product will be shown.

- Must display a link to navigate back to the product list.

<div style="with:100%;height:auto;text-align:center;">
    <img src="./images/products-pdp.png">
</div>

## DESCRIPTION OF COMPONENTS

### Header (HEADER)

- The title or icon of the application will act as a link to the main view.

- A breadcrumbs will be displayed, showing the page where the user is located, as well as a link for navigation.

- On the right side of the header, the number of items that have been added to the cart will be displayed.

### Search bar (SEARCH)

- An input will be shown to the user, which will allow the introduction of a text string.

- The user must filter the products based on the text entered, and it will be compared with the Brand and Model of the products.

- The filtering will be in real time, that is, a search will be launched every time the user changes the search criteria.

### List element (ITEM):

- The following product information will be displayed:
    1. Image
    2. Brand
    3. Model
    4. Price

### Product Image (IMAGE)

- The image of the product will be displayed

### Product Description (DESCRIPTION)

- The details associated with the products will be displayed. At least the following attributes will be displayed:
    1. Brand
    2. Model
    3. Price
    4. CPU
    5. RAM
    6. Operating System
    7. Screen resolution
    8. Battery
    9. Cameras
    10. Dimensions
    11. Weight

### Product Actions (ACTIONS)

- Two types of selectors will be displayed, where the user can select the type of product they want to add to the cart. Option selectors for the following attributes will be displayed:
    1. Storage
    2. Colors

- Even if there is only one option, the selector with the information will be displayed. For this use case, it should be selected by default.

- An Add button will be displayed, where the user, once the options have been selected, will add the product to the basket.

- When adding a product through the API, the following information is required to be sent:
    1. The product identifier.
    2. The selected color code.
    3. The code of the selected storage capacity.

- The add request returns in the response the number of products in the basket. This value must be displayed in the application header in any view of the application. This requires persisting the data.

## RESOURCES

### API Integration

In order to carry out the test, it is required to integrate with an API for data management.

The API domain will be the same for all Endpoints, and will be as follows: https://itx-frontend-test.onrender.com/

The definitions of the Endpoints are as follows:

- Get the list of products

    Path
    ```
    GET /api/product
    ```
    Response
    ```
    [
        {
            id: 0001,
            ...
        },
        {
            id: 0002,
            ...
        }
    ]
    ```

- Get Product Detail

    Path
    ```
    GET /api/product
    ```
    Response
    ```
    [
        {
            id: 0001,
            ...
        },
        {
            id: 0002,
            ...
        }
    ]
    ```

- Add product to cart

    Path
    ```
    POST /api/cart
    ```
    Body
    ```
    {
        id: 0001,
        colorCode: 1,
        storageCode: 2
    }
    ```
    Response
    ```
    [
        {
            id: 0001,
            ...
        },
        {
            id: 0002,
            ...
        }
    ]
    ```

## Data persistence

It is required to add client storage of the data received from the API.

What we want to offer is a caching system, so that requests to the API are not made every time. For them, it is required to define the following functionality:

- The information will be stored each time it is requested from the API service.

- Said information will be saved, and will have an expiration of 1 hour. Once this time has passed, the information must be revalidated.

- Any storage method may be used to store said information, whether from the browser or in memory, but always on the client.
