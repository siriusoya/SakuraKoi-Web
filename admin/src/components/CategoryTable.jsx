import CategoryRow from "./CategoryRow"

function CategoryTable(props) {
    const { categories } = props;

    return (
        <>
        <table className="products-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {categories.map((category, index) => {
          return (
            <CategoryRow category={category} index={index + 1} key={category.id} />
          );
        })}
          </tbody>          
        </table>
        </>
    )
}

export default CategoryTable;