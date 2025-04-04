# Requirements

The user of the web application should be able to see a list of products and add them to the shopping cart.

They should:
-	See a large list of products
-	See stock availability for each product
-	See the list of items in the cart
-	Add a product to the cart
-	Increase/decrease the quantity of the products already in the cart, decreasing down to 0 will remove the product from the cart
-	See cart total amount

The web application needs to be responsive and adapt from a single view layout (desktop mockup) to a multiple view layout as in the mobile mockup. The user will be able to navigate from product list view to cart view using the navigation arrow buttons.

The following requirements are a plus:
-	Add a product to favorite list
-	List the favorite products

The data to be used are in the file db.json and the API should have this entry points:
-	GET /grocery: get the list of products
-	PATCH /grocery/:id: update the item stock
-	GET /grocery?favorite=1: get the list of favorite items


### Dev Requirements

You should use:
-	Styled-Components/Emotion/Sass/Less/css or similar to style the components
-	Typescript **(Is a plus)**
-	React
-	Express

Testing is a plus, although a minimal unit test suite will be appreciated.

