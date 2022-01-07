using ProductManagementDA.Models.Data;
using ProductManagementDA.Repository;

namespace ProductsManagementBL.Manager
{
    public class ProductManager : Manager<Product, ProductRepository>
    {
        private readonly ProductRepository _productRepository;
        public ProductManager(ProductRepository productRepository) : base(productRepository)
        {
            _productRepository = productRepository;
        }
    }
}
