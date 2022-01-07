using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductManagementDA.Models.Data;
using ProductsManagementBL.Manager;
using System.Threading.Tasks;

namespace ProductManagementUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : BaseController<Product, ProductManager>
    {
        private readonly ProductManager _productManager;
        public ProductController(ProductManager productManager): base(productManager) {
            _productManager = productManager;
        }
        [HttpGet]
        public virtual async Task<IActionResult> Get() {
            try
            {
                return Ok(await Read());
            }
            catch (System.Exception ex)
            {
                return Problem(ex.InnerException?.Message ?? ex.Message);
            }
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await ReadById(id));
            }
            catch (System.Exception ex)
            {
                return Problem(ex.InnerException?.Message ?? ex.Message);
            }
        }
        
        [HttpGet("{pageNo}/{pageSize}")]
        public virtual async Task<IActionResult> GetWithPaging(int pageNo, int pageSize)
        {
            try
            {
                return Ok(await ReadWithPaging(pageNo, pageSize));
            }
            catch (System.Exception ex)
            {
                return Problem(ex.InnerException?.Message ?? ex.Message);
            }
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Put(int id, Product entity)
        {
            try
            {
                return Ok(await Edit(id, entity));
            }
            catch (System.Exception ex)
            {
                return Problem(ex.InnerException?.Message ?? ex.Message);
            }
        }
        
        [HttpPost]
        public virtual async Task<IActionResult> Post(int id, Product entity)
        {
            try
            {
                return Ok(await Create(entity));
            }
            catch (System.Exception ex)
            {
                return Problem(ex.InnerException?.Message ?? ex.Message);
            }
        }
    }
}
