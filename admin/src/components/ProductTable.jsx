import ProductRow from "./ProductRow";

function ProductTable(props) {
    const { products } = props;
    return (
        <>
        <table className="products-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Main Image</th>
            <th>Images</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {products.map((product, index) => {
          return (
            <ProductRow product={product} index={index + 1} key={product.id} />
          );
        })}
          </tbody>
        </table>
        </>
    )
}

export default ProductTable;