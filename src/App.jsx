const initialProducts = [
    {
        id: 1, 
        product_name: 'White T-shirt', 
        price: "30.00", 
        Category: 'Shirt',
        Link:'https://www.walmart.com/ip/Bonobos-Fielder-Men-s-and-Big-Men-s-Short-Sleeve-Pocket-Tee-Up-to-3XL/382301711',
    },
    {
        id: 2, 
        product_name: 'Gray jeans', 
        price: "49.99", 
        Category: 'Jeans',
        Link:'https://www.walmart.com/ip/Lee-Men-s-Active-Stretch-Slim-Fit-Jean/297675870',
    },
    {
        id: 3, 
        product_name: 'Blue Jacket', 
        price: "79.99", 
        Category: 'Jackets',
        Link:'https://www.walmart.com/ip/Port-Authority-Denim-Jacket-2XL-Denim-Blue/467162354?athbdg=L1700',
    },
];

function ProductRow(props) {

    const product = props.product; 
    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.product_name}</td>
            <td>$ {product.price}</td>
            <td>{product.Category}</td>
            <td><a href={product.Link} target="_blank">View</a></td>

        </tr>
    );
}

function ProductTable (props) {
    const ProductRows = props.products.map(product => <ProductRow key={product.id} product={product}/>); 
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {ProductRows}
            </tbody>
        </table>
    );
}


class ProductAdd extends React.Component {
    constructor() {
        super();  
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAdd;
        const product = {
        Category: form.Category.value, price: form.Price.value,
        product_name: form.product_name.value, Link: form.Link.value
        }
        this.props.createProduct(product);
        form.Category.value = ""; form.Price.value = "";
        form.product_name.value=""; form.Link.value="";
    }


    render() {
        return (
            <form name="productAdd" onSubmit={this.handleSubmit}>
                <div>
                    <div>
                        <label for="Category">Category:</label>
                        <select name="Category" placeholder="Category">
                            <option value="Shirts">Shirts</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Shorts">Shorts</option>
                        </select>
                    </div>  
                    <div>
                        <label for="Price">Price Per Unit:</label>
                        <input type="text" name="Price" placeholder="Price" />
                    </div>
                </div>
                <br></br>
                <div>
                    <div>
                        <label for="Product name">Product Name:</label>
                        <input type="text" name="product_name" placeholder="Product Name" />
                    </div>
                    <div>
                        <label for="Link">Image Link:</label>
                        <input type="text" name="Link" placeholder=" Image URL" />
                    </div>
                </div>
                <br></br>
                <button>Add Product</button>
            </form>
        );
    }
}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
        this.createProduct = this.createProduct.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
        this.setState({ products: initialProducts });
        }, 500);
    }

    createProduct(product) {
        product.id = this.state.products.length + 1;
        const newProductsList = this.state.products.slice();
        newProductsList.push(product);
        this.setState({ products: newProductsList });
    }

    
    render() {
        return (
            <React.Fragment>
                <h1>My Company Inventory</h1>
                <p>Showing all available products</p>
                <hr />
                <ProductTable products={this.state.products}/>
                <p>Add a new product to inventory</p>
                <hr />
                <ProductAdd createProduct={this.createProduct}/>
            </React.Fragment>
        );
    }
}

const element = <ProductList />;
ReactDOM.render(element, document.getElementById('contents'));