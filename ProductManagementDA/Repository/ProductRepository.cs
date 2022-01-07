using Microsoft.EntityFrameworkCore;
using ProductManagementDA.Models.Data;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagementDA.Repository
{
    public class ProductRepository: Repository<Product, DatabaseContext>
    {
        private DatabaseContext _context;

        public ProductRepository(DatabaseContext context) : base(context) {
            _context = context;
        }

        public async Task<ICollection> GetByStatus(string status) {
            return await _context.Product.Where(p => ((ProductStatus)p.ProductStatus).ToString() == status).ToListAsync();
        }
    }
}
